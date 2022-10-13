import { atom } from 'recoil';
import { RefreshTokenPostResponse } from '@src/api/token';

export const refreshTokenPostResponseState = atom<RefreshTokenPostResponse>({
  key: 'accessTokenPostResponse',
  default: {
    access_token: '',
    expires_in: 0,
    scope: '',
    refresh_token: '',
    token_type: ''
  }
});
