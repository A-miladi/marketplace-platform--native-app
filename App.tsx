import React, {useEffect} from 'react';
import RootNavigator from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import {snackBar} from './src/utils/snackBar';
export default function App() {
  const {i18n} = useTranslation();

  const handleGetLang = async () => {
    try {
      const LangStorage = await AsyncStorage.getItem('lang');
      i18n.changeLanguage(LangStorage ?? 'en');
    } catch (error) {
      snackBar('Language not found', 'danger');
    }
  };
  useEffect(() => {
    handleGetLang();
  }, []);

  return (
    <>
      <RootNavigator />
      <FlashMessage position="bottom" />
    </>
  );
}
