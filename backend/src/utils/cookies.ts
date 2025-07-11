import { Response, CookieOptions } from 'express';
import { getEnv } from './getEnv';
import { calculateCookieExpiresIn } from './dateCalculation';

export const REFRESH_PATH = `${getEnv('HOST')}:${getEnv('PORT')}/${getEnv('API')}/user/refresh`;

const defaultCookie: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  domain: getEnv('COOKIE_DOMAIN', 'localhost').split(',')[0], // Use the first domain from the list
};

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiresIn = getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MINS');
  const expires = calculateCookieExpiresIn(expiresIn);
  return {
    ...defaultCookie,
    expires,
    path: REFRESH_PATH,
  };
};

export const getAccessTokenCookieOptions = (): CookieOptions => {
  const expiresIn = getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MINS');
  const expires = calculateCookieExpiresIn(expiresIn);
  return {
    ...defaultCookie,
    expires,
    path: '/',
  };
};

export const getAccessTokenCookieOauthOptions = (): CookieOptions => {
  const expiresIn = getEnv('GOOGLE_OAUTH_TOKEN_EXPIRATION_MINS');
  const expires = calculateCookieExpiresIn(expiresIn);
  return {
    ...defaultCookie,
    expires,
    path: '/',
  };
};

export const setAuthenticationCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): Response =>
  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());

export const setAuthenticationOauthCookies = (
  res: Response,
  accessToken: string,
): Response =>
  res.cookie('accessToken', accessToken, getAccessTokenCookieOauthOptions());

export const clearAuthenticationCookies = (res: Response): Response => {
  return res
    .clearCookie('accessToken', {
      ...defaultCookie,
      expires: new Date(0),
      path: '/',
    })
    .clearCookie('refreshToken', {
      ...defaultCookie,
      expires: new Date(0),
      path: REFRESH_PATH,
    });
};
