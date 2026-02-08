import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '@/constants/token';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(USER_TOKEN);
        setToken(storedToken || '');
      } catch (error) {
        console.error('Failed to fetch token:', error);
        setToken('');
      }
    };

    fetchToken();
  }, []);

  return {token};
};

export default useToken;
