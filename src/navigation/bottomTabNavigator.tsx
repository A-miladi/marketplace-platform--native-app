import CustomTabBar from '@/components/customTabBar';
import Message from '@/screens/message/Message';
import {NavBar} from '@/screens/navbar';
import SellOnUA from '@/screens/sellOnUA/SellOnUA';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {AdsStack} from './AdsNavigator';
import {HomeStack} from './HomeNavigator';
import {ProfileStack} from './ProfileNavigator';
import {AllStackParamList} from './types';

export const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator<AllStackParamList>();
  const {t} = useTranslation('Header');

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        header: () => <NavBar />,
      }}>
      <BottomTab.Screen
        name={t('Home') as keyof AllStackParamList}
        component={HomeStack}
      />
      <BottomTab.Screen
        name={t('Ads') as keyof AllStackParamList}
        component={AdsStack}
        options={{header: () => <NavBar hasFilter hasNotification />}}
      />
      <BottomTab.Screen
        name={t('SellOnUA') as keyof AllStackParamList}
        component={SellOnUA}
      />
      <BottomTab.Screen
        name={'Message' as keyof AllStackParamList}
        component={Message}
      />
      <BottomTab.Screen
        name={'profile' as keyof AllStackParamList}
        component={ProfileStack}
        options={{header: () => <NavBar hasNotification />}}
      />
    </BottomTab.Navigator>
  );
};
