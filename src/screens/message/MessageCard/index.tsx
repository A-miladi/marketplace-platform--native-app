import {Text, TouchableOpacity, View} from 'react-native';
import {MessageCardStyle} from './style';
import {Chat} from '@/types/chat';
import {FC} from 'react';
import FastImage from 'react-native-fast-image';
import ProfileIcon from '@/assets/Icons/profile.svg';
import VerticalDot from '@/assets/Icons/verticalDot.svg';
import {truncateText} from '@/utils/truncate';

interface IMessageCardProps {
  chat: Chat;
  isSelected: boolean;
  refetchChatList: () => void;
  onClick: () => void;
  setSelectedChatId: (id: string | null) => void;
}
export const MessageCard: FC<IMessageCardProps> = ({
  chat,
  isSelected,
  refetchChatList,
  onClick,
  setSelectedChatId,
}) => {
  const lastMessage = chat?.messages[chat?.messages?.length - 1];
  return (
    <TouchableOpacity onPress={onClick} style={MessageCardStyle.container}>
      <View style={MessageCardStyle.avatar}>
        {chat?.user?.avatar.length ? (
          <FastImage
            style={{width: 54, height: 54, borderRadius: 50}}
            source={{
              uri: chat.user.avatar?.startsWith('http')
                ? chat.user.avatar
                : `https://${chat.user.avatar}`,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        ) : (
          <ProfileIcon width={25} height={25} />
        )}
      </View>
      <View style={MessageCardStyle.info}>
        <View style={MessageCardStyle.child}>
          <Text style={MessageCardStyle.name}>
            {chat?.user.full_name ?? 'Full Name'}
          </Text>
          <TouchableOpacity style={{paddingLeft: 15}}>
            <VerticalDot />
          </TouchableOpacity>
        </View>
        <View style={MessageCardStyle.child}>
          <Text style={MessageCardStyle.messageInfo}>
            {truncateText(lastMessage?.text, 45) || 'No messages yet'}
          </Text>
          <Text style={MessageCardStyle.messageInfo}>
            {new Date(
              lastMessage?.created_at || chat?.created_at,
            ).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
