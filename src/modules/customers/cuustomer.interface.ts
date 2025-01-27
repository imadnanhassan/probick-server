import { Types, Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TCustomer = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  email: string;
  contactNo: string;
  billingAddress: string;
  profileImg?: string;
};
//for creating static
export interface CustomertModel extends Model<TCustomer> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: string): Promise<TCustomer | null>;
}