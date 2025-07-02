import axios, {AxiosError, type AxiosResponse, } from 'axios';
import type {InternalAxiosRequestConfig} from 'axios'

type TError = {
    message: string;
    response: number
}

type TConfig = InternalAxiosRequestConfig & {
    _retry: boolean
}

const options = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 120000
}

const API = axios.create(options)

API.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    async (error: AxiosError<TError>) => {
        const { message, response, config } = error
        const originalRequest = config as TConfig;

        if (response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as true to avoid infinite loops.
            try {
                const NEWAPI = axios.create(options)
                await NEWAPI.post('/auth/refresh')
                return API(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(message)
    }
)

export default API