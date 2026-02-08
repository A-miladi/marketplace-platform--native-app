import {Title} from '@/screens/components/common/title';
import {DATA} from '@/screens/home/Data';
import {SCStyle} from '@/screens/home/singleCategory/SCStyle';
import {SingleBox} from '@/screens/home/singleCategory/singleBox/SingleBox';
import {FlashList} from '@shopify/flash-list';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, View} from 'react-native';
import {RelatedStyle} from './style';
import {useFetch} from '@/hooks';
import {ResponseType} from '@/types';
import {IAdvertisement} from '@/types/advertisement';
import {API_URL} from '@/constants/api';
import {EmptyData} from '@/screens/components/common/emptyData';
import {colors} from '@/styles/colors';
interface ISingleCategoryProps {
  paddingBottom?: number;
  scrollEnable?: boolean;
  id: string | number;
  isApproved: boolean;
}
export const RelatedAds: FC<ISingleCategoryProps> = ({
  paddingBottom,
  scrollEnable,
  id,
  isApproved,
}) => {
  const {t} = useTranslation('SingleAd');
  const {
    data: AdList,
    loading: AdLoading,
    refetch: refetchRelatedAd,
  } = useFetch<ResponseType<IAdvertisement[]>>(
    `${API_URL.Public.ad}/${id}/related`,
    {
      autoFetch: isApproved,
    },
  );
  return (
    <View style={RelatedStyle.container}>
      <Title left={0} text={t('RelatedAdvertisement')} backgroundColor="#Fff" />
      <View style={SCStyle.lastChild}>
        <FlashList
          data={AdList?.data}
          estimatedItemSize={50}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <SingleBox
              title={item.title}
              category={item.title}
              image={item.images[0]}
              price={item.price}
              is_bookmarked={item.is_bookmarked}
              description={item.description}
              id={item.id}
              refetch={refetchRelatedAd}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom}}
          scrollEnabled={scrollEnable}
          ListEmptyComponent={
            !AdLoading ? (
              <EmptyData type="ads" customMessage="no Advertisement found" />
            ) : (
              <ActivityIndicator color={colors.primary[800]} />
            )
          }
        />
      </View>
    </View>
  );
};
