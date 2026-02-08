import {_styles} from '@/styles/_styles';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SignInStyle = StyleSheet.create({
  container: {
    ..._styles.centerElements,
    flex: 1,
    gap: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  Title: {
    fontSize: RFS(3),
    width: RW(90),
    fontWeight: 'normal',
    marginBottom: 20,
  },
  lineStyle: {
    width: RW(90),
    position: 'relative',
    ..._styles.centerElements,
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#D1D1D1',
  },
  lineText: {
    backgroundColor: 'white',
    padding: 4,
    paddingRight: 6,
    paddingBottom: 6,
    textAlign: 'center',
    fontSize: RFS(2),
    color: '#6D6D6D',
    fontWeight: 400,
  },
  signup: {
    ..._styles.rowCenter,
    gap: 3,
    marginTop: 10,
  },
  signin: {
    ..._styles.rowCenter,
    gap: 3,
  },
  signupText: {
    fontSize: RFS(1.4),
    color: '#6D6D6D',
  },
  buttonText: {
    fontSize: RFS(1.4),
    color: '#6D6D6D',
    textDecorationLine: 'underline',
  },
  PrivacyPolicy: {
    fontSize: RFS(1.4),
    color: '#6D6D6D',
    textAlign: 'center',
    marginVertical: 20,
  },
});
