import EmptyMessage from '@/assets/Icons/EmptyMessage.svg';
import {Chat} from '@/types/chat';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {MessageCard} from '../MessageCard';
import {MessageListStyle} from './style';

type MessageStatus = 'UNREAD' | 'READ';

interface MessageSidebarProps {
  refetchChatList: () => void;
  chatList: Chat[];
  loading: boolean;
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
}
export function MessageList({
  refetchChatList,
  chatList,
  loading,
  onSelectChat,
  selectedChatId,
  setSelectedChatId,
}: MessageSidebarProps) {
  const [activeTab, setActiveTab] = useState<MessageStatus>('UNREAD');

  const filteredChats =
    chatList?.filter(chat => {
      const lastMessage = chat.messages[chat.messages.length - 1];
      if (activeTab === 'UNREAD') {
        return lastMessage?.read_at === null;
      } else {
        return lastMessage?.read_at !== null;
      }
    }) || [];

  const onChatClick = (id: string) => {
    onSelectChat(id);
  };
  return (
    <View>
      {filteredChats.length === 0 ? (
        <View style={MessageListStyle.EmptyMessage}>
          <EmptyMessage width={100} height={100} />
          <Text style={MessageListStyle.EmptyText}>
            There is no message to display
          </Text>
        </View>
      ) : (
        filteredChats.map(chat => (
          <MessageCard
            key={chat.id}
            chat={chat}
            isSelected={selectedChatId === chat.id}
            refetchChatList={refetchChatList}
            onClick={() => onChatClick(chat.id)}
            setSelectedChatId={setSelectedChatId}
          />
        ))
      )}
    </View>
  );
}
