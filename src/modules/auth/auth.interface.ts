import { TUserRole } from '../users/user.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
};
