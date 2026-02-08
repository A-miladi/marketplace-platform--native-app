import * as React from 'react';
//third parties
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//navigators
// import AuthNavigator from './AuthNavigator';
// import DrawerNavigator from './DrawerNavigator';
// //screens
// import Welcome from '@/screens/Welcome';
//types
import {AllStackParamList} from './types';
//references
import AuthNavigator from './AuthNavigator';
import {BottomTabNavigator} from './bottomTabNavigator';
import {navigationRef} from './navigationServices';

const RootStack = createNativeStackNavigator<AllStackParamList>();
const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="BottomTabNavigator"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}>
        <RootStack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
