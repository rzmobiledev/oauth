import { Request, Response } from 'express';
import { TUser } from './userSchema';

export type TReqToken = Request & {
  cookies?: { accessToken?: string; refreshToken?: string };
};

export type TReqUser = {
  user: Omit<TUser, 'password'>;
  res: Response;
};
