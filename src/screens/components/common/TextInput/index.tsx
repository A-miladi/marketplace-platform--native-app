import {RH, RW} from '@/utils/DimensionsChange';
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {InputStyle} from '../input/InputStyle';
import {CSSProperties, FC, useState} from 'react';
import {OTPTimer} from '../OTPTimer';
import {object} from 'yup';
import {colors} from '@/styles/colors';

interface ITextInputProps {
  icon?: React.ReactNode;
  placeholder?: string;
  placeholderColor?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  width?: number;
  height?: number;
  error?: boolean;
  helperText?: string;
  showOTPTimer?: boolean;
  onResendOTP?: () => void;
  keyboardType?: KeyboardTypeOptions;
  disable?: boolean | undefined;
  readonly?: boolean | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  label?: string;
  focusBorderColor?: string;
  onClick?: () => void;
  disabled?: boolean | undefined;
  loading?: boolean;
}

export const CustomTextInput: FC<ITextInputProps> = ({
  icon,
  placeholder = 'Placeholder',
  placeholderColor = 'black',
  value,
  error,
  helperText,
  onChangeText,
  width = 90,
  height = 5,
  showOTPTimer = false,
  onResendOTP,
  defaultValue,
  keyboardType,
  disable,
  readonly,
  onBlur,
  style,
  label,
  innerStyle,
  focusBorderColor = colors.primary[800],
  onClick,
  disabled,
  loading,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={[style, {width: RW(width), gap: 10}]}>
      {label && <Text style={{paddingLeft: 1}}>{label}</Text>}
      <View
        style={[
          innerStyle,
          InputStyle.container,
          {height: RH(height)},
          error
            ? {borderColor: 'red'}
            : isFocused
            ? {borderColor: focusBorderColor}
            : {borderColor: '#888888'},
        ]}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={readonly}
          style={InputStyle.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          editable={!disable}
        />
        {helperText && <Text style={InputStyle.helperText}>{helperText}</Text>}
        {icon && (
          <TouchableOpacity disabled={disabled} onPress={onClick}>
            {loading ? <ActivityIndicator color={colors.primary[800]} /> : icon}
          </TouchableOpacity>
        )}
      </View>

      {showOTPTimer && <OTPTimer duration={60} onResend={onResendOTP} />}
    </View>
  );
};
