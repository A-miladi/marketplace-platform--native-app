import {API_URL} from '@/constants/api';
import {Roles} from '@/constants/roles';
import {usePost} from '@/hooks';
import CustomBtn from '@/screens/components/common/button/Button';
import {Modal} from '@/screens/components/modal';
import {useUserInfoStore} from '@/store/useUserInfo';
import {colors} from '@/styles/colors';
import {ResponseType} from '@/types';
import {snackBar} from '@/utils/snackBar';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity} from 'react-native';

interface SwitchToCompanyProps {
  refetch: () => void;
}
export const Switcher = ({refetch}: SwitchToCompanyProps) => {
  const {t} = useTranslation('UserProfile');
  const [openModal, setOpenModal] = useState(false);
  const {userInfo} = useUserInfoStore();
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const {execute, loading} = usePost<ResponseType<object>, null>(
    API_URL.User.ConvertToCompany,
    {
      onSuccess: res => {
        snackBar(res.message, 'success');
        refetch();
        onCloseModal();
      },

      onError: err => {
        snackBar(err, 'danger');
      },
    },
  );

  const onSwitchClick = () => {
    execute(null);
  };

  //   const isCompany = userInfo.role === Roles.COMPANY;
  return (
    <>
      <CustomBtn
        width={35}
        title={t('Switch to company')}
        radius={8}
        titleColor={colors.primary[800]}
        backColor="white"
        borderColor={colors.primary[800]}
        direction="rtl"
        borderWidth={1}
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <Modal
          title="Confirm company profile switch?"
          description="Switching to a company profile will permanently change your account type. You won’t be able to revert to your previous user profile"
          CancelAction={onCloseModal}
          AcceptAction={onSwitchClick}
          AcceptTitle="Accept"
          CancelTitle="Cancel"
          closer={onCloseModal}
          loading={loading}
        />
      )}
    </>
  );
};
