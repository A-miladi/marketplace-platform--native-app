import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const CommentBoxStyle = StyleSheet.create({
  continue: {
    width: RW(90),

    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
    paddingVertical: 20,
    gap: 12,
  },
  title: {
    fontSize: RFS(1.6),
    color: colors.neutral[900],
  },
  date: {
    fontSize: RFS(1.6),
    color: colors.neutral[300],
    fontWeight: 500,
  },
  message: {
    fontSize: RFS(1.5),
    lineHeight: 20,
    fontWeight: 'normal',
    color: colors.neutral[600],
  },
});
