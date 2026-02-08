import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/home/HomeScreen';
import {SingleADS} from '@/screens/single-ads';
import {useTranslation} from 'react-i18next';
import {AllStackParamList} from './types';
import {Comments} from '@/screens/single-ads/comments';

export const HomeStack = () => {
  const RootStack = createNativeStackNavigator<AllStackParamList>();
  const {t} = useTranslation('Header');
  return (
    <RootStack.Navigator
      initialRouteName="HomePage"
      screenOptions={{animation: 'slide_from_right'}}>
      <RootStack.Screen
        name={t('HomePage') as keyof AllStackParamList}
        component={HomeScreen}
        options={{
          headerShown: false,
          gestureEnabled: true,
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
