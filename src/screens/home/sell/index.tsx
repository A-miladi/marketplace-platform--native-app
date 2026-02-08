import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SCStyle} from '../singleCategory/SCStyle';
import CustomBtn from '@/screens/components/common/button/Button';
import {SellStyle} from './sellStyle';
import {useTranslation} from 'react-i18next';
import Poster from '@/assets/images/SellonUaImg.svg';

export const SellYours = () => {
  const {t} = useTranslation('Explore');
  return (
    <View style={SellStyle.container}>
      <View style={SellStyle.empty}>
        <View style={SellStyle.image}>
          <Poster />
        </View>
        {/* <FastImage
          style={SellStyle.image}
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/27bf/cf6f/8796aa3dd03c3c5ba683f7e95aa40cbf?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Iq6BJNG4c17bfWbBY7KBtV7eMqcvixBSaCPL964AJE-lptANohWdbK1q1f7XeTjZBXd8uggheUibqiqtOIf-VeynGvwXuB-LMtghnnreYJYKD0IGaMzH5uk-YnEWTcMyw~h2jFuLOlBuSqitfe-jU7HIs8FPnylV5OiTgFFa~neB~oOkR-ysGsD~9IYoi~w4e5QY4~R5J5lhxKRCtLDyHxywmYk7HEbh1zuuEqL~2Fb6QuktxncIxSbdQYounUY71M~dHFT2nO5Qf4WyxeydI3~8jvFPiqx7pPBO2m9SmR3dvuChvnPbLsLd06Mt5JChuo2R~atXVP8yepPI8zd5GA__',
          }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
      </View>
      <View style={SellStyle.child}>
        <View style={SellStyle.title}>
          <Text style={SellStyle.firstTitle}>{t('Sell')}</Text>
          <Text style={SellStyle.secondTitle}>{t('Fast')}</Text>
        </View>
        <Text style={SellStyle.paragraph}>
          Lorem Ipsum is simply dumy text of the printing and typesetting
          industry.Lorem Ipsum has been the indus
        </Text>
        <View style={SCStyle.moreBtn}>
          <CustomBtn
            width={25}
            height={3.5}
            title={t('Explore')}
            radius={6}
            onClick={() => console.log('')}
          />
        </View>
      </View>
    </View>
  );
};
