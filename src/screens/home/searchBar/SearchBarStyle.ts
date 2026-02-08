import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SearchStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 63,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  HalfColor: {
    width: RW(100),
    height: 32,
    backgroundColor: '#EBFBFF',
    position: 'absolute',
    top: 0,
  },
  SearchBar: {
    width: RW(90),
    height: 48,
    gap: 6,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    width: '36%',
    height: RH(3.5),
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    paddingLeft: 8,
  },
  button: {
    width: '22%',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#0064D3',
  },
});
