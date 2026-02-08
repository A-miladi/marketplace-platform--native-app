import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ModalStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(1,1,1,0.3)',
    width: RW(100),
    height: RH(100),
    zIndex: 1000,
    alignItems: 'center',
    paddingTop: RH(25),
    top: 0,
    left: 0,
    flex: 1,
  },
  centerContainer: {
    paddingTop: 0,
    ..._styles.centerElements,
  },

  CloseButton: {
    position: 'absolute',
    padding: 5,
    top: 10,
    left: 15,
  },
  child: {
    width: RW(90),
    position: 'relative',
    paddingHorizontal: 21,
    paddingVertical: 15,
    backgroundColor: 'white',
    ..._styles.centerElements,
    borderRadius: 16,
  },
  title: {
    fontSize: RFS(1.8),
    color: colors.primary[800],
    width: '80%',
    textAlign: 'center',
  },
  description: {
    fontSize: RFS(1.5),
    color: colors.neutral[900],
    fontWeight: 'normal',
    paddingVertical: 10,
  },
  Children: {
    paddingTop: 15,
    paddingBottom: 25,
  },
});
