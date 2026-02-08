import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {UserTitleStyle} from './style';
import ProfileIcon from '@/assets/Icons/profile.svg';
import {FC} from 'react';
import {useUserInfoStore} from '@/store/useUserInfo';

interface IUserTitleProps {
  hasBorder?: boolean;
  comments?: string;
}
export const UserTitle: FC<IUserTitleProps> = ({
  hasBorder = false,
  comments,
}) => {
  const {userInfo} = useUserInfoStore();

  return (
    <View
      style={[
        UserTitleStyle.container,
        hasBorder === true && UserTitleStyle.hasBorder,
      ]}>
      <View style={UserTitleStyle.image}>
        {userInfo.profile?.avatar ? (
          <FastImage
            style={{width: '100%', height: '100%', borderRadius: 50}}
            source={{
              uri: userInfo?.profile?.avatar || '',
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <ProfileIcon width={25} height={25} />
        )}
      </View>
      <View style={UserTitleStyle.child}>
        <View style={UserTitleStyle.UserName}>
          <Text style={{color: colors.neutral[800]}}>
            {userInfo.profile?.full_name || 'Full name'}
          </Text>
          <View style={{..._styles.rowCenter, gap: 5}}>
            {comments && (
              <Text style={UserTitleStyle.comments}>{`(${comments})`}</Text>
            )}
            {userInfo.rate && (
              <div className="flex gap-2">
                <p className="text-sm font-medium md:text-base">
                  {userInfo.rate}
                </p>
                <Text style={{color: '#FFDD00'}}>★</Text>
              </div>
            )}
          </View>
        </View>
        <Text style={{color: colors.neutral[500], fontSize: 12}}>
          {userInfo.email || 'Email address'}
        </Text>
      </View>
    </View>
  );
};
