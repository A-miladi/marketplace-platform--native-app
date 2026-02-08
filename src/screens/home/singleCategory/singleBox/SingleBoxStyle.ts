import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SingleBoxStyle = StyleSheet.create({
  container: {
    height: RH(18),
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.neutral[100],
    marginVertical: 8,
    ..._styles.rowCenter,
  },
  firstChild: {
    width: '40%',
    height: '100%',
    position: 'relative',
    borderRightColor: colors.neutral[100],
    borderRightWidth: 1,
  },
  highLight: {
    ..._styles.centerElements,
    position: 'absolute',
    paddingHorizontal: 12,
    paddingTop: 5,
    height: 23,
    borderBottomRightRadius: 8,
    fontSize: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1,
    fontWeight: 500,
    backgroundColor: '#0064D3',
    color: '#fff',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  lastChild: {
    width: '60%',
    height: '100%',
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 2,
    justifyContent: 'space-between',
  },
  lastChildBox: {
    width: '100%',
    height: '75%',
    gap: 12,
  },
  title: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  titleText: {
    width: '90%',
    fontSize: 14,
    fontWeight: 400,
    color: '#0C0C0C',
  },
  brand: {
    fontSize: 12,
    fontWeight: 400,
    color: '#5D5D5D',
  },
  priceBox: {
    ..._styles.rowCenterSpace,
    width: '100%',
    height: '30%',
    paddingRight: 4,
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
});
