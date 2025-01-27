import { CustomertModel, TCustomer, TUserName } from './cuustomer.interface';
import { model, Schema } from 'mongoose';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const customerSchema = new Schema<TCustomer, CustomertModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },

    billingAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },

    profileImg: { type: String, default: '' },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

customerSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.lastName;
});

export const Student = model<TCustomer, CustomertModel>(
  'Student',
  customerSchema
);
