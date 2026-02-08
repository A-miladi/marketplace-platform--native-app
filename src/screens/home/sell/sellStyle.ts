import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SellStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: colors.secondary[100],
    position: 'relative',
    marginVertical: 12,
  },
  empty: {
    width: '100%',
    paddingHorizontal: 30,
    height: RH(15),
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: colors.secondary[600],
    ..._styles.centerElements,
  },
  child: {
    height: RH(20),
    ..._styles.SpaceElement,
    paddingTop: 40,
  },
  image: {
    top: RH(2.5),
    position: 'absolute',
  },
  title: {
    ..._styles.rowCenter,
    gap: 4,
  },
  firstTitle: {
    color: colors.secondary[600],
    fontSize: 16,
    fontWeight: 500,
  },
  secondTitle: {
    color: colors.neutral[950],
    fontSize: 16,
    fontWeight: 500,
  },
  paragraph: {
    marginVertical: 8,
    width: RW(80),
    fontSize: 12,
    fontWeight: 400,
    color: colors.neutral[600],
    lineHeight: 20,
    textAlign: 'center',
  },
});
