import React from 'react';
import { useRecoilValue } from 'recoil';
import { AuthorizationButton } from '@src/components/RequestUserAuthorization';
import { accessTokenPostResponseState } from '@src/atoms/accessTokenPostResponse';

export const Index: React.FC = () => {
  const accessTokenPostResponse = useRecoilValue(accessTokenPostResponseState);

  if (!accessTokenPostResponse.access_token) {
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
