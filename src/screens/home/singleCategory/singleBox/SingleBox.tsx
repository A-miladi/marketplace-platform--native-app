import ArrowRight from '@/assets/Icons/ArrowRight.svg';
import CustomBtn from '@/screens/components/common/button/Button';
import {colors} from '@/styles/colors';
import {addCommas} from '@/utils/AddComma';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BookMark} from './Bookmark';
import {SingleBoxStyle} from './SingleBoxStyle';
import {truncateText} from '@/utils/truncate';

interface ISingleBoxProps {
  image?: string;
  title?: string;
  description?: string;
  price: number;
  category?: string;
  id: number;
  onClick?: () => void;

  is_bookmarked?: boolean;
  date?: string;
}

export const SingleBox: FC<ISingleBoxProps> = ({
  image,
  title,
  onClick,
  description,
  price,
  category,

  id,
  date,
  is_bookmarked = false,
}) => {
  const {t} = useTranslation('ButtonText');

  return (
    <View style={SingleBoxStyle.container}>
      <View style={SingleBoxStyle.firstChild}>
        {image ? (
          <FastImage
            style={SingleBoxStyle.Image}
            source={{
              uri: image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Text>No image provided</Text>
        )}
        <Text style={SingleBoxStyle.highLight}>{category ?? 'Category'}</Text>
      </View>
      <View style={SingleBoxStyle.lastChild}>
        <View style={SingleBoxStyle.lastChildBox}>
          <View style={SingleBoxStyle.title}>
            <Text style={SingleBoxStyle.titleText}>
              {title ?? 'Name of machines'}
            </Text>
            <BookMark is_bookmarked={is_bookmarked} id={id} />
          </View>
          <Text style={[SingleBoxStyle.brand, {height: '50%'}]}>
            {truncateText(description || '', 120)}
          </Text>
          <Text style={SingleBoxStyle.brand}>
            {new Date(date || '').toLocaleDateString('en-US')}
          </Text>
        </View>

        <View style={SingleBoxStyle.priceBox}>
          <Text style={{width: '65%', fontSize: 13}}>${addCommas(price)}</Text>
          {onClick && (
            <CustomBtn
              backColor="white"
              titleColor={colors.neutral[950]}
              borderColor={colors.primary[800]}
              width={16}
              height={3}
              title={t('View')}
              radius={6}
              onClick={onClick}
              icon={<ArrowRight width={16} height={16} />}
              withSpace
            />
          )}
        </View>
      </View>
    </View>
  );
};
