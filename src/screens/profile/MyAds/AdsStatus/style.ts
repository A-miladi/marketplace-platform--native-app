import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const AdsStatusStyle = StyleSheet.create({
  topBar: {
    ..._styles.rowCenterSpace,
    width: RW(90),
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
  },
  buttons: {
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 10,
  },
  activeButton: {
    borderBottomColor: colors.primary[800],
    borderBottomWidth: 1,
  },
  activeText: {
    color: colors.primary[800],
  },
});
