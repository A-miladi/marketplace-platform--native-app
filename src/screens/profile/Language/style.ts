import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const LanguageStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 15,
  },
  text: {
    width: RW(90),
    fontSize: RFS(1.4),
    fontWeight: 'normal',
    paddingBottom: 25,
    color: colors.neutral[700],
  },
  SetLang: {
    width: RW(90),
    borderColor: colors.neutral[400],
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    gap: 14,
    marginBottom: 15,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.neutral[100],
  },
});
