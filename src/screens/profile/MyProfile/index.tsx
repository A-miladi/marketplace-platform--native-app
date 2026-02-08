import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {PageTitle} from '../components/PageTitle';
import {CompanyForm} from './CompanyForm';
import {MyProfileStyle} from './style';
import {UserForm} from './UserForm';

import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {useUserInfoStore} from '@/store/useUserInfo';
import {ResponseType} from '@/types';
import {User, UserRole} from '@/types/user';
import SpinnerLoading from '@/screens/components/common/spinner';

export const MyProfile = () => {
  const {setUserInfo, userInfo} = useUserInfoStore();
  const {
    data: user,
    loading: userDataLoading,
    refetch: refetchProfileData,
  } = useFetch<ResponseType<User>>(`${API_URL.User.User}`);
  const [isForm, setIsForm] = useState<UserRole>('USER');

  const handleSwitch = () => {
    setIsForm(prev => (prev === 'USER' ? 'COMPANY' : 'USER'));
  };
  useEffect(() => {
    if (user?.data) {
      setUserInfo(user.data);
    }
  }, [setUserInfo, user?.data]);
  return (
    <View style={MyProfileStyle.container}>
      <SpinnerLoading visible={userDataLoading} />
      <PageTitle title="My Profile" />
      {isForm === 'COMPANY' || userInfo.role === 'COMPANY' ? (
        <CompanyForm refetch={refetchProfileData} />
      ) : (
        <UserForm refetch={refetchProfileData} onSwitch={handleSwitch} />
      )}
    </View>
  );
};
