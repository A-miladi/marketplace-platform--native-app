import Arrow from '@/assets/Icons/ArrowRight.svg';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SettingItemStyle} from './style';
interface ISettingItemsProps {
  icon: React.ReactNode;
  title: string;
  action: () => void;
}
export const SettingItems: FC<ISettingItemsProps> = ({icon, title, action}) => {
  return (
    <TouchableOpacity onPress={action} style={SettingItemStyle.container}>
      <View style={SettingItemStyle.child}>
        {icon}
        <Text style={SettingItemStyle.Title}>{title}</Text>
      </View>
      <Arrow />
    </TouchableOpacity>
  );
};
