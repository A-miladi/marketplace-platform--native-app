import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const MessageListStyle = StyleSheet.create({
  EmptyMessage: {
    ..._styles.centerElements,
    gap: 15,
    height: RH(60),
  },
  EmptyText: {
    fontWeight: '500',
    color: colors.neutral[400],
  },
});
