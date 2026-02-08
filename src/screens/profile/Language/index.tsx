import CustomBtn from '@/screens/components/common/button/Button';
import {CheckBox} from '@/screens/components/common/checkBox';
import {colors} from '@/styles/colors';
import {snackBar} from '@/utils/snackBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {PageTitle} from '../components/PageTitle';
import {LanguageStyle} from './style';

type LangType = 'en' | 'de';

export const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LangType | null>(
    null,
  );
  const {i18n} = useTranslation('signin');

  useEffect(() => {
    const fetchSavedLanguage = async () => {
      const savedLang = await AsyncStorage.getItem('lang');
      if (savedLang === 'en' || savedLang === 'de') {
        setSelectedLanguage(savedLang);
      }
    };

    fetchSavedLanguage();
  }, []);

  const handleLanguageSelect = (language: LangType) => {
    setSelectedLanguage(language);
  };

  const changeLanguage = async (lang: LangType) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('lang', lang);
  };

  const handleSaveChanges = () => {
    if (selectedLanguage) {
      changeLanguage(selectedLanguage);
      const message =
        selectedLanguage === 'en'
          ? 'Language changed to English'
          : 'Language changed to German';

      snackBar(message, 'success');
    } else {
      snackBar('Please select a language', 'danger');
    }
  };

  return (
    <View style={LanguageStyle.container}>
      <PageTitle title="Change Language" />

      <Text style={LanguageStyle.text}>Select your preferred language</Text>

      <View style={LanguageStyle.SetLang}>
        <CheckBox
          gap={10}
          boldText
          title="English"
          isChecked={selectedLanguage === 'en'}
          onPress={() => handleLanguageSelect('en')}
        />
        <View style={LanguageStyle.line} />
        <CheckBox
          gap={10}
          boldText
          title="Germany"
          isChecked={selectedLanguage === 'de'}
          onPress={() => handleLanguageSelect('de')}
        />
      </View>

      <CustomBtn
        width={90}
        title="Cancellation"
        radius={8}
        direction="rtl"
        borderWidth={1}
        borderColor={colors.primary[800]}
        backColor="white"
        titleColor={colors.primary[800]}
        onClick={() => {
          setSelectedLanguage(null);
        }}
      />
      <CustomBtn
        width={90}
        title="Save Changes"
        radius={8}
        direction="rtl"
        borderWidth={2}
        onClick={handleSaveChanges}
      />
    </View>
  );
};
