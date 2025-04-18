import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payLoad: string | Buffer | object,
  secret: Secret,
  expiresIn: string
): string => {
  const accessToken = jwt.sign(payLoad, secret, {
    expiresIn,
  } as SignOptions);
  return accessToken;
};
