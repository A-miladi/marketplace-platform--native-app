import {colors} from '@/styles/colors';
import {RH} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const AboutStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },

  text: {
    textAlign: 'justify',
    color: colors.neutral[600],
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 20,
  },
});
