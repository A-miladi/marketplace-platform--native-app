import CloseEye from '@/assets/Icons/CloseEye.svg';
import OpenEye from '@/assets/Icons/openEye.svg';
import {resetRoot} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {Input} from '@/screens/components/common/input';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {ResetPasswordStyle} from './ResetPasswordStyle';

export const ResetPassword = () => {
  const {t} = useTranslation('newPassword');

  return (
    <View style={ResetPasswordStyle.container}>
      <Text style={ResetPasswordStyle.title}>{t('title')}</Text>
      <Input
        width={90}
        placeholder={t('title')}
        placeholderColor="#6D6D6D"
        icon={<CloseEye />}
      />
      <Input
        width={90}
        placeholder={t('repeatNewPassword')}
        placeholderColor="#6D6D6D"
        icon={<CloseEye />}
        icon2={<OpenEye />}
        secureTextEntry
        initialSecureTextEntry={true}
      />
      <View style={ResetPasswordStyle.includes}>
        <Text style={ResetPasswordStyle.includesText}>
          {t('uppercaseAndLowercaseLetters')}
        </Text>
        <Text style={ResetPasswordStyle.includesText}>
          {t('IncludesNumber')}
        </Text>
        <Text style={ResetPasswordStyle.includesText}>
          {t('eightCharacters')}
        </Text>
      </View>
      <CustomBtn
        width={90}
        title={t('VerifyButton')}
        radius={8}
        direction="rtl"
        borderWidth={2}
        onClick={() => resetRoot('BottomTabNavigator')}
      />
    </View>
  );
};
