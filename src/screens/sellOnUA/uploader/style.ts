import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const UploaderStyle = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
    gap: 5,
    paddingBottom: 10,
  },
  uploader: {
    ..._styles.rowCenterLeft,
    width: '100%',
    gap: 20,
  },
  uploaderButton: {
    borderWidth: 1.8,
    borderStyle: 'dashed',
    borderColor: colors.primary[700],
    padding: 20,
    borderRadius: 8,
  },
  textBox: {
    gap: 8,
  },
  title: {
    fontSize: RFS(2),
    fontWeight: 500,
    paddingLeft: 2,
  },
  description: {
    fontWeight: 400,
    fontSize: RFS(1.5),
    color: colors.neutral[500],
  },
  listContainer: {
    paddingVertical: 10,
    borderBottomColor: colors.neutral[100],
    borderBottomWidth: 1,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary[800],
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
