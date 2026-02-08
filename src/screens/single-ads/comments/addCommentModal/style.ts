import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const CommentModalStyle = StyleSheet.create({
  container: {
    width: RW(100),
    height: '100%',
    position: 'absolute',
    ..._styles.centerElements,
    backgroundColor: 'rgba(1,1,1,0.4)',
  },
  child: {
    width: RW(90),
    paddingHorizontal: 15,
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    gap: 6,
    paddingBottom: 15,
  },
  title: {
    ..._styles.rowCenterSpace,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    paddingVertical: 10,
    width: '100%',
  },
  text: {
    fontSize: RFS(1.3),
    color: colors.neutral[900],
    fontWeight: 'normal',
  },
  emoji: {
    ..._styles.centerElements,
    gap: 4,
    borderWidth: 2,
    borderColor: colors.neutral[100],
    borderRadius: 8,
    width: '19%',
    paddingVertical: 4,
    position: 'relative',
  },
  activeEmoji: {
    borderColor: colors.primary[800],
    backgroundColor: colors.primary[50],
  },
  tick: {
    backgroundColor: colors.primary[800],
    width: 20,
    height: 20,
    ..._styles.centerElements,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: '95%',
    left: '80%',
  },
});
