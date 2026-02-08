import {useState, useCallback} from 'react';
import {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '@/services';
import {USER_TOKEN} from '@/constants/token';

interface UsePostOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UsePostResult<T, P> {
  loading: boolean;
  execute: (payload: P) => Promise<T | void>;
}

export const usePost = <T, P>(
  url: string,
  options: UsePostOptions<T> = {},
): UsePostResult<T, P> => {
  const {onSuccess, onError} = options;

  const [loading, setLoading] = useState<boolean>(false);

  // Use AsyncStorage to get the token asynchronously
  const getAuthToken = async () => {
    try {
      return await AsyncStorage.getItem(USER_TOKEN);
    } catch (error) {
      console.error('Error getting auth token', error);
      return null;
    }
  };

  const execute = useCallback(
    async (payload: P | FormData): Promise<T | void> => {
      setLoading(true);
      console.log('usePost execute called with payload:', payload);
      try {
        const token = await getAuthToken(); // Get the token from AsyncStorage
        console.log(
          'Auth token retrieved:',
          token ? 'Token exists' : 'No token',
        );

        const isFormData = payload instanceof FormData;
        console.log('Payload is FormData:', isFormData);

        const headers = isFormData
          ? {
              'Content-Type': 'multipart/form-data',
              Authorization: token ? `Bearer ${token}` : '',
            }
          : {
              'Content-Type': 'application/json',
              Authorization: token ? `Bearer ${token}` : '',
            };
        console.log('Request headers:', headers);
        console.log('Making API request to:', url);

        const response = await API.post<T>(url, payload, {headers});
        console.log('API response received:', response.data);

        onSuccess?.(response.data);
        return response.data;
      } catch (err: unknown) {
        console.error('API request error:', err);
        if (err instanceof AxiosError) {
          const errorMessage =
            err.response?.data?.message || err.message || 'An error occurred';
          console.error('Axios error details:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
          });
          onError?.(errorMessage);
        } else if (err instanceof Error) {
          const errorMessage = err.message || 'An unexpected error occurred';
          onError?.(errorMessage);
        } else {
          const errorMessage = 'An unknown error occurred';
          onError?.(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onError],
  );

  return {loading, execute};
};
