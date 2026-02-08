import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const CollapseStyle = StyleSheet.create({
  container: {
    ..._styles.centerElements,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[50],
  },
  hasBorder: {
    ..._styles.centerElements,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.neutral[400],
    borderRadius: 4,
  },
  main: {
    ..._styles.rowCenterSpace,
    width: '100%',
  },
  text: {
    fontSize: 12,
    fontWeight: 400,
  },
  answer: {
    textAlign: 'justify',
    fontWeight: 400,
    fontSize: 12,
    paddingVertical: 8,
    color: colors.neutral[600],
  },
});
