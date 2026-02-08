import BackIcon from '@/assets/Icons/Back.svg';
import CloseEye from '@/assets/Icons/CloseEye.svg';
import OpenEye from '@/assets/Icons/openEye.svg';
import {API_URL} from '@/constants/api';
import {USER_TOKEN} from '@/constants/token';
import {usePost} from '@/hooks';
import {goBack, navigate, resetRoot} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {CheckBox} from '@/screens/components/common/checkBox';
import {Input} from '@/screens/components/common/input';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {useUserInfoStore} from '@/store/useUserInfo';
import {ResponseType} from '@/types';
import {ISignUpEvent, ISignUpResponse} from '@/types/auth';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';
import {SignInStyle} from '../../signin/singInStack/SigninStyle';
import {SignUpFormStyle} from './SignUpFormStyle';
import {UserType} from './userType';
import {UserRole} from '@/types/user';

export const SignUpForm = () => {
  const {t} = useTranslation('signup');
  const {t: SI} = useTranslation('signin');
  const [userType, setUserType] = useState<UserRole>('USER');
  const {setUserInfo} = useUserInfoStore();
  const signupSchema = yup.object().shape({
    first_name: yup.string().required(t('requiredName')),
    last_name: yup.string().required(t('requiredLastName')),
    email: yup.string().email(t('invalidEmail')).required(t('requiredEmail')),
    password: yup
      .string()
      .min(8, t('minpassword'))
      .matches(/[a-z]/, t('uppercaseAndLowercaseLetters'))
      .matches(/[A-Z]/, t('uppercaseAndLowercaseLetters'))
      .matches(/\d/, t('IncludesNumber'))
      .matches(/[\W_]+/, t('includeSpecialCharacters'))
      .required(t('requiredPassword')),
  });

  const {loading, execute} = usePost<
    ResponseType<ISignUpResponse>,
    ISignUpEvent
  >(API_URL.Authentication.Signup, {
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
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(signupSchema)});

  const onSubmit = (data: ISignUpEvent) => {
    const newData = {
      ...data,
      role: userType,
      captchaToken: 'TEST',
    };

    execute(newData);
  };
  const [selected, setSelected] = useState(false);

  const handleLanguageSelect = () => {
    setSelected(!selected);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -120 : 0}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={SignUpFormStyle.container}>
          <View style={SignUpFormStyle.child}>
            <TouchableOpacity onPress={() => goBack()}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={SignUpFormStyle.title}>{t('title')}</Text>
          </View>

          <View style={SignUpFormStyle.firstInput}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CustomTextInput
                  error={!!errors.first_name}
                  helperText={errors?.first_name?.message}
                  placeholder={t('firstName')}
                  width={43}
                  placeholderColor="#6D6D6D"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="first_name"
              defaultValue=""
            />

            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CustomTextInput
                  error={!!errors.last_name}
                  helperText={errors?.last_name?.message}
                  placeholder={t('lastName')}
                  width={43}
                  placeholderColor="#6D6D6D"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="last_name"
              defaultValue=""
            />
          </View>

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <CustomTextInput
                error={!!errors.email}
                helperText={errors?.email?.message}
                placeholder={SI('email')}
                width={90}
                placeholderColor="#6D6D6D"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                error={!!errors.password}
                helperText={errors?.password?.message}
                placeholder={t('password')}
                width={90}
                placeholderColor="#6D6D6D"
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
          <UserType onSelect={setUserType} />
          {/* check box */}
          <CheckBox
            isChecked={selected}
            onPress={() => handleLanguageSelect()}
            title={t('Privacy')}
          />

          <CustomBtn
            width={90}
            title={t('createAccount')}
            radius={8}
            direction="rtl"
            borderWidth={2}
            onClick={handleSubmit(onSubmit)}
            isLoading={loading}
          />

          <View style={SignInStyle.signin}>
            <Text style={SignInStyle.signupText}>{t('haveAccount')}</Text>
            <TouchableOpacity onPress={() => navigate('SignIn')}>
              <Text style={SignInStyle.buttonText}>{SI('signin')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
