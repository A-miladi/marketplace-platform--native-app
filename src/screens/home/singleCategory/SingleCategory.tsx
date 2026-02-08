import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {navigate} from '@/navigation/navigationServices';
import CustomBtn from '@/screens/components/common/button/Button';
import {EmptyData} from '@/screens/components/common/emptyData';
import SpinnerLoading from '@/screens/components/common/spinner';
import {Title} from '@/screens/components/common/title';
import {ResponseType} from '@/types';
import {IAdvertisement} from '@/types/advertisement';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlashList} from '@shopify/flash-list';
import React, {FC, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {SCStyle} from './SCStyle';
import {SingleBox} from './singleBox/SingleBox';
import {DATA} from '../Data';
type RootStackParamList = {
  SingleADS: {id: number};
  Ads: undefined;
};

interface ISingleCategoryProps {
  paddingBottom?: number;
  scrollEnable?: boolean;
  hasButton?: boolean;
  backgroundColor?: string;
  color?: string;
  hasTitle?: boolean;
  paddingHorizontal?: number;
}

export const SingleCategory: FC<ISingleCategoryProps> = ({
  paddingBottom = 0,
  scrollEnable = true,
  hasButton = false,
  backgroundColor = '#F6F6F6',
  color = '#F6F6F6',
  hasTitle = true,
  paddingHorizontal = 12,
}) => {
  const {t} = useTranslation('Header');
  const {t: b} = useTranslation('ButtonText');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleAdPress = (id: number) => {
    navigation.navigate('SingleADS', {id});
  };

  const handleViewAllPress = () => {
    navigate('Ads');
  };

  return (
    <View style={[SCStyle.container, {backgroundColor, paddingHorizontal}]}>
      {hasTitle && (
        <Title left={1} text={t('Advertisement')} backgroundColor={color} />
      )}

      {/* <SpinnerLoading visible={loading} /> */}

      <View style={SCStyle.lastChild}>
        <FlashList
          data={DATA}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={200}
          renderItem={({item}) => (
            <SingleBox
              title={item.title}
              category={item.title}
              image={item.image[0] as string}
              price={item.price}
              description={item.description}
              is_bookmarked={false}
              onClick={() => handleAdPress(item.id)}
              id={item.id}
              // refetch={refetch}
              date={item.created_at}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom}}
          scrollEnabled={scrollEnable}
          // ListEmptyComponent={!loading ? <EmptyData type="ads" /> : null}
        />

        {hasButton && (
          <View style={SCStyle.moreBtn}>
            <CustomBtn
              width={22}
              height={3.5}
              title={b('ViewAll')}
              radius={6}
              onClick={handleViewAllPress}
            />
          </View>
        )}
      </View>
    </View>
  );
};
