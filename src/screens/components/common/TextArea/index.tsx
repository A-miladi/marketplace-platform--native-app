import {FC, useState} from 'react';
import {StyleProp, Text, TextInput, View, ViewStyle} from 'react-native';
import {TextAreaStyle} from './style';
import {colors} from '@/styles/colors';
import {RW} from '@/utils/DimensionsChange';
interface ITextAreaProps {
  placeholder?: string;
  width?: number;
  Radius?: number;
  style?: StyleProp<ViewStyle>;
  label?: string;
  helperText?: string;
  value?: string;
  onChange?: (text: string) => void;
}
export const TextArea: FC<ITextAreaProps> = ({
  placeholder,
  width = 90,
  Radius = 16,
  style,
  label,
  helperText,
  value,
  onChange,
}) => {
  return (
    <View style={style}>
      {label && (
        <Text style={[TextAreaStyle.label, {width: RW(width)}]}>{label}</Text>
      )}
      <TextInput
        style={[
          TextAreaStyle.textArea,
          {width: RW(width), borderRadius: Radius},
          helperText && {borderColor: 'red'},
        ]}
        multiline={true}
        numberOfLines={10}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral[700]}
        value={value}
        onChangeText={onChange}
      />
      {helperText && <Text style={TextAreaStyle.error}>{helperText}</Text>}
    </View>
  );
};
