import {TextInput, View} from 'react-native';
import {SearchStyle} from './SearchBarStyle';
import CustomBtn from '@/screens/components/common/button/Button';
import {useTranslation} from 'react-i18next';

export const SearchBar = () => {
  const {t} = useTranslation('Header');
  return (
    <View style={SearchStyle.container}>
      <View style={SearchStyle.HalfColor} />
      <View style={SearchStyle.SearchBar}>
        <TextInput
          style={SearchStyle.input}
          placeholder={t('ManufacturerAndModel')}
          placeholderTextColor="#888"
        />
        <TextInput
          style={SearchStyle.input}
          placeholder={t('CityStateOrCountry')}
          placeholderTextColor="#888"
        />
        <CustomBtn
          width={19}
          height={3.5}
          title={t('search')}
          radius={8}
          onClick={() => console.log('')}
        />
      </View>
    </View>
  );
};
