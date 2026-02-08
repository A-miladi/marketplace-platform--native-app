import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {Text, View} from 'react-native';
import NoImage from '@/assets/Icons/noImage.svg';

export const EmptyGallery = () => {
  return (
    <View style={{paddingHorizontal: 25, marginVertical: 15}}>
      <View
        style={{
          ..._styles.centerElements,
          paddingVertical: 30,
          padding: 10,
          gap: 6,
          backgroundColor: colors.primary[50],
          borderRadius: 8,
        }}>
        <NoImage />
        <Text style={{}}>This Advertisement has no image</Text>
      </View>
    </View>
  );
};
