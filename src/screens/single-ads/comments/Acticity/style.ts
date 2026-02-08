import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const ActivityStyle = StyleSheet.create({
  container: {
    width: RW(90),
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
    ..._styles.rowCenterLeft,
    gap: 25,
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomColor: colors.primary[800],
    borderBottomWidth: 1.4,
  },
  text: {
    fontSize: RFS(1.6),
  },
  activeText: {
    color: colors.primary[800],
  },
});
