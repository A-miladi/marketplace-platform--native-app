import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SellStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    paddingBottom: 20,
    width: '100%',
    fontWeight: 500,
    fontSize: RFS(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    marginBottom: 15,
  },
  checkbox: {
    height: RH(5),
    width: RW(90),
    backgroundColor: colors.neutral[50],
    ..._styles.rowCenterLeft,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  ButtonBox: {
    paddingVertical: 20,
    width: RW(90),
    ..._styles.centerElements,
    gap: 8,
  },
});
