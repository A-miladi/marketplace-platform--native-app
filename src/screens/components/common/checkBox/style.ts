import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const CheckBoxStyle = StyleSheet.create({
  container: {
    ..._styles.rowCenterLeft,
  },
  checkboxContainer: {
    marginVertical: 4,
    ..._styles.rowCenterLeft,
    gap: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: 4,
    ..._styles.centerElements,
  },
  checkboxChecked: {
    backgroundColor: colors.primary[800],
    borderColor: '#0064D3',
    paddingLeft: 1,
  },
  checkboxText: {
    fontSize: RFS(1.4),
    color: colors.neutral[600],
    fontWeight: 'normal',
    width: '92%',
  },
  boldText: {
    fontSize: RFS(1.5),
    color: colors.neutral[900],
    fontWeight: 'medium',
    width: '92%',
  },
});
