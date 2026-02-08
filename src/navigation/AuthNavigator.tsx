import * as React from 'react';
//third parties
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//screens
import {SignIn} from '@/screens/auth/signin';
import {SignUp} from '@/screens/auth/signup';
//types
import {ForgetPassword} from '@/screens/auth/ForgetPassword';
import {ResetPassword} from '@/screens/auth/ResetPassword';
import {SignInForm} from '@/screens/auth/signin/signInForm';
import {SignUpForm} from '@/screens/auth/signup/signupForm';
import {AuthStackParamList} from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{animation: 'slide_from_right'}}>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignInForm"
        component={SignInForm}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
