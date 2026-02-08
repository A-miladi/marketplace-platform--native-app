import CloseEye from '@/assets/Icons/CloseEye.svg';
import OpenEye from '@/assets/Icons/openEye.svg';
import {API_URL} from '@/constants/api';
import {usePost} from '@/hooks';
import {goBack} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {CheckBox} from '@/screens/components/common/checkBox';
import {Input} from '@/screens/components/common/input';
import {colors} from '@/styles/colors';
import {RFS} from '@/utils/DimensionsChange';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {PageTitle} from '../components/PageTitle';
import {ResetPassStyle} from './style';

interface INewPasswordEvent {
  password: string;
  confirm_password: string;
}

export const ResetPass = () => {
  const {t} = useTranslation(['UserProfile', 'newPassword']);
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, t('newPassword:minPassword'))
      .matches(/[a-z]/, t('newPassword:uppercaseAndLowercaseLetters'))
      .matches(/[A-Z]/, t('newPassword:uppercaseAndLowercaseLetters'))
      .matches(/\d/, t('newPassword:IncludesNumber'))
      .matches(/[\W_]+/, t('newPassword:includeSpecialCharacters'))
      .required(t('newPassword:requiredPassword')),
    confirm_password: yup
      .string()
      .min(8, t('newPassword:minPassword'))
      .required(t('newPassword:requiredPassword'))
      .oneOf([yup.ref('password')], t('newPassword:passwordsDontMatch')),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<INewPasswordEvent>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const {loading, execute} = usePost<{message: string}, INewPasswordEvent>(
    API_URL.User.ChangePassword,
    {
      onSuccess: res => {
        snackBar(res?.message, 'success');
        goBack();
      },
      onError: error => {
        snackBar(error, 'danger');
      },
    },
  );

  const onFormSubmit = (data: INewPasswordEvent) => {
    execute({
      ...data,
    });
    reset();
  };

  const handleLanguageSelect = () => {
    setSelected(!selected);
  };

  return (
    <View style={ResetPassStyle.container}>
      <View>
        <PageTitle title={t('ResetPass.ResetPass')} />
        <Text style={ResetPassStyle.text}>{t('ResetPass.description')}</Text>
      </View>

      <View style={ResetPassStyle.InputBox}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              error={!!errors.password}
              helperText={errors?.password?.message}
              placeholderColor="#6D6D6D"
              width={90}
              placeholder={t('ResetPass.CurrentPassword')}
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
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              error={!!errors.password}
              helperText={errors?.password?.message}
              placeholderColor="#6D6D6D"
              width={90}
              placeholder={t('ResetPass.NewPassword')}
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
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              error={!!errors.password}
              helperText={errors?.password?.message}
              placeholderColor="#6D6D6D"
              width={90}
              placeholder={t('UserProfile:ResetPass.ReTypeNewPassword')}
              onChangeText={onChange}
              value={value}
              icon={<CloseEye />}
              icon2={<OpenEye />}
              secureTextEntry
              initialSecureTextEntry={true}
            />
          )}
          name="confirm_password"
          defaultValue=""
        />

        <View style={{gap: 10}}>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: RFS(1.4),
                fontWeight: 'normal',
                color: colors.primary[700],
                paddingLeft: 1,
              }}>
              Forgot password ?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CheckBox
        isChecked={selected}
        onPress={handleLanguageSelect}
        title={t('UserProfile:ResetPass.LogOutOtherDevicesMessage')}
        boldText
        gap={8}
      />

      <CustomBtn
        width={90}
        title={t('UserProfile:ResetPass.ChangePass')}
        radius={8}
        direction="rtl"
        onClick={handleSubmit(onFormSubmit)}
        isLoading={loading}
      />
    </View>
  );
};
