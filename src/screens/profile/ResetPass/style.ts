import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ResetPassStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 45,
  },
  InputBox: {
    gap: 20,
  },
  text: {
    width: RW(90),
    fontSize: RFS(1.4),
    fontWeight: 'normal',
    paddingTop: 15,
    color: colors.neutral[700],
  },
});
