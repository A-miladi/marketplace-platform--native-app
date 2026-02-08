import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const RatingStyle = StyleSheet.create({
  ONStyle: {
    fontSize: 20,
    color: '#F8B232',
  },
  OFFStyle: {
    fontSize: 20,
    color: colors.neutral[200],
  },
  Stars: {
    ..._styles.rowCenter,
    gap: 4,
  },
});
