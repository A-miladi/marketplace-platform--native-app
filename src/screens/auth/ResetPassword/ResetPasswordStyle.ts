import {_styles} from '@/styles/_styles';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ResetPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
    ..._styles.centerElements,
    backgroundColor: 'white',
    gap: 40,
  },
  title: {
    width: RW(90),
    fontSize: RFS(2.5),
  },
  includes: {
    width: RW(90),
    gap: 20,
  },
  includesText: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: RH(1.3),
    paddingHorizontal: RW(2),
    backgroundColor: '#F6F6F6',
    color: '#6D6D6D',
    alignItems: 'center',
  },
});
