import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const TitleStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 24,
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  Line: {
    width: '100%',
    height: 2,
    backgroundColor: '#007BFF',
  },
  textContainer: {
    position: 'absolute',
    paddingHorizontal: 5,
    paddingBottom: 2,
    ..._styles.rowCenter,
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color: 'black',
  },
  secondText: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.primary[800],
  },
});
