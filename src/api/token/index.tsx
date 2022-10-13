import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ENCODED_CLIENT_ID_AND_CLIENT_SECRET } from '@src/env';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SPOTIFY_API_TOKEN_URL,
  responseType: 'json',
  headers: {
    Authorization: `Basic ${ENCODED_CLIENT_ID_AND_CLIENT_SECRET}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

export const axiosInstance: AxiosInstance = axios.create(axiosRequestConfig);

const post = async <T, U>(request: U) => {
  try {
    const { data } = await axiosInstance.post<T>('', request);
    if (!data) throw new Error('Error');
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) return error;
  }
};

type RefreshTokenRequestBody = {
  grant_type: string;
  code: string;
  redirect_uri: string;
  client_id: string;
  code_verifier: string;
};

export type RefreshTokenPostResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type AccessTokenRequestBody = {
  grant_type: string;
  refresh_token: string;
  client_id: string;
};

export type AccessTokenPostResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export const apiToken = {
  postRefreshToken: async (code: string) => {
    const result = await post<
      RefreshTokenPostResponse,
      RefreshTokenRequestBody
    >({
      grant_type: 'authorization_code',
      code,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      client_id: import.meta.env.VITE_CLIENT_ID,
      code_verifier: 'code_verifier'
    });
    return result;
  },
  postAccessToken: async () => {
    const result = await post<AccessTokenPostResponse, AccessTokenRequestBody>({
      grant_type: 'refresh_token',
      refresh_token: import.meta.env.VITE_SPOTIFY_API_REFRESH_TOKEN,
      client_id: import.meta.env.VITE_CLIENT_ID
    });
    return result;
  }
};
