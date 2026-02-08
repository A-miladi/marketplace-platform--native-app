import {FC} from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BoxStyle} from './boxStyle';
import Image from '@/assets/images/CatImg.svg';

interface IBoxProps {
  title?: string;
}
export const Box: FC<IBoxProps> = ({title}) => {
  return (
    <View style={BoxStyle.container}>
      <View style={BoxStyle.image}>
        <Image />
      </View>

      {/* <FastImage
        style={BoxStyle.image}
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/cb55/391b/97fae2c7f4dcd27853ad30f99fd92214?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SSIaBDDIuG5J17DYkKE1l-cTJz726E0-U8PG2bS3IChGs16N01L59UUJX6iz9jAjV2cUkvse6JXMjWc8-11iSSeuUdnfvKOaqPKCammertmHMXCo6Bu~iPI5u4u7~olvkmeilwNRpRRdVOImSi1e4x9t6h1wWVAsaeVa6aw5ZPX-KVRM~PSF1I~1tkJD23voCak9qwIIk85~ST53sJJZGXXy85B5CTUcMHs2f~pR00p9kcaaFbuXZMPZMhgHAmkLUv6rVXyAbgwJ49JFAMOdgwafKPWeYIzXabhWs9v7NBNnNtMMrKcGWU3GdrqEfmE~KwoWwCC~Xq~DxuGGglyRXw__',
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      /> */}

      <View style={BoxStyle.titleBox}>
        <Text style={BoxStyle.title}>{title}</Text>
      </View>
      {/* <View style={BoxStyle.gradient} /> */}
      <View style={BoxStyle.drop} />
    </View>
  );
};
