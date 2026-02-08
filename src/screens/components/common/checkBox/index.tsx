import {Text, TouchableOpacity, View} from 'react-native';
import Tick from '@/assets/Icons/tick.svg';
import {FC} from 'react';
import {CheckBoxStyle} from './style';
import {RW} from '@/utils/DimensionsChange';

interface ICheckBoxProps {
  title: string;
  boldText?: boolean;
  isChecked: boolean;
  onPress: () => void;
  gap?: number;
  width?: number;
}

export const CheckBox: FC<ICheckBoxProps> = ({
  title,
  boldText = false,
  isChecked,
  onPress,
  gap = 5,
  width = 90,
}) => {
  return (
    <View style={[CheckBoxStyle.container, {gap, width: RW(width)}]}>
      <TouchableOpacity
        style={CheckBoxStyle.checkboxContainer}
        onPress={onPress}>
        <View
          style={[
            CheckBoxStyle.checkboxBox,
            isChecked && CheckBoxStyle.checkboxChecked,
          ]}>
          {isChecked && <Tick />}
        </View>
        <Text
          style={
            !boldText ? CheckBoxStyle.checkboxText : CheckBoxStyle.boldText
          }>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
