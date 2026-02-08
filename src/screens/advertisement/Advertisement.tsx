import React from 'react';
import {View} from 'react-native';
import {SearchBar} from '../home/searchBar/SearchBar';
import {SingleCategory} from '../home/singleCategory/SingleCategory';
import {AdvertisementStyle} from './AdvertisementStyle';

export default function Advertisement() {
  return (
    <View style={AdvertisementStyle.container}>
      <SearchBar />
      <SingleCategory />
    </View>
  );
}
