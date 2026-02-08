import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const MessageStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  title: {
    width: RW(90),
    fontSize: RFS(1.9),
    fontWeight: 500,
    paddingBottom: 15,
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
    marginBottom: 15,
    color: colors.neutral[800],
  },
});
