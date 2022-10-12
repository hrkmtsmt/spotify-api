import { atom } from 'recoil';

export type RefreshTokenPostResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
};

export const refreshTokenPostResponseState = atom<RefreshTokenPostResponse>({
  key: 'accessTokenPostResponse',
  default: {
    access_token: '',
    expires_in: 0,
    scope: '',
    token_type: 'Bearer'
  }
});
