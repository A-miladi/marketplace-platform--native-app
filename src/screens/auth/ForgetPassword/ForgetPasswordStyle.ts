import {_styles} from '@/styles/_styles';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ForgetPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
    ..._styles.centerElements,
    backgroundColor: 'white',
    gap: 35,
  },
  Child: {
    width: RW(90),
    gap: 30,
  },
  title: {
    fontSize: RFS(2.5),
    marginBottom: 5,
  },
  text: {
    fontSize: RFS(1.5),
    color: '#6D6D6D',
  },
});
