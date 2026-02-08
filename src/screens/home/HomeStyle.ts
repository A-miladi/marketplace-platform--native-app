import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingBottom: 12,
  },
  scrollView: {
    paddingTop: 10,
  },
  Chips: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    gap: 2,
    ..._styles.rowCenterLeft,
  },
  Title: {
    paddingHorizontal: 25,
    paddingTop: 5,
    gap: 12,
  },
  title1: {
    fontSize: 20,
    fontWeight: 500,
  },
  title2: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.neutral[500],
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: 10,
  },
  propertiesBox: {
    ..._styles.rowCenterSpace,
    height: 40,
    backgroundColor: colors.neutral[50],
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  propertiesBoxText: {
    fontSize: 12,
    fontWeight: '500',
    maxWidth: '65%',
  },
  description: {
    paddingHorizontal: 25,
    marginTop: 8,
    marginBottom: 12,
  },
  descriptionBox: {
    backgroundColor: colors.neutral[50],
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 15,
    borderRadius: 4,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 400,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.neutral[600],
  },
});
