import {Title} from '@/screens/components/common/title';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AboutStyle} from './aboutStyle';
import {SCStyle} from '../singleCategory/SCStyle';
import CustomBtn from '@/screens/components/common/button/Button';
import {useTranslation} from 'react-i18next';
import Poster from '@/assets/images/aboutUsImg.svg';
import {RW} from '@/utils/DimensionsChange';

export const AboutUs = () => {
  const {t} = useTranslation('AboutUs');
  return (
    <View style={AboutStyle.container}>
      <Title
        left={1}
        text={t('About')}
        secondText={t('Us')}
        backgroundColor="#ffffff"
      />
      <Poster />
      <Text style={AboutStyle.text}>
        Lorem Ipsum is simply dumy text of the printing and typesetting
        industry.Lorem Ipsum has been the indus standard dummy text ever since
        the 1500s , when an unknown printer took a galley of type and scrambled
        typesetting industry.Lorem Ipsum has been the indus standard dummy text
        ever since the 1500s , when an unknown printer took a galley of type and
        scrambled
      </Text>
      <Text style={AboutStyle.text}>
        Lorem Ipsum is simply dumy text of the printing and typesetting
        industry.Lorem Ipsum has been the indus standard dummy text ever since
        the 1500s , when an
      </Text>
      <View style={SCStyle.moreBtn}>
        <CustomBtn
          width={25}
          height={3.5}
          title={t('LearnMore')}
          radius={6}
          onClick={() => console.log('')}
        />
      </View>
    </View>
  );
};
