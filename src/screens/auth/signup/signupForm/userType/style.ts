import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const UserTypeStyle = StyleSheet.create({
  container: {
    width: '88%',
    height: RH(3.5),
    ..._styles.rowCenterSpace,
  },
  buttons: {
    width: '60%',
    height: '100%',
    ..._styles.rowCenter,
    gap: 10,
  },
  button: {
    width: '50%',
    height: '100%',
    borderWidth: 2,
    borderColor: colors.neutral[200],
    ..._styles.centerElements,
    borderRadius: 16,
  },
  selectedButton: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[800],
  },
});
