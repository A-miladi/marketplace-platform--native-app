import {Text, View} from 'react-native';
import {MessageStyle} from './MessageStyle';
import {MessageCard} from './MessageCard';
import {useFetch} from '@/hooks';
import {ResponseType} from '@/types';
import {Chat} from '@/types/chat';
import {API_URL} from '@/constants/api';
import {useChatStore} from '@/store/useChatStore';
import {useEffect, useState, useCallback} from 'react';
import {MessageList} from './MessageList';
import {useFocusEffect} from '@react-navigation/native';
import {Messages} from './Messages';

export default function Message() {
  const {tempSellerInfo, setCurrentChatId, clearTempMessages} = useChatStore();
  const sellerId = tempSellerInfo?.id;
  console.log(sellerId);
  const {
    data: chatList,
    loading,
    refetch: refetchChatList,
  } = useFetch<ResponseType<Chat[]>>(API_URL.User.Chat.chat);
  console.log(chatList);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      refetchChatList();
      const intervalId = setInterval(() => {
        if (!selectedChatId) {
          refetchChatList();
        }
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }, [refetchChatList, selectedChatId]),
  );

  useEffect(() => {
    if (sellerId && chatList?.data) {
      const existingChat = chatList.data.find(
        chat => chat.user.id === Number(sellerId),
      );
      if (existingChat) {
        setSelectedChatId(existingChat.id);
        setCurrentChatId(existingChat.id);
      } else {
        setSelectedChatId('new');
        setCurrentChatId('new');
      }
    }

    return () => {
      clearTempMessages();
      setCurrentChatId(null);
    };
  }, [sellerId, chatList?.data, setCurrentChatId, clearTempMessages]);

  return (
    <View style={MessageStyle.container}>
      <Text style={MessageStyle.title}>Message</Text>

      <MessageList
        refetchChatList={refetchChatList}
        chatList={chatList?.data || []}
        loading={loading}
        onSelectChat={setSelectedChatId}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
      />
    </View>
  );
}
