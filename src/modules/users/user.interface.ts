import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'in-active';
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}




export type TUserRole = keyof typeof USER_ROLE;
