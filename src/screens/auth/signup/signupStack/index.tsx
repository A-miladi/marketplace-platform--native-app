import GoogleIcon from '@/assets/Icons/Google.svg';
import {navigate} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {colors} from '@/styles/colors';
import {useTranslation} from 'react-i18next';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {SignInStyle} from '../../signin/singInStack/SigninStyle';
import {useState} from 'react';
import {Modal} from '@/screens/components/modal';
import {UserType} from '../signupForm/userType';
import {RW} from '@/utils/DimensionsChange';
import {useFetch} from '@/hooks';
import {ResponseType} from '@/types';
import {API_URL} from '@/constants/api/index';
import {UserRole} from '@/types/user';

export const SignUpPage = () => {
  const {t} = useTranslation('signup');
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
        height={5}
        title={t('GoogleButton')}
        icon={<GoogleIcon />}
        radius={8}
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
        height={5}
        title={t('emailOrPhone')}
        radius={8}
        direction="rtl"
        backColor="white"
        borderWidth={2}
        borderColor={colors.primary[800]}
        titleColor={colors.primary[800]}
        onClick={() => navigate('SignUpForm')}
      />
      <Text style={SignInStyle.PrivacyPolicy}>{t('description')}</Text>

      <TouchableOpacity
        style={SignInStyle.signin}
        onPress={() => navigate('SignIn')}>
        <Text style={SignInStyle.signupText}>{t('haveAccount')}</Text>
        <Text style={SignInStyle.buttonText}>{t('signin')}</Text>
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
