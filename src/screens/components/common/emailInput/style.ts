import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const EmailInputStyle = StyleSheet.create({
  ResendCode: {
    ..._styles.rowCenterLeft,
    gap: 4,
    color: colors.primary[800],
  },
});
