import {colors} from '@/styles/colors';
import {RFS, RH} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const TextAreaStyle = StyleSheet.create({
  textArea: {
    height: RH(18),
    borderColor: colors.neutral[400],
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: RFS(1.4),
  },
  label: {
    paddingBottom: 10,
    paddingLeft: 1,
    color: colors.neutral[950],
  },
  error: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 20,
    left: 8,
    color: 'red',
    paddingHorizontal: 4,
    fontSize: 12,
  },
});
