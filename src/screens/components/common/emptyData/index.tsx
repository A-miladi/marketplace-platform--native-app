import {StyleSheet, Text, View} from 'react-native';
import EmptyAds from '@/assets/Icons/emptyAds.svg';
import EmptyFav from '@/assets/Icons/EmptyFav.svg';
import {colors} from '@/styles/colors';
import {RFS} from '@/utils/DimensionsChange';
import {useTranslation} from 'react-i18next';

type EmptyDataType = 'favorites' | 'ads';

interface EmptyDataProps {
  type: EmptyDataType;
  customMessage?: string;
}

export const EmptyData = ({type, customMessage}: EmptyDataProps) => {
  const {t} = useTranslation('UserProfile');
  const content = {
    favorites: {
      icon: <EmptyFav />,
      text: customMessage || 'There are no favorite ads in this section.',
    },
    ads: {
      icon: <EmptyAds />,
      text: customMessage || t('FavoriteAdvertisement.HaveNotFavoriteAd'),
    },
  };

  return (
    <View style={style.container}>
      {content[type].icon}
      <Text style={style.text}>{content[type].text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    gap: 15,
  },
  text: {
    color: colors.neutral[300],
    fontSize: RFS(1.7),
    fontWeight: '500',
    textAlign: 'center',
  },
});
