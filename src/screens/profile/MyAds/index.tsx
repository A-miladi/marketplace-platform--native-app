import React from 'react';
import {View} from 'react-native';
import {PageTitle} from '../components/PageTitle';
import {AdsStatus} from './AdsStatus';
import {MyAdsStyle} from './style';

export function MyAds() {
  return (
    <View style={MyAdsStyle.container}>
      <PageTitle title="My Advertisement" />
      <AdsStatus />
    </View>
  );
}
