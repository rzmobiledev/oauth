import { JwtSignOptions } from '@nestjs/jwt';

export type TRole = 'USER' | 'ADMIN' | 'STAFF';

export type TUser = {
  id: number;
  name: string | null;
  email: string;
  password: string | null;
  role: TRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TJWTSignIn = JwtSignOptions & Omit<TUser, 'password'>;
