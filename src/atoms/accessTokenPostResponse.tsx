import { atom } from 'recoil';

export type AccessTokenPostResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
};

export const accessTokenPostResponseState = atom<AccessTokenPostResponse>({
  key: 'accessTokenPostResponse',
  default: {
    access_token: '',
    expires_in: 0,
    refresh_token: '',
    scope: '',
    token_type: 'Bearer'
  }
});
