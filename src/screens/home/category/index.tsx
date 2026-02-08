import {Title} from '@/screens/components/common/title';
import {FlashList} from '@shopify/flash-list';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Box} from './box';
import {CategoryStyle} from './categoryStyle';
import {DATA} from '../Data';

export const Category = () => {
  const {t} = useTranslation('Header');
  return (
    <View style={CategoryStyle.container}>
      {/* <SpinnerLoading visible={loading} /> */}
      <View style={CategoryStyle.HalfColor} />
      <Title left={1} text={t('Category')} backgroundColor="#FBF7F1" />
      <View style={CategoryStyle.lastChild}>
        <FlashList
          style={CategoryStyle.data}
          data={DATA}
          estimatedItemSize={10}
          pagingEnabled
          renderItem={({item}) => <Box title={item.title} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // ListEmptyComponent={
          //   !loading ? (
          //     <View
          //       style={{
          //         ..._styles.centerElements,
          //       }}>
          //       <Text>No category found</Text>
          //     </View>
          //   ) : null
          // }
        />
      </View>
    </View>
  );
};
