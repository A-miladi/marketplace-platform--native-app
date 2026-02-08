import GoBack from '@/assets/Icons/ArrowLeft.svg';
import SaveIcon from '@/assets/Icons/save.svg';
import ShareIcon from '@/assets/Icons/share.svg';
import {RH, RW} from '@/utils/DimensionsChange';
import {FlashList} from '@shopify/flash-list';
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import {styles} from './style';

// const {width: SCREEN_WIDTH} = Dimensions.get('window');

type SlideItem = {
  id: string;
  image: string;
};

type SliderProps = {
  slides: SlideItem[];
  width?: number;
  height?: number;
};

export const Slider = ({slides, width = 100, height = 40}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flashListRef = useRef<FlashList<SlideItem>>(null);
  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.slider, {width: RW(width), height: RH(height)}]}>
        <FlashList
          ref={flashListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[styles.slide, {width: RW(width), height: RH(height)}]}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
          estimatedItemSize={200}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </Animated.View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
            onPress={() => {
              setCurrentIndex(index);
              flashListRef.current?.scrollToIndex({index, animated: true});
            }}
          />
        ))}
      </View>
      <View style={styles.Shadow} />
      <View style={styles.TopBar}>
        <TouchableOpacity
          onPress={() => {
            setCurrentIndex(0);
            flashListRef.current?.scrollToIndex({index: 0, animated: true});
          }}>
          <GoBack />
        </TouchableOpacity>
        <View style={styles.topBarBox}>
          <TouchableOpacity style={styles.saveButton}>
            <SaveIcon />
          </TouchableOpacity>
          <View style={styles.BoxLine} />
          <TouchableOpacity>
            <ShareIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
