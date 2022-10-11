import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { ENV } from '@src/env';

const Component: React.FC = () => {
  const state = useMemo<string>(() => uuid(), []);
  const queries = {
    response_type: 'code',
    client_id: ENV.CLIENT_ID,
    scope: 'user-read-private user-read-email',
    redirect_uri: ENV.REDIRECT_URI,
    state
  };
  const requestQueries = new URLSearchParams(queries).toString();

  return (
    <a href={`${ENV.SPOTIFY_AUTH_URL}?${requestQueries}`}>
      Request User Authorization
    </a>
  );
};

export const AuthorizationButton = React.memo(Component);
