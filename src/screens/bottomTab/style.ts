import {_styles} from '@/styles/_styles';
import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const BottomStyle = StyleSheet.create({
  container: {
    height: RH(8),
    width: RW(100),
    backgroundColor: 'White',
    ..._styles.rowCenterAround,
  },
  itemStyle: {},
  textContainer: {},
  text: {},
});
