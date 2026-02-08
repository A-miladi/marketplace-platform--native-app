import AdvertisementIcon from '@/assets/Icons/Advertisement.svg';
import HomeIcon from '@/assets/Icons/home.svg';
import IconMessage from '@/assets/Icons/message.svg';
import SellIcon from '@/assets/Icons/note.svg';
import ProfileIcon from '@/assets/Icons/profile.svg';
import useToken from '@/hooks/common/useToken';
import {resetRoot} from '@/navigation/navigationServices';
import {useUserInfoStore} from '@/store/useUserInfo';
import {colors} from '@/styles/colors';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CustomTabBar = ({state, navigation}: BottomTabBarProps) => {
  const {token} = useToken();
  const {userInfo} = useUserInfoStore();
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          if (route.name === 'SellOnUA' || route.name === 'profile') {
            if (!token) {
              resetRoot('Auth', {screen: 'SignUp'});
              return;
            }
            if (
              route.name === 'SellOnUA' &&
              !userInfo.profile.phone_verified_at
            ) {
              if (token) {
                navigation.navigate('profile', {screen: 'MyProfile'});
              }
              return;
            }
          }
          navigation.navigate(route.name);
        };

        const renderIcon = () => {
          switch (route.name) {
            case 'Home':
              return (
                <HomeIcon
                  width={20}
                  height={20}
                  stroke={isFocused ? '#0064D3' : ''}
                />
              );
            case 'Ads':
              return (
                <AdvertisementIcon
                  width={20}
                  height={20}
                  stroke={isFocused ? '#0064D3' : ''}
                />
              );
            case 'SellOnUA':
              return (
                <SellIcon
                  width={20}
                  height={20}
                  stroke={isFocused ? '#0064D3' : ''}
                />
              );
            case 'Message':
              return (
                <IconMessage
                  width={20}
                  height={20}
                  stroke={isFocused ? '#0064D3' : ''}
                />
              );
            case 'profile':
              return (
                <ProfileIcon
                  width={20}
                  height={20}
                  stroke={isFocused ? '#0064D3' : ''}
                />
              );
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            key={`${route.key}-${index}`}
            onPress={onPress}
            style={styles.tabItem}>
            {renderIcon()}
            <Text
              style={[
                styles.label,
                {color: isFocused ? colors.primary[800] : colors.neutral[900]},
              ]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    height: 80,
    shadowColor: colors.neutral[600],
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 10,
    paddingBottom: 6,
    ...(Platform.OS === 'android' && {
      height: 72,
      borderTopColor: colors.neutral[100],
      borderTopWidth: 1,
      paddingBottom: 2,
    }),
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '400',
    marginTop: 4,
  },
});

export default CustomTabBar;
