import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const UserTitleStyle = StyleSheet.create({
  container: {
    width: RW(90),
    paddingVertical: 10,
    gap: 15,
    ..._styles.rowCenter,
  },
  hasBorder: {
    borderWidth: 2,
    borderColor: colors.neutral[100],
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  comments: {
    color: colors.neutral[300],
    fontSize: RFS(1.3),
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#CC946B',
    ..._styles.centerElements,
  },
  child: {
    width: '80%',
    paddingRight: 4,
    gap: 6,
  },
  UserName: {
    ..._styles.rowCenterSpace,
  },
});
