import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ContactStyle = StyleSheet.create({
  container: {
    width: RW(100),
    paddingHorizontal: 25,
    paddingVertical: 20,
    ..._styles.centerElements,
    gap: 10,
  },
  ProfileImage: {
    width: 74,
    height: 74,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#CC946B',
    ..._styles.centerElements,
  },
  title: {
    color: colors.neutral[900],
    fontSize: 14,
    fontWeight: 500,
  },
  contactButton: {
    width: RW(80),
    height: RH(4),
    backgroundColor: '#F6F6F6',
    ..._styles.rowCenterSpace,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  PhoneNumber: {
    width: '50%',
    textAlign: 'right',
  },
  Text: {
    width: '40%',
    textAlign: 'left',
  },
});
