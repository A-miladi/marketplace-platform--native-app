import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {navigate} from '@/navigation/navigationServices';
import {EmptyData} from '@/screens/components/common/emptyData';
import {SingleBox} from '@/screens/home/singleCategory/singleBox/SingleBox';
import {colors} from '@/styles/colors';
import {ResponseWithPaginationType} from '@/types';
import {IAdvertisement, Status} from '@/types/advertisement';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {AdsStatusStyle} from './style';

export type AdsStatusType = 'APPROVED' | 'PENDING' | 'REJECTED';
export function AdsStatus() {
  const {t} = useTranslation('UserProfile');
  const [activeTab, setActiveTab] = useState<Status>('APPROVED');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<IAdvertisement | null>(null);
  const {
    data: adsData,
    loading,
    refetch: refetchAds,
  } = useFetch<ResponseWithPaginationType<IAdvertisement[]>>(API_URL.User.Ad, {
    autoFetch: false,
  });
  const handleFilterAds = adsData?.data?.filter(
    item => item.status === activeTab,
  );
  console.log(adsData);
  useEffect(() => {
    refetchAds();
  }, [refetchAds]);

  return (
    <View style={{paddingBottom: 82}}>
      <View style={AdsStatusStyle.topBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('APPROVED')}
          style={[
            AdsStatusStyle.buttons,
            activeTab === 'APPROVED' && AdsStatusStyle.activeButton,
          ]}>
          <Text style={[activeTab === 'APPROVED' && AdsStatusStyle.activeText]}>
            {t('MyAds.ApprovedAds')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('PENDING')}
          style={[
            AdsStatusStyle.buttons,
            activeTab === 'PENDING' && AdsStatusStyle.activeButton,
          ]}>
          <Text style={[activeTab === 'PENDING' && AdsStatusStyle.activeText]}>
            {t('MyAds.PendingAds')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('REJECTED')}
          style={[
            AdsStatusStyle.buttons,
            activeTab === 'REJECTED' && AdsStatusStyle.activeButton,
          ]}>
          <Text style={[activeTab === 'REJECTED' && AdsStatusStyle.activeText]}>
            {t('MyAds.RejectedAds')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={handleFilterAds}
        estimatedItemSize={50}
        renderItem={({item}) => (
          <SingleBox
            title={item.title}
            category={item.category.name}
            image={item.images[0] as string}
            price={item.price}
            description={item.description}
            onClick={() => navigate('SingleADS')}
            refetch={refetchAds}
            id={item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <EmptyData type="ads" />
          ) : (
            <ActivityIndicator color={colors.primary[800]} />
          )
        }
      />
    </View>
  );
}
