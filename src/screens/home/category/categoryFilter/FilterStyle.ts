import {colors} from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const FCStyle = StyleSheet.create({
  buttons: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    borderBottomColor: colors.neutral[50],
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 400,
  },
});
