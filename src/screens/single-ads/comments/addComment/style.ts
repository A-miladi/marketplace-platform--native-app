import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const AddCommentStyle = StyleSheet.create({
  container: {
    width: RW(91),
    height: RH(12),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.primary[50],
    borderRadius: 16,
    ..._styles.centerElements,
    position: 'absolute',
    bottom: 20,
    shadowColor: colors.neutral[400],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 15,
  },
  child: {
    ..._styles.rowCenter,
    gap: 4,
  },
  title: {
    fontSize: RFS(1.5),
  },
});
