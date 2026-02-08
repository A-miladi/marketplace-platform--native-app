import {RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const NavbarStyle = StyleSheet.create({
  container: {
    width: RW(100),
    flex: 0,
    alignItems: 'center',
    backgroundColor: '#EBFBFF',
  },
  box: {
    width: RW(88),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
  },
  categoryBox: {
    width: RW(50),
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    direction: 'ltr',
  },
  button: {
    width: 78,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#0064D3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
  },
  logo: {
    width: 108,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7E7E7',
  },
  logoText: {
    fontSize: 14,
    fontWeight: 400,
  },
  line: {
    width: 0.5,
    backgroundColor: '#B0B0B0',
    height: 25,
  },
});
