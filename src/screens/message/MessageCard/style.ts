import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const MessageCardStyle = StyleSheet.create({
  container: {
    width: RW(90),
    height: RH(8),
    borderWidth: 1,
    padding: 6,
    borderColor: colors.neutral[200],
    borderRadius: 8,
    ..._styles.rowCenterAround,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary[600],
    ..._styles.centerElements,
    overflow: 'hidden',
  },
  info: {
    width: '80%',
    height: '100%',
    justifyContent: 'space-between',
  },
  child: {
    width: '100%',
    height: '48%',
    ..._styles.rowCenterSpace,
    paddingHorizontal: 4,
  },
  name: {
    fontSize: RFS(1.5),
    fontWeight: '500',
  },
  messageInfo: {
    fontSize: RFS(1.4),
    color: colors.neutral[400],
  },
});
