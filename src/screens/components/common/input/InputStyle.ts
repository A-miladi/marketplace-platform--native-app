import {_styles} from '@/styles/_styles';
import {RFS} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const InputStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    ..._styles.rowCenterSpace,
    paddingHorizontal: 10,
  },
  input: {
    position: 'relative',
    width: '90%',
    height: '100%',
  },
  helperText: {
    position: 'absolute',
    top: '-16%',
    left: 10,
    paddingHorizontal: 2,
    backgroundColor: 'white',
    color: 'red',
    fontSize: RFS(1.3),
    paddingLeft: 2,
  },
});
