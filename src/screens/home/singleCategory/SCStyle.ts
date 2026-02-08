import {_styles} from '@/styles/_styles';
import {RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SCStyle = StyleSheet.create({
  container: {
    width: RW(100),
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  lastChild: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
  },
  moreBtn: {
    ..._styles.centerElements,
    height: RH(5),
  },
});
