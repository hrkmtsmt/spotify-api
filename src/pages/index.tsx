import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { AuthorizationButton } from '@src/components/RequestUserAuthorization';
import { codeState } from '@src/atoms/code';
import { ENV } from '@src/env';

export const Index: React.FC = () => {
  const code = useRecoilValue(codeState);

  useEffect(() => {
    (async () => {
      const getResponse = await axios.get(
        ENV.SPOTIFY_API_URL + `?code=${code}`
      );
    })();
  }, []);

  return (
    <div>
      <AuthorizationButton />
    </div>
  );
};
