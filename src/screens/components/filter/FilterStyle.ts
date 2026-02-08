import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const FilterStyle = StyleSheet.create({
  container: {
    width: RW(70),
    height: RH(100),
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    shadowColor: colors.neutral[800],
    shadowOffset: {width: 10, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    gap: 10,
  },
  header: {
    ..._styles.rowCenterSpace,
    width: '100%',
    paddingHorizontal: 15,
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 2,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  filter: {
    paddingHorizontal: 15,
  },
});
