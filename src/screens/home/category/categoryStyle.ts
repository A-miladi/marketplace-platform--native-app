import {_styles} from '@/styles/_styles';
import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const CategoryStyle = StyleSheet.create({
  container: {
    width: RW(100),
    height: 181,
    position: 'relative',
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  HalfColor: {
    width: RW(100),
    position: 'absolute',
    height: '70%',
    backgroundColor: '#FBF7F1',
    top: 0,
  },
  firstChild: {
    ..._styles.centerElements,
    width: RW(100),
    height: 24,
    paddingHorizontal: 5,
    marginVertical: 12,
    position: 'relative',
  },
  Line: {
    width: RW(90),
    height: 2,
    backgroundColor: '#007BFF',
  },
  text: {
    position: 'absolute',
    color: 'black',
    backgroundColor: '#FBF7F1',
    fontSize: 20,
    fontWeight: 500,
    paddingHorizontal: 7,
    paddingBottom: 2,
  },
  lastChild: {
    ..._styles.centerElements,
    height: RH(18),
  },
  data: {
    gap: 4,
  },
});
