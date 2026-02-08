import {USER_TOKEN} from '@/constants/token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getAuthToken() {
  try {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting auth token', error);
    return null;
  }
}

export const API: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
});

export async function setAuthToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_TOKEN, token);
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Error setting auth token', error);
  }
}

export async function removeAuthToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_TOKEN);
    delete API.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Error removing auth token', error);
  }
}

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       const locale = await AsyncStorage.getItem(NEXT_LOCALE) || "en";
//       window.location.href = `/${locale}/${PageUrls.Auth.signin}`;
//     }
//     return Promise.reject(error);
//   },
// );

getAuthToken().then(token => {
  console.log('Auth token from storage:', token);
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(API.defaults.headers.common);
  }
});

export default API;
