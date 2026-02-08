import RefreshIcon from '@/assets/Icons/Refresh.svg';
import {API_URL} from '@/constants/api';
import {usePost} from '@/hooks';
import {useTimer} from '@/hooks/common/useTimer';
import {MyProfileStyle} from '@/screens/profile/MyProfile/style';
import {colors} from '@/styles/colors';
import {ResponseType} from '@/types';
import {SendVerification, VerificationRequest} from '@/types/user';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {snackBar} from '@/utils/snackBar';
import {FC, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Modal} from '../../modal';
import {EmailInputStyle} from '../emailInput/style';
import {CustomTextInput} from '../TextInput';

interface IPhoneProps {
  phoneVerified?: boolean;
  phone: string;
  refetchProfileData: () => void;
  defaultValue?: string;
}
export const Phone: FC<IPhoneProps> = ({
  phoneVerified,
  phone: initialPhone,
  refetchProfileData,
  defaultValue,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState(initialPhone);
  const {t} = useTranslation('UserProfile');
  const [code, setCode] = useState('');
  const {seconds, timerEnded, restart} = useTimer({initialSeconds: 120});
  const {execute} = usePost<ResponseType<object>, SendVerification>(
    API_URL.User.SendVerification,
    {
      onSuccess: res => {
        snackBar(res.message, 'success');
        setOpenModal(true);
      },
      onError: (errorMessage: string) => {
        snackBar(errorMessage, 'danger');
      },
    },
  );
  const {execute: verifyOtp} = usePost<
    ResponseType<object>,
    VerificationRequest
  >(API_URL.User.Verify, {
    onSuccess: res => {
      snackBar(res.message, 'success');
      setOpenModal(false);
      refetchProfileData();
    },

    onError: (errorMessage: string) => {
      snackBar(errorMessage, 'danger');
    },
  });
  const handleClickVerify = () => {
    execute({type: 'PHONE', value: phone});
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onResendOtp = () => {
    restart();
    handleClickVerify();
  };

  const onVerificationClick = () => {
    if (!code) {
      snackBar(t('MyProfile.PhoneVerification.EmptyCode'), 'danger');
      return;
    }
    verifyOtp({type: 'PHONE', value: phone, code: code});
  };

  const handleChange = (value: string) => {
    setCode(value);
  };
  return (
    <>
      <View style={{gap: 6}}>
        <PhoneInput
          ref={phoneInput}
          disabled={phoneVerified}
          value={phone}
          defaultValue={defaultValue}
          defaultCode="DE"
          onChangeFormattedText={value => {
            setPhone(value);
          }}
          containerStyle={{
            width: RW(90),
            borderColor: colors.neutral[400],
            borderWidth: 1,
            padding: 2,
            height: RH(5),
            borderRadius: 8,
          }}
          countryPickerButtonStyle={{
            borderRightColor: colors.neutral[200],
            borderRightWidth: 1,
            width: '17%',
          }}
          textContainerStyle={{
            backgroundColor: 'transparent',
            height: 40,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          textInputStyle={{
            height: 40,
          }}
          codeTextStyle={{
            backgroundColor: 'white',
            color: 'black',
            height: 40,
            paddingVertical: 12,
            paddingHorizontal: 5,
            fontSize: RFS(1.6),
          }}
        />
        {!phoneVerified && (
          <View style={MyProfileStyle.verify}>
            <Text
              style={[MyProfileStyle.verifyText, {color: colors.neutral[500]}]}>
              {t('MyProfile.PhoneVerification.NotVerified')}
            </Text>
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <Text
                style={[
                  MyProfileStyle.verifyText,
                  {color: colors.primary[800]},
                ]}>
                {t('MyProfile.PhoneVerification.VerifyNow')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {openModal && (
        <Modal
          closer={onCloseModal}
          AcceptAction={onVerificationClick}
          AcceptTitle={t('MyProfile.PhoneVerification.VerifyButton')}
          gap={6}
          title={t('MyProfile.PhoneVerification.Title')}>
          <CustomTextInput
            width={78}
            height={4.5}
            placeholder="Enter the code"
            placeholderColor={colors.neutral[600]}
            value={code}
            onChangeText={handleChange}
            keyboardType="numeric"
          />
          <View style={{marginTop: 8}}>
            {!timerEnded ? (
              <Text style={EmailInputStyle.ResendCode}>
                {t('MyProfile.PhoneVerification.ResendCode')}(
                {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' : ''}
                {seconds % 60})
              </Text>
            ) : (
              <TouchableOpacity
                style={EmailInputStyle.ResendCode}
                onPress={onResendOtp}>
                <RefreshIcon />
                <Text style={{color: colors.primary[800]}}>
                  {t('MyProfile.PhoneVerification.ResendCode')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Modal>
      )}
    </>
  );
};
