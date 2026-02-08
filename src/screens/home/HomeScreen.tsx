import React from 'react';
import {ScrollView} from 'react-native';
import {AboutUs} from './about-us';
import {Category} from './category';
import {HomeStyle} from './HomeStyle';
import {Questions} from './questions';
import {SearchBar} from './searchBar/SearchBar';
import {SellYours} from './sell';
import {SingleCategory} from './singleCategory/SingleCategory';

export default function HomeScreen() {
  return (
    <ScrollView style={HomeStyle.container}>
      <SearchBar />
      <Category />
      <SingleCategory scrollEnable={false} hasButton />
      <AboutUs />
      <SellYours />
      <Questions />
    </ScrollView>
  );
}
