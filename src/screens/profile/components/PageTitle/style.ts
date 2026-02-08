import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const PageTitleStyle = StyleSheet.create({
  title: {
    width: RW(90),
    bottom: 0,
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
    paddingBottom: 15,
    ..._styles.rowCenterLeft,
    gap: 10,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: RFS(1.7),
    fontWeight: 'normal',
    color: colors.neutral[600],
  },
});
