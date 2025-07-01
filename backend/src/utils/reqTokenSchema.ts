import { Request } from 'express';

export type TReqToken = Request & {
  cookies?: { accessToken?: string; refreshToken?: string };
};

export type TJWTUserPayload = {
  email: string;
  id: number;
};

type TJWTSecret = {
  secret?: string | Buffer;
  publicKey?: string | Buffer;
};

export type TJWTVerify = {
  token: string;
  option: TJWTSecret;
  id?: number | string;
  email: string;
  expiredAt: Date;
};
