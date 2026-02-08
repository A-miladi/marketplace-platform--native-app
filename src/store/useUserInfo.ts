import {USER_INFO} from '@/constants/token';
import {City} from '@/types/advertisement';
import {User} from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

const initialUserInfo: User = {
  id: 0,
  email: '',
  role: 'USER',
  phone_number: null,
  profile: {
    first_name: '',
    last_name: '',
    full_name: '',
    avatar: null,
    birth_date: '',
    is_verified: false,
    address: '',
    zip_code: '',
    city: {
      id: 0,
      name: '',
      state: {
        id: 0,
        name: '',
      },
      country: {
        id: 0,
        name: '',
        code: '',
      },
    },
    city_id: '',
    status: 'PENDING',
    email_verified_at: '',
    phone_verified_at: null,
    phone_number: null,
  },
  created_at: '',
  updated_at: '',
  rate: null,
};

interface IUserInfoStore {
  userInfo: User;
  setUserInfo: (v: Partial<User>) => void;
}
export const useUserInfoStore = create<IUserInfoStore>()(
  persist(
    set => ({
      userInfo: initialUserInfo,
      setUserInfo: v => set(state => ({userInfo: {...state.userInfo, ...v}})),
    }),
    {
      name: USER_INFO,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
