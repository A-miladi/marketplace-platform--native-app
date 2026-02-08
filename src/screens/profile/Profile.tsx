import AdsIcon from '@/assets/Icons/Advertisement.svg';
import FavoriteIcon from '@/assets/Icons/bookmark.svg';
import DelAccountIcon from '@/assets/Icons/deleteAccount.svg';
import LangIcon from '@/assets/Icons/language.svg';
import LogOutIcon from '@/assets/Icons/logOut.svg';
import UserIcon from '@/assets/Icons/profile.svg';
import ResetPassIcon from '@/assets/Icons/resetPass.svg';
import {navigate, resetRoot} from '@/navigation/navigationServices';
import {AllStackParamList} from '@/navigation/types';
import {colors} from '@/styles/colors';
import {RW} from '@/utils/DimensionsChange';
import {snackBar} from '@/utils/snackBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Modal} from '../components/modal';
import {SettingItems} from './components/SettingItems';
import {UserTitle} from './components/userTitle';
import {ProfileStyle} from './ProfileStyle';

export default function Profile() {
  const SettingItem = [
    {title: 'My Profile', icon: <UserIcon />, link: 'MyProfile'},
    {title: 'My Advertisement', icon: <AdsIcon />, link: 'MyAds'},
    {
      title: 'My Favorite Advertisement',
      icon: <FavoriteIcon />,
      link: 'MyFavoriteAds',
    },
    {title: 'Language', icon: <LangIcon />, link: 'Language'},
    {title: 'Reset Password', icon: <ResetPassIcon />, link: 'ResetPass'},
    {title: 'Delete Account', icon: <DelAccountIcon />, link: 'DeleteAccount'},
  ];
  const [openModal, setOpenModal] = useState(false);
  function handleLogout() {
    AsyncStorage.clear();
    setOpenModal(false);
    snackBar('logged out successfully', 'success');
    resetRoot('Auth');
  }

  return (
    <View style={ProfileStyle.container}>
      <UserTitle />
      <View
        style={{
          width: RW(100),
          height: 1,
          backgroundColor: colors.neutral[200],
        }}
      />
      {SettingItem.map((i, idx) => (
        <SettingItems
          title={i.title}
          icon={i.icon}
          key={idx}
          action={() => navigate(i.link as keyof AllStackParamList)}
        />
      ))}
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        style={ProfileStyle.logOut}>
        <LogOutIcon />
        <Text style={ProfileStyle.logOutText}>Log out of Account</Text>
      </TouchableOpacity>
      {openModal && (
        <Modal
          closer={() => setOpenModal(false)}
          title="Log out of account"
          description="Do you want to log out of your account?"
          CancelAction={handleLogout}
          AcceptAction={() => setOpenModal(false)}
          AcceptTitle="No"
          CancelTitle="Yes"
        />
      )}
    </View>
  );
}
