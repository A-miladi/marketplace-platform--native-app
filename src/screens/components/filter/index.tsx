import CloseIcon from '@/assets/Icons/Close.svg';
import {FC, useEffect} from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FilterStyle} from './FilterStyle';

interface IFilterProps {
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  visible: boolean;
}

export const Filter: FC<IFilterProps> = ({
  onClose,
  children,
  title,
  visible,
}) => {
  const translateX = useSharedValue(-Dimensions.get('window').width);

  useEffect(() => {
    translateX.value = visible
      ? withTiming(0, {duration: 300})
      : withTiming(-Dimensions.get('window').width, {duration: 300});
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <Animated.View
      style={[
        FilterStyle.container,
        animatedStyle,
        Platform.OS === 'ios' && {paddingVertical: 60},
      ]}>
      <View style={FilterStyle.header}>
        <Text style={FilterStyle.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      {/* buttons */}
      <ScrollView style={FilterStyle.filter}>{children}</ScrollView>
    </Animated.View>
  );
};
