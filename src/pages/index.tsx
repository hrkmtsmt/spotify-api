import React from 'react';
import { useRecoilValue } from 'recoil';
import { AuthorizationButton } from '@src/components/RequestUserAuthorization';
import { refreshTokenPostResponseState } from '@src/atoms/refreshTokenPostResponse';

export const Index: React.FC = () => {
  const refreshTokenPostResponse = useRecoilValue(
    refreshTokenPostResponseState
  );

  if (!refreshTokenPostResponse.access_token) {
    return (
      <div>
        <AuthorizationButton />
      </div>
    );
  }

  return (
    <div>
      <button></button>
    </div>
  );
};
