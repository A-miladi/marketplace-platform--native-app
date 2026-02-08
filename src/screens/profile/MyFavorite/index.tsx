import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {navigate} from '@/navigation/navigationServices';
import {EmptyData} from '@/screens/components/common/emptyData';
import {SingleBox} from '@/screens/home/singleCategory/singleBox/SingleBox';
import {ResponseWithPaginationType} from '@/types';
import {GetBookmarkAdvertisement} from '@/types/advertisement';
import {FlashList} from '@shopify/flash-list';
import {View} from 'react-native';
import {PageTitle} from '../components/PageTitle';
import {FavoriteStyle} from './style';

export const MyFavoriteAds = () => {
  const {
    data: bookmarkData,
    loading,
    refetch: refetchBookMark,
  } = useFetch<ResponseWithPaginationType<GetBookmarkAdvertisement[]>>(
    API_URL.User.Bookmark,
  );
  return (
    <View style={FavoriteStyle.container}>
      <PageTitle title="My Favorite" />
      <View style={FavoriteStyle.items}>
        <FlashList
          data={bookmarkData?.data}
          estimatedItemSize={50}
          renderItem={({item}) => (
            <SingleBox
              id={item.ad.id}
              title={item.ad.title}
              category={item.ad.title}
              image={item.ad.images[0] as string}
              price={item.ad.price}
              description={item.ad.description}
              onClick={() => navigate('SingleADS')}
              refetch={refetchBookMark}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          scrollEnabled={true}
          ListEmptyComponent={!loading ? <EmptyData type="favorites" /> : null}
        />
      </View>
    </View>
  );
};
