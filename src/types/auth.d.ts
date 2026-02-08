import {User} from './user';

export interface ISignUpResponse {
  access_token: string;
  user: User;
}

export interface ISignUpEvent {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type IForgotPassEvent = Pick<User, 'email'>;

export interface INewPasswordRequest {
  token: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface INewPasswordEvent {
  password: string;
  confirm_password: string;
}
