import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ChipsStyle = StyleSheet.create({
  container: {
    ..._styles.rowCenter,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    borderRadius: 4,
    backgroundColor: '#fff',
    gap: 4,
  },
  text: {
    fontSize: RFS(1.2),
  },
});
