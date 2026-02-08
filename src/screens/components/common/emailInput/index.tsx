import EditIcon from '@/assets/Icons/edit.svg';
import RefreshIcon from '@/assets/Icons/Refresh.svg';
import {API_URL} from '@/constants/api';
import {usePost} from '@/hooks';
import {useTimer} from '@/hooks/common/useTimer';
import {MyProfileStyle} from '@/screens/profile/MyProfile/style';
import {colors} from '@/styles/colors';
import {ResponseType, ResponseWithPaginationType} from '@/types';
import {SendVerification, VerificationRequest} from '@/types/user';
import {snackBar} from '@/utils/snackBar';
import {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {Modal} from '../../modal';
import {CustomTextInput} from '../TextInput';
import {EmailInputStyle} from './style';

interface IEmailProps {
  emailVerified?: boolean;
  email: string;
  refetchProfileData: () => void;
}

export const Email: FC<IEmailProps> = ({
  emailVerified,
  email: initialEmail,
  refetchProfileData,
}) => {
  const {t} = useTranslation('UserProfile');
  const {t: otpT} = useTranslation('otp');
  const [code, setCode] = useState('');
  const {seconds, timerEnded, restart} = useTimer({initialSeconds: 120});
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  const {execute: sendVerification} = usePost<
    ResponseWithPaginationType<object>,
    SendVerification
  >(API_URL.User.SendVerification, {
    onSuccess: res => {
      snackBar(res.message, 'success');
      setOpenModal(true);
      restart();
    },
    onError: (errorMessage: string) => {
      snackBar(errorMessage, 'danger');
    },
  });

  const {execute: verifyOtp} = usePost<
    ResponseType<object>,
    VerificationRequest
  >(API_URL.User.Verify, {
    onSuccess: res => {
      snackBar(res.message, 'success');
      setOpenModal(false);
      setCode('');
      refetchProfileData();
    },
    onError: (errorMessage: string) => {
      snackBar(errorMessage, 'danger');
    },
  });

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleClickVerify = () => {
    if (!email) {
      snackBar(t('MyProfile.EmailVerification.EmptyEmail'), 'danger');
      return;
    }
    sendVerification({type: 'EMAIL', value: email});
  };

  const onResendOtp = () => {
    if (timerEnded) {
      restart();
      handleClickVerify();
    }
  };

  const onVerificationClick = () => {
    if (!code) {
      snackBar(t('MyProfile.EmailVerification.EmptyCode'), 'danger');
      return;
    }
    verifyOtp({type: 'EMAIL', value: email, code: code});
  };

  const handleChange = (value: string) => {
    setCode(value);
  };

  return (
    <>
      <View style={{gap: 6}}>
        <CustomTextInput
          placeholder={t('MyProfile.email')}
          width={90}
          placeholderColor="#6D6D6D"
          icon={<EditIcon />}
          defaultValue={initialEmail}
          onChangeText={handleEmailChange}
          value={email}
        />
        {!emailVerified && (
          <View style={MyProfileStyle.verify}>
            <Text
              style={[MyProfileStyle.verifyText, {color: colors.neutral[500]}]}>
              {t('MyProfile.EmailVerification.NotVerified')}
            </Text>
            <TouchableOpacity onPress={handleClickVerify}>
              <Text
                style={[
                  MyProfileStyle.verifyText,
                  {color: colors.primary[800]},
                ]}>
                {t('MyProfile.EmailVerification.VerifyNow')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {openModal && (
        <Modal
          closer={() => setOpenModal(false)}
          AcceptAction={onVerificationClick}
          AcceptTitle={t('MyProfile.EmailVerification.VerifyButton')}
          gap={6}
          title={t('MyProfile.EmailVerification.Title')}>
          <CustomTextInput
            width={78}
            height={4.5}
            placeholder={t('MyProfile.EmailVerification.EnterCode')}
            placeholderColor={colors.neutral[600]}
            value={code}
            onChangeText={handleChange}
            keyboardType="numeric"
          />
          <View style={{marginTop: 8}}>
            {!timerEnded ? (
              <Text style={EmailInputStyle.ResendCode}>
                {otpT('resendCode')}({Math.floor(seconds / 60)}:
                {seconds % 60 < 10 ? '0' : ''}
                {seconds % 60})
              </Text>
            ) : (
              <TouchableOpacity
                style={EmailInputStyle.ResendCode}
                onPress={onResendOtp}>
                <RefreshIcon />
                <Text style={{color: colors.primary[800]}}>
                  {otpT('resendCode')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}
    </>
  );
};
