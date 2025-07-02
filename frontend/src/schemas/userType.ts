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

export type TUserRegister = Omit<TUser, 'id'|'createdAt'|'updatedAt'>;
export type TUserNoPassword = Omit<TUser, 'password'>;
export type TLogin = Pick<TUser, 'email' | 'password'>;