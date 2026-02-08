import BookmarkIcon from '@/assets/Icons/bookmark.svg';
import FilterIcon from '@/assets/Icons/filter.svg';
import NotificationIcon from '@/assets/Icons/Notification.svg';
import {API_URL} from '@/constants/api';
import {useFetch} from '@/hooks';
import {resetRoot} from '@/navigation/navigationServices';
import {ResponseType} from '@/types';
import {ICategory} from '@/types/category';
import React, {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {ADSFilter} from '../advertisement/ADSFilter';
import CustomBtn from '../components/common/button/Button';
import {Filter} from '../components/filter';
import {FilterCategory} from '../home/category/categoryFilter';
import {NavbarStyle} from './NavbarStyle';
interface INavBarProps {
  hasFilter?: boolean;
  hasNotification?: boolean;
}
export const NavBar: FC<INavBarProps> = ({
  hasFilter = false,
  hasNotification = false,
}) => {
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const {t} = useTranslation('Header');
  // const {data, refetch} = useFetch<ResponseType<ICategory[]>>(
  //   `${API_URL.Public.category}`,
  // );
  return (
    <SafeAreaView style={NavbarStyle.container}>
      <View style={NavbarStyle.box}>
        <View style={NavbarStyle.categoryBox}>
          <CustomBtn
            width={20}
            height={4}
            title={t('Category')}
            radius={8}
            onClick={() => setCategoryVisible(true)}
          />
          <View style={NavbarStyle.line} />
          <TouchableOpacity>
            <BookmarkIcon width={20} height={20} />
          </TouchableOpacity>

          {hasNotification && (
            <>
              <View style={NavbarStyle.line} />
              <TouchableOpacity>
                <NotificationIcon width={20} height={20} />
              </TouchableOpacity>
            </>
          )}

          {hasFilter && (
            <>
              <View style={NavbarStyle.line} />
              <TouchableOpacity onPress={() => setFilterVisible(true)}>
                <FilterIcon width={20} height={20} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() => resetRoot('Ath')}
          style={NavbarStyle.logo}>
          <Text style={NavbarStyle.logoText}>Logo</Text>
        </TouchableOpacity>
      </View>

      <Filter
        title="Category"
        visible={categoryVisible}
        onClose={() => setCategoryVisible(false)}>
        <FilterCategory />
      </Filter>
      <Filter
        title="Filters"
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}>
        <ADSFilter onClose={() => setFilterVisible(false)} />
      </Filter>
    </SafeAreaView>
  );
};
