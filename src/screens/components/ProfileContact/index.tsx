import {Linking, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ContactStyle} from './style';
import {Rating} from '../common/rating';
import CustomBtn from '../common/button/Button';
import PhoneIcon from '@/assets/Icons/phone.svg';
import BPhoneIcon from '@/assets/Icons/BlackPhone.svg';
import MessageIcon from '@/assets/Icons/message.svg';
import WhiteMessage from '@/assets/Icons/WhiteMessage.svg';
import {colors} from '@/styles/colors';
import React, {FC, useState} from 'react';
import ProfileIcon from '@/assets/Icons/profile.svg';
import {_styles} from '@/styles/_styles';
import {navigate} from '@/navigation/navigationServices';
interface IProfileContact {
  name?: string;
  phoneNumber?: string;
  rate?: number;
  image?: string;
}
export const ProfileContact: FC<IProfileContact> = ({
  name,
  phoneNumber,
  rate,
  image,
}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const [showContact, setShowContact] = useState(false);
  return (
    <View style={ContactStyle.container}>
      <TouchableOpacity
        onPress={() => navigate('comments')}
        style={{..._styles.centerElements, gap: 10}}>
        <View style={ContactStyle.ProfileImage}>
          {image?.length ? (
            <FastImage
              style={{width: 65, height: 65, borderRadius: 50}}
              source={{
                uri: image?.startsWith('http') ? image : `https://${image}`,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          ) : (
            <ProfileIcon width={30} height={30} />
          )}
        </View>
        <Text style={ContactStyle.title}>{name}</Text>
        {rate && <Rating rating={rate || 0} />}
      </TouchableOpacity>

      <CustomBtn
        title="Contact us"
        icon={<PhoneIcon />}
        borderColor={colors.primary[800]}
        titleColor={colors.primary[800]}
        backColor="white"
        borderWidth={1}
        direction="rtl"
        width={80}
        height={4}
        radius={8}
        onClick={() => setShowContact(!showContact)}
      />
      {showContact && (
        <>
          <TouchableOpacity
            onPress={handleCall}
            style={ContactStyle.contactButton}>
            <BPhoneIcon />
            <Text style={ContactStyle.Text}>Phone call</Text>
            <Text style={ContactStyle.PhoneNumber}>{phoneNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMessage}
            style={ContactStyle.contactButton}>
            <MessageIcon />
            <Text style={ContactStyle.Text}>Send message</Text>
            <Text style={ContactStyle.PhoneNumber}>{phoneNumber}</Text>
          </TouchableOpacity>
        </>
      )}
      <CustomBtn
        title="Message"
        icon={<WhiteMessage />}
        borderColor={colors.primary[800]}
        borderWidth={1}
        direction="rtl"
        width={80}
        height={4}
        radius={8}
        onClick={() => console.log('')}
      />
    </View>
  );
};
