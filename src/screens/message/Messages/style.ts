import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RFS, RW} from '@/utils/DimensionsChange';
import {StyleSheet} from 'react-native';

export const MessageTextStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: RW(90),
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
  },
  userInfo: {
    ..._styles.rowCenterLeft,
    gap: 8,
  },
  avatar: {
    width: 39,
    height: 39,
    borderRadius: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userText: {
    height: 36,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: RFS(1.6),
    fontWeight: '500',
    color: colors.neutral[800],
  },
  date: {
    fontSize: 12,
    color: colors.neutral[300],
  },
  messagesContainer: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
  },
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#1D4ED8',
    borderBottomRightRadius: 0,
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 0,
  },
  senderText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  receiverText: {
    color: '#111827',
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
  senderTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  receiverTime: {
    color: '#9CA3AF',
  },
  inputContainer: {
    marginTop: 16,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },

  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});
