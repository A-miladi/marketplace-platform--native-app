import {_styles} from '@/styles/_styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: '100%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    opacity: 0.7,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    opacity: 1,
    width: 25,
  },
  TopBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 35,
    paddingHorizontal: 10,
    ..._styles.rowCenterSpace,
  },
  topBarBox: {
    ..._styles.rowCenter,
    gap: 8,
  },
  BoxLine: {
    height: 18,
    width: 2,
    backgroundColor: '#fff',
  },
  saveButton: {
    paddingHorizontal: 6,
  },
  Shadow: {
    width: '100%',
    height: 35,
    backgroundColor: '#052240',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
  },
});
