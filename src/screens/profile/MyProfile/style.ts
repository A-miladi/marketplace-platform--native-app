import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const MyProfileStyle = StyleSheet.create({
  FileUploader: {
    borderWidth: 2,
    borderRadius: 50,
    width: 64,
    height: 64,
    ..._styles.centerElements,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    gap: 20,
  },
  RowChild: {
    gap: 10,
    ..._styles.rowCenter,
  },
  verify: {
    ..._styles.rowCenterLeft,
    width: RW(90),
    gap: 2,
  },
  verifyText: {
    fontSize: RFS(1.4),
    fontWeight: 'normal',
  },
  ProfileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
});
