import {_styles} from '@/styles/_styles';
import {StyleSheet} from 'react-native';

export const BoxStyle = StyleSheet.create({
  container: {
    ..._styles.centerElements,
    width: 131,
    height: 121,
    position: 'relative',
    marginHorizontal: 4,
  },
  drop: {
    width: '100%',
    height: '45%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#007BFF',
  },
  titleBox: {
    color: 'white',
    fontSize: 12,
    fontWeight: 500,
    position: 'absolute',
    zIndex: 3,
    bottom: 0,
    ..._styles.centerElements,
    height: '43%',
    width: '92%',
  },
  title: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'medium',
    textAlign: 'center',
  },

  image: {
    ..._styles.centerElements,
    width: '94%',
    height: '90%',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 6,
    bottom: 4,
    overflow: 'hidden',
  },
  // gradient: {
  //   width: '94%',
  //   height: '40%',
  //   backgroundColor: 'black',
  //   opacity: 0.4,
  //   bottom: 4,
  //   borderBottomLeftRadius: 6,
  //   borderBottomRightRadius: 6,
  //   position: 'absolute',
  //   zIndex: 2,
  // },
});
