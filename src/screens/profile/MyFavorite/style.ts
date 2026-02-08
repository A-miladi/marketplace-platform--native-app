import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const FavoriteStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  items: {
    paddingHorizontal: 25,
  },
  text: {
    width: RW(90),
    paddingVertical: 10,

    borderBlockColor: colors.neutral[100],
    borderBottomWidth: 1,
    fontSize: RFS(1.8),
  },
});
