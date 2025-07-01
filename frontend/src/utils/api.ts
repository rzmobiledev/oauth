import API from "./axios.client";
import { type AxiosResponse } from 'axios';
import type { TLogin, TUserRegister } from "./userType";


export const loginMutation: (data: TLogin) => Promise<AxiosResponse<unknown>> = async(data: TLogin) => await API.post("/auth/login", data)

export const logoutMutation: () => Promise<AxiosResponse<unknown>> = async() => await API.post("/auth/logout")

export const userRegisterMutation: (data: TUserRegister) => Promise<AxiosResponse<unknown>> = async(data: TUserRegister) => await API.post("/users", data)

export const refresTokenMutaton: ()=> Promise<AxiosResponse<unknown>> = async() => await API.post("/refresh")

export const getAllUsers: () => Promise<AxiosResponse<unknown>> = async() => await API.post("/users")

export const oauth: () => Promise<AxiosResponse<unknown>> = async() => await API.post("/auth/google")