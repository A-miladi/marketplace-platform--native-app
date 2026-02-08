import BackIcon from '@/assets/Icons/Back.svg';
import CloseEye from '@/assets/Icons/CloseEye.svg';
import OpenEye from '@/assets/Icons/openEye.svg';
import {API_URL} from '@/constants/api';
import {USER_TOKEN} from '@/constants/token';
import {usePost} from '@/hooks';
import {navigate, resetRoot} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {Input} from '@/screens/components/common/input';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {useUserInfoStore} from '@/store/useUserInfo';
import {ResponseType} from '@/types';
import {ISignUpResponse} from '@/types/auth';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {SignInFormStyle} from './SignInFormStyle';
interface ILoginEvent {
  email: string;
  password: string;
  captchaToken?: string;
}
export const SignInForm = () => {
  const {setUserInfo} = useUserInfoStore();
  const {t} = useTranslation('signin');
  const {t: p} = useTranslation('forgotPassword');
  const signinSchema = yup.object().shape({
    email: yup.string().email(t('invalidEmail')).required(t('requiredEmail')),
    password: yup
      .string()
      .min(8, t('minPassword'))
      .required(t('requiredPassword')),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(signinSchema)});
  const {loading, execute} = usePost<
    ResponseType<ISignUpResponse>,
    ILoginEvent
  >(API_URL.Authentication.Signin, {
    onSuccess: res => {
      snackBar(res?.message, 'success');
      AsyncStorage.setItem(USER_TOKEN, res?.data?.access_token);
      setUserInfo(res?.data?.user);
      resetRoot('BottomTabNavigator');
    },
    onError: error => {
      snackBar(error, 'danger');
    },
  });

  const onSubmit = (data: ILoginEvent) => {
    execute({...data, captchaToken: 'TEST'});
  };
  return (
    <View style={SignInFormStyle.container}>
      <View style={SignInFormStyle.child}>
        <TouchableOpacity onPress={() => navigate('SignIn')}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={SignInFormStyle.text}>{t('signinByEmail')}</Text>
      </View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomTextInput
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholderColor="#6D6D6D"
            width={90}
            placeholder={t('email')}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />

      <View style={SignInFormStyle.passwordChild}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              error={!!errors.password}
              helperText={errors?.password?.message}
              placeholderColor="#6D6D6D"
              width={90}
              placeholder={t('password')}
              onChangeText={onChange}
              value={value}
              icon={<CloseEye />}
              icon2={<OpenEye />}
              secureTextEntry
              initialSecureTextEntry={true}
            />
          )}
          name="password"
          defaultValue=""
        />
        <TouchableOpacity onPress={() => navigate('ForgetPassword')}>
          <Text style={SignInFormStyle.ForgetText}>{p('title')}</Text>
        </TouchableOpacity>
      </View>
      <CustomBtn
        width={90}
        title={t('signin')}
        radius={8}
        direction="rtl"
        borderWidth={2}
        onClick={handleSubmit(onSubmit)}
        isLoading={loading}
      />
    </View>
  );
};
