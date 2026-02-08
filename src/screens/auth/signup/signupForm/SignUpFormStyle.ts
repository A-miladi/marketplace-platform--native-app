import {_styles} from '@/styles/_styles';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SignUpFormStyle = StyleSheet.create({
  container: {
    ..._styles.centerElements,
    flex: 1,
    gap: 30,
    backgroundColor: 'white',
    height: RH(100),
  },
  child: {
    width: RW(90),
    gap: 35,
  },
  title: {
    fontSize: RFS(2.5),
  },
  firstInput: {
    width: RW(90),
    ..._styles.rowCenterSpace,
  },
});
