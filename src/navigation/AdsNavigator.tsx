import Advertisement from '@/screens/advertisement/Advertisement';
import {SingleADS} from '@/screens/single-ads';
import {Comments} from '@/screens/single-ads/comments';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {AllStackParamList} from './types';

export const AdsStack = () => {
  const RootStack = createNativeStackNavigator<AllStackParamList>();
  const {t} = useTranslation('Header');
  return (
    <RootStack.Navigator
      initialRouteName="Advertisement"
      screenOptions={{animation: 'slide_from_right'}}>
      <RootStack.Screen
        name={t('Advertisement') as keyof AllStackParamList}
        component={Advertisement}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SingleADS"
        component={SingleADS}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="comments"
        component={Comments}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
