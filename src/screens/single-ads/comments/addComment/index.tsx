import MessageIcon from '@/assets/Icons/message.svg';
import {Text, View} from 'react-native';
import {AddCommentStyle} from './style';
import CustomBtn from '@/screens/components/common/button/Button';

export function AddComment({onClick}: {onClick: () => void}) {
  return (
    <View style={AddCommentStyle.container}>
      <View style={AddCommentStyle.child}>
        <MessageIcon />
        <Text style={AddCommentStyle.title}>
          Write your comments about thisAdvertisement
        </Text>
      </View>
      <CustomBtn
        width={80}
        title="Add a comment +"
        titleBold={true}
        radius={8}
        direction="rtl"
        borderWidth={2}
        onClick={onClick}
      />
    </View>
  );
}
