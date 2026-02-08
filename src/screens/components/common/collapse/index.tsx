import ArrowDown from '@/assets/Icons/ArrowDown.svg';
import ArrowUp from '@/assets/Icons/ArrowUp.svg';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CollapseStyle} from './collapseStyle';
interface ICollapseProps {
  isOpen?: boolean;
  toggleCollapse?: () => void;
  hasBorder?: boolean;
  title?: string;
  children: React.ReactNode;
}
export const Collapse: FC<ICollapseProps> = ({
  isOpen,
  toggleCollapse,
  hasBorder = false,
  title,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={toggleCollapse}
      style={hasBorder ? [CollapseStyle.hasBorder] : [CollapseStyle.container]}>
      <View style={CollapseStyle.main}>
        <Text style={CollapseStyle.text}>{title}</Text>
        {!isOpen ? (
          <ArrowDown width={20} height={20} />
        ) : (
          <ArrowUp width={20} height={20} />
        )}
      </View>
      {isOpen && children}
    </TouchableOpacity>
  );
};
