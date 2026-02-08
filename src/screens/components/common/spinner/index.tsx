/* eslint @typescript-eslint/prefer-nullish-coalescing: 0 */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {SpinnerStyle} from './SpinnerStyle';
import {colors} from '@/styles/colors';

// import styles from './SpinnerLoadingStyles';

export interface SpinnerPropTypes {
  cancelable?: boolean;
  color?: string;
  animation?: 'none' | 'slide' | 'fade';
  overlayColor?: string;
  size?: 'small' | 'large' | number; // size props does not support value normal
  textContent?: string;
  textStyle?: TextStyle;
  visible?: boolean;
  indicatorStyle?: ViewStyle;
  customIndicator?: React.ReactNode;
  children?: React.ReactNode;
  spinnerKey?: string;
}

const SpinnerLoading = ({
  cancelable = false,
  color = colors.primary[800],
  animation = 'none',
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  size = 'large',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
}: SpinnerPropTypes) => {
  const [spinnerVisible, setSpinnerVisibility] = useState(visible);
  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  useEffect(() => {
    setSpinnerVisibility(visible);
  }, [visible]);
  const _renderDefaultContent = () => {
    return (
      <View style={[SpinnerStyle.background]}>
        {customIndicator || (
          <ActivityIndicator
            color={color}
            size={size}
            style={[SpinnerStyle.activityIndicator, {...indicatorStyle}]}
          />
        )}
        <View style={[SpinnerStyle.textContainer, {...indicatorStyle}]}>
          <Text style={[SpinnerStyle.textContent, textStyle]}>
            {textContent}
          </Text>
        </View>
      </View>
    );
  };

  const _renderSpinner = () => {
    const spinner = (
      <View
        style={[SpinnerStyle.container, {backgroundColor: overlayColor}]}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose();
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    );
  };

  return _renderSpinner();
};

export default SpinnerLoading;
