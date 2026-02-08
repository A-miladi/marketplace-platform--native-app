//Custom button
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//types
import {_styles} from '@/styles/_styles';
import {colors} from '@/styles/colors';
import {RH, RW} from '@/utils/DimensionsChange';
import {ViewStyle} from 'react-native';
import SpinnerLoading from '../spinner';
import {ButtonStyle} from './ButtonStyle';

type CustomBtnType = {
  disableClick?: boolean;
  onClick?: () => void;
  width?: number;
  radius?: number;
  margin?: number[];
  titleColor?: string;
  title: string;
  backColor?: string;
  disableBackColor?: string;
  isLoading?: boolean;
  borderColor?: string;
  titleBold?: boolean;
  hasShadow?: boolean;
  btnStyle?: ViewStyle | undefined;
  height?: number;
  icon?: React.ReactNode;
  withSpace?: boolean;
  direction?: 'rtl' | 'ltr';
  borderWidth?: number;
};

const CustomBtn = ({
  disableClick = false,
  onClick,
  width = 100,
  margin = [0, 0, 0, 0],
  title,
  icon,
  radius,
  titleColor = colors.neutral[50],
  backColor = colors.primary[800],
  disableBackColor = colors.primary[400],
  isLoading = false,
  withSpace = false,
  borderColor,
  titleBold = true,
  hasShadow = true,
  height = 4.5,
  direction = 'ltr',
  borderWidth = 0.5,
}: CustomBtnType) => {
  return (
    <View>
      <TouchableOpacity
        disabled={disableClick}
        onPress={onClick}
        activeOpacity={0.5}
        style={[
          {
            ..._styles.rowCenter,
            height: RH(height),
            width: RW(width),
            backgroundColor: disableClick
              ? isLoading
                ? backColor
                : disableBackColor
              : backColor,
            marginTop: RH(margin[0]),
            marginBottom: RH(margin[2]),
            marginRight: RH(margin[1]),
            marginLeft: RH(margin[3]),
            borderColor: borderColor
              ? borderColor
              : disableClick
              ? isLoading
                ? backColor
                : disableBackColor
              : backColor,
            borderWidth,
            gap: 5,
            borderRadius: radius,
            justifyContent: withSpace ? 'space-around' : 'center',
            paddingLeft: withSpace ? 4 : 0,
            flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
          },
          Platform.OS === 'android' && {paddingBottom: 3},
          !hasShadow ? {..._styles.dropShadow} : undefined,
        ]}>
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              {color: titleColor},
              titleBold ? {...ButtonStyle.bold} : {...ButtonStyle.regular},
            ]}>
            {isLoading && <SpinnerLoading visible={isLoading} />}
            {title}
          </Text>
        )}
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default CustomBtn;
