import ProfileIcon from '@/assets/Icons/profile.svg';
import SendIcon from '@/assets/Icons/send.svg';
import {API_URL} from '@/constants/api';
import {useFetch, usePost} from '@/hooks';
import {CustomTextInput} from '@/screens/components/common/TextInput';
import {useChatStore} from '@/store/useChatStore';
import {useUserInfoStore} from '@/store/useUserInfo';
import {colors} from '@/styles/colors';
import {ResponseType, ResponseWithPaginationType} from '@/types';
import {Chat, NewMessageRequest} from '@/types/chat';
import {snackBar} from '@/utils/snackBar';
import {yupResolver} from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, ScrollView, Text, View} from 'react-native';
import * as yup from 'yup';
import {MessageTextStyle} from './style';

const messageSchema = yup.object().shape({
  message: yup
    .string()
    .required('Message is required')
    .min(1, 'Message cannot be empty')
    .max(350, 'Message is too long'),
});

type MessageFormData = {
  message: string;
};

interface MessageContentProps {
  chatId: string;
  sellerId?: string | null;
  refetchChatList: () => void;
  setSelectedChatId: (id: string | null) => void;
}

export const Messages = ({
  chatId,
  sellerId,
  refetchChatList,
  setSelectedChatId,
}: MessageContentProps) => {
  const {userInfo} = useUserInfoStore();
  const {tempMessages, addTempMessage, tempSellerInfo} = useChatStore();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm<MessageFormData>({
    resolver: yupResolver(messageSchema),
  });

  useEffect(() => {
    register('message');
  }, [register]);

  const {
    data: chats,
    loading,
    refetch: refetchChats,
  } = useFetch<ResponseWithPaginationType<Chat[]>>(
    `${API_URL.User.Chat.chat}/${chatId}`,
    {
      autoFetch: false,
    },
  );

  useEffect(() => {
    if (chatId && chatId !== 'new') {
      refetchChats();
    }
  }, [chatId, refetchChats]);

  useEffect(() => {
    if (chatId !== 'new') {
      const intervalId = setInterval(() => {
        refetchChats();
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [refetchChats, chatId]);

  const {execute: sendMessage, loading: sendMessageLoading} = usePost<
    ResponseType<object>,
    NewMessageRequest
  >(`${API_URL.User.Chat.chat}`, {
    onSuccess: () => {
      if (chatId === 'new') {
        refetchChatList();
      } else {
        refetchChats();
      }

      reset({
        message: '',
      });
    },
    onError: (error: string) => {
      snackBar(error, 'danger');
    },
  });

  const onSubmit = (data: MessageFormData) => {
    if (chatId === 'new' && sellerId) {
      const newMessage = {
        id: Date.now(),
        text: data.message,
        sender_id: userInfo.id,
        created_at: new Date().toISOString(),
        read_at: null,
      };
      addTempMessage(newMessage);
      reset({message: ''});

      sendMessage({
        text: data.message,
        chat_user_id: Number(sellerId),
      });
    } else {
      sendMessage({
        text: data.message,
        chat_user_id: chats?.data[0].user.id as number,
      });
    }
  };

  const messagesToDisplay =
    chatId === 'new' ? tempMessages : chats?.data[0]?.messages;
  const userToDisplay =
    chatId === 'new' ? tempSellerInfo : chats?.data[0]?.user;

  return (
    <View style={MessageTextStyle.container}>
      <View style={MessageTextStyle.header}>
        <View style={MessageTextStyle.userInfo}>
          {userToDisplay?.avatar ? (
            <Image
              source={{uri: userToDisplay.avatar as string}}
              style={MessageTextStyle.avatar}
            />
          ) : (
            <View style={MessageTextStyle.avatarPlaceholder}>
              <ProfileIcon width={16} height={16} />
            </View>
          )}
          <View style={MessageTextStyle.userText}>
            <Text style={MessageTextStyle.userName}>
              {userToDisplay?.full_name || 'New Chat'}
            </Text>
            <Text style={MessageTextStyle.date}>
              {chatId === 'new'
                ? dayjs().format('DD MMMM YYYY')
                : chats?.data[0]?.created_at &&
                  dayjs(chats?.data[0]?.created_at).format('DD MMMM YYYY')}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={MessageTextStyle.messagesContainer}>
        {messagesToDisplay?.map((item, idx) => {
          const isSenderMessage = item.sender_id === userInfo.id;
          return (
            <View
              key={idx}
              style={[
                MessageTextStyle.messageBubble,
                isSenderMessage
                  ? MessageTextStyle.senderBubble
                  : MessageTextStyle.receiverBubble,
              ]}>
              <View>
                <Text
                  style={
                    isSenderMessage
                      ? MessageTextStyle.senderText
                      : MessageTextStyle.receiverText
                  }>
                  {item.text}
                </Text>
                <Text
                  style={[
                    MessageTextStyle.time,
                    isSenderMessage
                      ? MessageTextStyle.senderTime
                      : MessageTextStyle.receiverTime,
                  ]}>
                  {new Date(item.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={MessageTextStyle.inputContainer}>
        <View style={MessageTextStyle.form}>
          <CustomTextInput
            placeholder="Write your message"
            placeholderColor={colors.neutral[400]}
            onChangeText={text => setValue('message', text)}
            height={6}
            width={90}
            icon={<SendIcon />}
            onClick={handleSubmit(onSubmit)}
            disabled={sendMessageLoading || loading}
            loading={sendMessageLoading || loading}
          />
        </View>
        {errors.message && (
          <Text style={MessageTextStyle.errorText}>
            {errors.message.message}
          </Text>
        )}
      </View>
    </View>
  );
};
