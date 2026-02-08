import BackIcon from '@/assets/Icons/Back.svg';
import {API_URL} from '@/constants/api';
import {usePost} from '@/hooks';
import {goBack, resetRoot} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {ResponseType} from '@/types';
import {IForgotPassEvent} from '@/types/auth';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {ForgetPasswordStyle} from './ForgetPasswordStyle';
export const ForgetPassword = () => {
  const {t} = useTranslation('forgotPassword');
  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email(t('invalidEmail')).required(t('requiredEmail')),
  });
  const {loading, execute} = usePost<ResponseType<null>, IForgotPassEvent>(
    API_URL.Authentication.ForgetPassword,
    {
      onSuccess: res => {
        snackBar(res?.message, 'success');
        resetRoot('BottomTabNavigator');
      },
      onError: error => {
        snackBar(error, 'danger');
      },
    },
  );

  const onSubmit = (data: IForgotPassEvent) => {
    const newData = {
      ...data,
      captchaToken: 'TEST',
    };
    execute(newData);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IForgotPassEvent>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  return (
    <View style={ForgetPasswordStyle.container}>
      <View style={ForgetPasswordStyle.Child}>
        <TouchableOpacity onPress={() => goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={ForgetPasswordStyle.title}>{t('title')}</Text>
        <Text style={ForgetPasswordStyle.text}>{t('description')}</Text>
        <Text style={ForgetPasswordStyle.text}>{t('security')}</Text>
      </View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomTextInput
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholder={t('email')}
            width={90}
            placeholderColor="#6D6D6D"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />

      <CustomBtn
        width={90}
        title={t('sendResetInstructions')}
        radius={8}
        height={5}
        direction="rtl"
        borderWidth={2}
        isLoading={loading}
        onClick={handleSubmit(onSubmit)}
      />
    </View>
  );
};
