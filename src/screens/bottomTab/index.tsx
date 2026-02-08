import {colors} from '@/styles/colors';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useEffect, useState} from 'react';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import {BottomStyle} from './style';

interface IPressType {
  isFocused: boolean;
  route: any;
}
export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const focusedOptions: any =
    descriptors[state.routes[state.index].key].options;

  useEffect(() => {
    if (!Platform.OS) {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        },
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }
  }, []);
  const onItemPressed = ({route, isFocused}: IPressType) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      if (false) {
      } else {
        navigation.navigate(route.name);
      }
    }
  };

  if (focusedOptions?.tabBarVisible === false) {
    return null;
  }

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={BottomStyle.container}>
      {state?.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //     ? options.title
        //     : route.name;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon({
                focused: isFocused,
                color: colors.primary[600],
                size: 10,
              })
            : null;

        return (
          <TouchableOpacity
            key={index}
            onPress={onItemPressed.bind(null, {route, isFocused})}
            style={BottomStyle.itemStyle}
            activeOpacity={1}>
            {icon}
            <View style={BottomStyle.textContainer}>
              <Text style={BottomStyle.text}>label</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
