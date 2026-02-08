import {_styles} from '@/styles/_styles';
import {RFS, RH, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const SignInFormStyle = StyleSheet.create({
  container: {
    ..._styles.centerElements,
    flex: 1,
    gap: 20,
    backgroundColor: 'white',
  },
  text: {
    fontSize: RFS(2.4),
    marginBottom: 12,
  },
  child: {
    width: RW(90),
    gap: 40,
  },
  title: {
    fontSize: RFS(2.5),
    fontWeight: 500,
  },
  input: {
    width: RW(90),
    height: RH(4.5),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888888',
    paddingHorizontal: 10,
  },
  passwordChild: {
    width: RW(90),
    gap: 15,
    marginBottom: 12,
  },
  ForgetText: {
    fontSize: RFS(1.5),
    color: '#6D6D6D',
  },
});
