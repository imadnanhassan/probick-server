import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { UserStatus } from './user.constant';
import { config } from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      
    },

    role: {
      type: String,
      enum: ['admin',  'customer'], // Ensure 'customer' is included
      default: 'customer', // Set a default if applicable
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], // Ensure correct status values
      default: 'inactive',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
