import BackIcon from '@/assets/Icons/Back.svg';
import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {goBack} from '@/navigation/navigationServices';
import {Chips} from '@/screens/components/common/chips';
import {Slider} from '@/screens/components/common/slider';
import SpinnerLoading from '@/screens/components/common/spinner';
import {ProfileContact} from '@/screens/components/ProfileContact';
import {ResponseType} from '@/types';
import {IAdvertisement, Status} from '@/types/advertisement';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HomeStyle} from '../home/HomeStyle';
import {SearchBar} from '../home/searchBar/SearchBar';
import {RelatedAds} from './Related-ads';
import {AdStats} from '@/constants/status';
import {_styles} from '@/styles/_styles';
import EditIcon from '@/assets/Icons/edit.svg';
import {colors} from '@/styles/colors';
import {useUserInfoStore} from '@/store/useUserInfo';
import {RH, RW} from '@/utils/DimensionsChange';
import {useTimeout} from '@/hooks/common/useTimeOut';
import {EmptyGallery} from '../components/common/emptyGallery';

type RouteParams = {
  id: number;
};

export const SingleADS = () => {
  const {t} = useTranslation('SingleAd');
  const {userInfo} = useUserInfoStore();
  const route = useRoute();
  const [showImagePlaceholder, setShowImagePlaceholder] = useState(true);
  const {id} = route.params as RouteParams;
  const {data: adData, loading} = useFetch<ResponseType<IAdvertisement>>(
    `${API_URL.Public.ad}/${id}`,
  );
  const renderTaskStatus = (status?: Status) => adData?.data?.status === status;
  const Properties = [
    {key: t('BrandModel'), value: adData?.data?.title || 'N/A'},
    {
      key: t('Year'),
      value: adData?.data?.created_at
        ? new Date(adData.data.created_at).toLocaleDateString('en-US')
        : 'N/A',
    },
    {key: t('location'), value: adData?.data?.city.name || 'N/A'},
    {
      key: t('Price'),
      value: adData?.data?.price
        ? `$${adData.data.price.toLocaleString()}`
        : 'N/A',
    },
  ];

  <SpinnerLoading visible={loading} />;
  const [images, setImages] = useState<Array<{id: string; image: string}>>([]);

  useTimeout(() => {
    if (images.length === 0) {
      setShowImagePlaceholder(false);
    }
  }, 10000);

  useEffect(() => {
    if (adData?.data?.images) {
      const formattedImages = adData.data.images.map((imageUrl, index) => ({
        id: `${index}-${Date.now()}`,
        image: imageUrl,
      }));
      setImages(formattedImages);
    }
  }, [adData?.data?.images]);

  return (
    <View style={HomeStyle.container}>
      <SearchBar />
      <ScrollView style={HomeStyle.scrollView}>
        <View style={HomeStyle.Chips}>
          <TouchableOpacity style={{padding: 4}} onPress={() => goBack()}>
            <BackIcon />
          </TouchableOpacity>
          {userInfo.id === adData?.data.user.id && (
            <>
              {renderTaskStatus('PENDING') && <Chips status="PENDING" />}
              {renderTaskStatus('REJECTED') && <Chips status="REJECTED" />}
              {renderTaskStatus('APPROVED') && <Chips status="APPROVED" />}
            </>
          )}
        </View>
        {images.length > 0 ? (
          <Slider slides={images} />
        ) : showImagePlaceholder ? (
          <View
            style={{
              ..._styles.centerElements,
              width: RW(100),
              height: RH(30),
            }}>
            <ActivityIndicator color={colors.primary[800]} />
          </View>
        ) : (
          <EmptyGallery />
        )}

        <View style={HomeStyle.Title}>
          <Text style={HomeStyle.title1}>{adData?.data.title}</Text>
          <View style={{..._styles.rowCenterSpace, width: '100%'}}>
            <Text style={HomeStyle.title2}>
              {new Date(adData?.data.created_at || '').toLocaleDateString(
                'en-US',
              )}
            </Text>
            <TouchableOpacity
              style={{
                ..._styles.rowCenter,
                gap: 6,
                borderWidth: 1,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 8,
                borderColor: colors.primary[700],
              }}>
              <EditIcon />
              <Text style={{color: colors.primary[700], fontSize: 12}}>
                Edit Advertisement
              </Text>
            </TouchableOpacity>
          </View>

          <View style={HomeStyle.border} />
        </View>

        <FlashList
          data={Properties}
          estimatedItemSize={50}
          renderItem={({item}) => (
            <View style={HomeStyle.propertiesBox}>
              <Text style={HomeStyle.propertiesBoxText}>{item.key}</Text>
              <Text style={HomeStyle.propertiesBoxText}>
                {typeof item.value === 'string'
                  ? item.value
                  : JSON.stringify(item.value)}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 6,
            paddingHorizontal: 25,
          }}
        />

        <View style={HomeStyle.description}>
          <View style={HomeStyle.descriptionBox}>
            <Text style={HomeStyle.descriptionTitle}>{t('Description')}</Text>
            <Text style={HomeStyle.descriptionText}>
              {adData?.data.description || 'No description available'}
            </Text>
          </View>
        </View>

        <ProfileContact
          name={adData?.data.user.profile.full_name}
          phoneNumber={adData?.data.user.phone_number || ''}
          image={adData?.data.user.profile.avatar || ''}
        />

        <RelatedAds
          scrollEnable={false}
          isApproved={adData?.data.status === AdStats.approved}
          id={id}
        />
      </ScrollView>
    </View>
  );
};
