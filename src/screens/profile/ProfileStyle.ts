import {colors} from '@/styles/colors';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  logOut: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: RW(90),
    height: RH(6.5),
    gap: 6,
  },
  logOutText: {
    fontSize: RFS(1.8),
    fontWeight: 'normal',
    color: colors.neutral[700],
  },
});
