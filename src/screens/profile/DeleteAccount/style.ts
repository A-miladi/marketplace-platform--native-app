import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const DeleteAccountStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 18,
    paddingBottom: 20,
  },
  title: {
    width: RW(90),
    paddingTop: 5,
    marginVertical: 10,
    paddingBottom: 4,
    borderBlockColor: colors.neutral[100],
    borderBottomWidth: 2,
    fontSize: RFS(1.8),
  },

  text: {
    width: RW(90),
    fontSize: RFS(1.7),
  },
  description: {
    width: RW(88),
    textAlign: 'left',
    fontSize: RFS(1.4),
    color: colors.neutral[600],
  },
  AlertBox: {
    ..._styles.rowTopLeft,
    gap: 8,
    width: RW(90),
  },
  dot: {
    marginTop: 3,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: colors.primary[800],
  },
});
