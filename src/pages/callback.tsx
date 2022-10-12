import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { accessTokenPostResponseState } from '@src/atoms/accessTokenPostResponse';
import { ENV, ENCODED_CLIENT_ID_AND_CLIENT_SECRET } from '@src/env';
import type { AccessTokenPostResponse } from '@src/atoms/accessTokenPostResponse';

export const Callback: React.FC = () => {
  const navigate = useNavigate();
  const setAccessTokenPostResponse = useSetRecoilState(
    accessTokenPostResponseState
  );

  useEffect(() => {
    return () => {
      (async () => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');

        const { data } = await axios.post<AccessTokenPostResponse>(
          ENV.SPOTIFY_API_URL,
          {
            grant_type: 'authorization_code',
            code,
            redirect_uri: ENV.REDIRECT_URI,
            client_id: ENV.CLIENT_ID,
            code_verifier: 'code_verifier'
          },
          {
            headers: {
              Authorization: `Basic ${ENCODED_CLIENT_ID_AND_CLIENT_SECRET}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        setAccessTokenPostResponse(data);
        navigate('/');
      })();
    };
  }, []);

  return <React.Fragment />;
};
