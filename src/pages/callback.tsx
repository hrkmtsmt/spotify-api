import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { refreshTokenPostResponseState } from '@src/atoms/refreshTokenPostResponse';
import { apiToken } from '@src/api/token';

export type AccessTokenPostResponse = {
  access_token: string;
  expires_in: number;
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

        if (!code) return;
        const refreshTokenPostResponse = await apiToken.postRefreshToken(code);

        if (
          !refreshTokenPostResponse ||
          refreshTokenPostResponse instanceof Error
        )
          return;
        setRefreshTokenPostResponse(refreshTokenPostResponse);

        navigate('/');
      })();
    };
  }, []);

  return <React.Fragment />;
};
