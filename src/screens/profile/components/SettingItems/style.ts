import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SettingItemStyle = StyleSheet.create({
  container: {
    width: RW(90),
    height: RH(6.5),
    ..._styles.rowCenterSpace,
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
  },
  child: {
    ..._styles.rowCenter,
    gap: 6,
  },
  Title: {
    fontSize: RFS(1.8),
    fontWeight: 'normal',
    color: colors.neutral[700],
  },
});
