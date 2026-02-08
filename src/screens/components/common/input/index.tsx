import React, {useState} from 'react';
import {FC} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {InputStyle} from './InputStyle';
import {RH, RW} from '@/utils/DimensionsChange';

interface IInputProps {
  icon?: React.ReactNode;
  icon2?: React.ReactNode;
  placeholder?: string;
  placeholderColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  width?: number;
  height?: number;
  error?: boolean;
  helperText?: string;
  initialSecureTextEntry?: boolean;
}

export const Input: FC<IInputProps> = ({
  icon,
  icon2,
  placeholder = 'Placeholder',
  placeholderColor = 'black',
  value,
  error,
  helperText,
  onChangeText,
  secureTextEntry: initialSecureTextEntry = false,
  width = RW(90),
  height = RH(5),
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    initialSecureTextEntry,
  );

  return (
    <View style={{width: RW(width), gap: 2}}>
      <View
        style={[
          InputStyle.container,
          {height},
          error ? {borderColor: 'red'} : {borderColor: '#888888'},
        ]}>
        <TextInput
          style={InputStyle.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {secureTextEntry === false ? (
          <TouchableOpacity onPress={() => setSecureTextEntry(true)}>
            {icon2}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setSecureTextEntry(false)}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
      {helperText && <Text style={InputStyle.helperText}>{helperText}</Text>}
    </View>
  );
};
