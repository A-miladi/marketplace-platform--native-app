import {StyleSheet} from 'react-native';
import {RFS, RH, RW} from '../utils/DimensionsChange';

export const customFonts = {
  extraBold: 'OpenSans-ExtraBold',
  bold: 'OpenSans-Bold',
  semiBold: 'OpenSans-SemiBold',
  medium: 'OpenSans-Medium',
  regular: 'OpenSans-Regular',
  light: 'OpenSans-Light',
};

//global styles
export const _styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    // backgroundColor: colors.WHITE,
  },
  //flex box
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowCenterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  SpaceElement: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenterSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenterAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rowBottomCenter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rowBottomRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rowBottomLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  rowTopCenter: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rowTopRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  rowTopLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  centerElements: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //shadow
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  //fonts
  headingTxt1: {
    fontSize: RFS(2.7),
    fontFamily: customFonts.regular,
    lineHeight: 33,
    fontWeight: '700',
  },
  headingTxt2: {
    fontSize: RFS(2.3),
    fontFamily: customFonts.regular,
    lineHeight: 27,
    fontWeight: '700',
  },
  titleTxt: {
    fontSize: RFS(2.2),
    fontFamily: customFonts.regular,
    lineHeight: 25,
    fontWeight: '700',
  },
  subTitleTxt1: {
    fontSize: RFS(2.2),
    fontFamily: customFonts.regular,
    lineHeight: 25,
    fontWeight: '500',
  },
  subTitleTxt2: {
    fontSize: RFS(2),
    fontFamily: customFonts.regular,
    lineHeight: 22,
    fontWeight: '500',
  },
  bodyTxt1: {
    fontSize: RFS(2.1),
    fontFamily: customFonts.regular,
    lineHeight: 22,
    fontWeight: '400',
  },
  bodyTxt2: {
    fontSize: RFS(1.8),
    fontFamily: customFonts.regular,
    lineHeight: 19,
    fontWeight: '500',
  },
  labelTxt: {
    fontSize: RFS(1.8),
    fontFamily: customFonts.regular,
    lineHeight: 19,
    fontWeight: '400',
  },
  inputTxt: {
    fontSize: RFS(2),
    fontFamily: customFonts.regular,
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonTxt: {
    fontSize: RFS(2),
    fontFamily: customFonts.regular,
    lineHeight: 22,
    fontWeight: '600',
  },
  smallTxt: {
    fontSize: RFS(1.6),
    fontFamily: customFonts.regular,
    lineHeight: 16,
    fontWeight: '500',
  },
  //driver form common styles
  formContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: colors.WHITE,
    paddingHorizontal: RW(5),
  },
  formTitle: {
    fontSize: RFS(2.2),
    fontFamily: customFonts.regular,
    lineHeight: 25,
    fontWeight: '700',
    // color: colors.SECONDARY,
    marginTop: RH(3.5),
    marginBottom: RH(1.5),
  },
  formBody: {
    flex: 1,
    width: RW(90),
    alignItems: 'center',
    marginBottom: RH(2),
  },
  formBtnContainer: {
    flexDirection: 'row-reverse',
    width: RW(85.5),
    justifyContent: 'space-between',
    marginBottom: RH(4),
    marginTop: RH(2),
    // backgroundColor: colors.WHITE,
  },
  //empty text
  emptyTxt: {
    // color: colors.HEAD7,
    fontSize: RFS(2),
    fontFamily: customFonts.regular,
    marginTop: RH(4),
    alignSelf: 'center',
  },
  //bottom sheet styles
  handleIndicatorStyle: {
    height: RH(0.5),
    borderRadius: RW(2),
    width: RW(16),
    // backgroundColor: colors.HEAD10,
  },
});
