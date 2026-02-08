export type TabRootStackParamList = {
  BottomTabNavigator: undefined;
  Message: undefined;
  SellOnUA: undefined;
};
export type AuthStackParamList = {
  Auth: undefined;
  SignIn: undefined;
  SignInForm: undefined;
  SignUp: undefined;
  SignUpForm: undefined;
  ForgetPassword: undefined;
  resetPassword: undefined;
  SSO: undefined;
};
export type HomeStackParamList = {
  Home: undefined;
  HomePage: undefined;
  SingleADS: undefined;
};
export type AdsStackParamList = {
  Ads: undefined;
  Advertisement: undefined;
  SingleADS: undefined;
  comments: undefined;
};
export type ProfileStackParamList = {
  profile: undefined;
  MyProfile: undefined;
  MyAds: undefined;
  MyFavoriteAds: undefined;
  Language: undefined;
  ResetPass: undefined;
  DeleteAccount: undefined;
};
export type AllStackParamList = AuthStackParamList &
  TabRootStackParamList &
  ProfileStackParamList &
  AdsStackParamList &
  HomeStackParamList;
