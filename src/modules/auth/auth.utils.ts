
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { config } from '../../config';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: jwt.Secret,
  expiresIn: SignOptions['expiresIn']
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};



//  const token = jwt.sign({ userId: newUser._id }, config.jwt_secret, {
//     expiresIn: '7days',
//   });

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
