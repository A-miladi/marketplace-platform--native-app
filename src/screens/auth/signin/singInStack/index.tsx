import GoogleIcon from '@/assets/Icons/Google.svg';
import {navigate} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {colors} from '@/styles/colors';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {SignInStyle} from './SigninStyle';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {UserRole} from '@/types/user';
import {useFetch} from '@/hooks';
import {ResponseType} from '@/types';
import {API_URL} from '@/constants/api/index';
import {Modal} from '@/screens/components/modal';
import {UserType} from '../../signup/signupForm/userType';
import {RW} from '@/utils/DimensionsChange';

export const SignInPage = () => {
  const {t} = useTranslation('signin');
  const [userType, setUserType] = useState<UserRole>('USER');
  const [showModal, setShowModal] = useState(false);
  const {refetch, loading} = useFetch<ResponseType<string>>(
    `${`${API_URL.Authentication.Sso}?role=${userType}`}`,
    {
      autoFetch: false,
      onSuccess: res => {
        Linking.openURL(res.data);
      },
    },
  );

  const handleSignUpWithGoogle = () => {
    refetch();
    setShowModal(false);
  };
  return (
    <View style={SignInStyle.container}>
      <Text style={SignInStyle.Title}>{t('title')}</Text>
      <CustomBtn
        width={90}
        title={t('googleButton')}
        icon={<GoogleIcon />}
        radius={8}
        height={5}
        direction="rtl"
        isLoading={loading}
        onClick={() => setShowModal(true)}
      />
      <View style={SignInStyle.lineStyle}>
        <View style={SignInStyle.line} />
        <Text style={SignInStyle.lineText}> or</Text>
      </View>
      <CustomBtn
        width={90}
        title={t('emailButton')}
        radius={8}
        height={5}
        direction="rtl"
        backColor="white"
        borderWidth={2}
        borderColor={colors.primary[800]}
        titleColor={colors.primary[800]}
        onClick={() => navigate('SignInForm')}
      />

      <TouchableOpacity
        style={SignInStyle.signup}
        onPress={() => navigate('SignUp')}>
        <Text style={SignInStyle.signupText}>{t('haveAccount')}</Text>
        <Text style={SignInStyle.buttonText}>{t('signup')}</Text>
      </TouchableOpacity>
      {showModal && (
        <Modal
          center={true}
          closer={() => setShowModal(false)}
          AcceptAction={handleSignUpWithGoogle}
          description="Please select your account type"
          boldText={true}
          AcceptTitle=" Confirm Selection">
          <UserType onSelect={setUserType} width={RW(76)} />
        </Modal>
      )}
    </View>
  );
};
