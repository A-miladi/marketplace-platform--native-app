import CloseIcon from '@/assets/Icons/Close.svg';
import Tick from '@/assets/Icons/tick.svg';
import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TouchableOpacity, View} from 'react-native';
import {CommentModalStyle} from './style';
import CustomBtn from '@/screens/components/common/button/Button';
import {TextArea} from '@/screens/components/common/TextArea';
const rateByEmoji = [
  {
    title: 'Excellent',
    emoji: 0x1f60d,
    rate: 5,
  },
  {
    title: 'Good',
    emoji: 0x1f603,
    rate: 4,
  },
  {
    title: 'Average',
    emoji: 0x1f60a,
    rate: 3,
  },
  {
    title: 'Poor',
    emoji: 0x1f623,
    rate: 2,
  },
  {
    title: 'Terrible',
    emoji: 0x1f622,
    rate: 1,
  },
];
interface IAddCommentProps {
  onClose: () => void;
}
export const AddCommentModal: FC<IAddCommentProps> = ({onClose}) => {
  const [isActiveEmoji, setIsActiveEmoji] = useState<number>(3);
  const {t} = useTranslation('SellerProfile');
  return (
    <View style={CommentModalStyle.container}>
      <View style={CommentModalStyle.child}>
        <View style={CommentModalStyle.title}>
          <Text>{t('SellerAddCommaModal.title')}</Text>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <Text style={CommentModalStyle.text}>
          {t('SellerAddCommaModal.description')}
        </Text>
        <View
          style={{..._styles.rowCenterSpace, width: '100%', marginVertical: 6}}>
          {rateByEmoji
            .slice()
            .reverse()
            .map((i, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setIsActiveEmoji(i.rate)}
                style={[
                  CommentModalStyle.emoji,
                  isActiveEmoji === i.rate && CommentModalStyle.activeEmoji,
                ]}>
                <Text style={{fontSize: RFS(4)}}>
                  {String.fromCodePoint(i.emoji)}
                </Text>
                <Text style={{fontSize: RFS(1.4), color: colors.neutral[800]}}>
                  {i.title}
                </Text>
                {isActiveEmoji === i.rate && (
                  <View style={CommentModalStyle.tick}>
                    <Tick width={12} height={12} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
        </View>
        <View style={{gap: 10, marginVertical: 10}}>
          <Text style={{width: RW(80)}}>
            Write your review about the seller
          </Text>
          <TextArea placeholder="Description" width={83} Radius={8} />
        </View>

        <CustomBtn
          width={84}
          title={t('SellerAddCommaModal.SubmitButton')}
          titleBold={true}
          radius={8}
          direction="rtl"
          borderWidth={2}
          onClick={() => {}}
        />
      </View>
    </View>
  );
};
