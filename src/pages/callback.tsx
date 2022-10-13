import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { refreshTokenPostResponseState } from '@src/atoms/refreshTokenPostResponse';
import { ENCODED_CLIENT_ID_AND_CLIENT_SECRET } from '@src/env';
import type { RefreshTokenPostResponse } from '@src/atoms/refreshTokenPostResponse';

export type AccessTokenPostResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
};

export const Callback: React.FC = () => {
  const navigate = useNavigate();
  const setRefreshTokenPostResponse = useSetRecoilState(
    refreshTokenPostResponseState
  );

  useEffect(() => {
    return () => {
      (async () => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        const accessTokenPostResponse =
          await axios.post<AccessTokenPostResponse>(
            import.meta.env.VITE_SPOTIFY_TOKEN_API_URL,
            {
              grant_type: 'authorization_code',
              code,
              redirect_uri: import.meta.env.VITE_REDIRECT_URI,
              client_id: import.meta.env.VITE_CLIENT_ID,
              code_verifier: 'code_verifier'
            },
            {
              headers: {
                Authorization: `Basic ${ENCODED_CLIENT_ID_AND_CLIENT_SECRET}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );

        const refreshTokenPostResponse =
          await axios.post<RefreshTokenPostResponse>(
            import.meta.env.VITE_SPOTIFY_TOKEN_API_URL,
            {
              grant_type: 'refresh_token',
              refresh_token: accessTokenPostResponse.data.refresh_token,
              client_id: import.meta.env.VITE_CLIENT_ID
            },
            {
              headers: {
                Authorization: `Basic ${ENCODED_CLIENT_ID_AND_CLIENT_SECRET}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
        setRefreshTokenPostResponse(refreshTokenPostResponse.data);
        navigate('/');
      })();
    };
  }, []);

  return <React.Fragment />;
};
