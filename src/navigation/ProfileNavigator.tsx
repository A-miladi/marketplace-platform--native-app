import {DeleteAccount} from '@/screens/profile/DeleteAccount';
import {Language} from '@/screens/profile/Language';
import {MyAds} from '@/screens/profile/MyAds';
import {MyFavoriteAds} from '@/screens/profile/MyFavorite';
import {MyProfile} from '@/screens/profile/MyProfile';
import Profile from '@/screens/profile/Profile';
import {ResetPass} from '@/screens/profile/ResetPass';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {AllStackParamList} from './types';

export const ProfileStack = () => {
  const RootStack = createNativeStackNavigator<AllStackParamList>();
  const {t} = useTranslation('Header');
  return (
    <RootStack.Navigator
      initialRouteName="profile"
      screenOptions={{animation: 'slide_from_right'}}>
      <RootStack.Screen
        name={t('profile') as keyof AllStackParamList}
        component={Profile}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MyAds"
        component={MyAds}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MyFavoriteAds"
        component={MyFavoriteAds}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Language"
        component={Language}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ResetPass"
        component={ResetPass}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};
