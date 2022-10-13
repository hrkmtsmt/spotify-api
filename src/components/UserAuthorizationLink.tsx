import React, { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

const Component: React.FC = () => {
  const state = useMemo<string>(() => uuid(), []);
  const queries = {
    response_type: 'code',
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: 'user-read-private user-read-email',
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    state
  };
  const requestQueries = new URLSearchParams(queries).toString();

  return (
    <a href={`${import.meta.env.VITE_SPOTIFY_API_AUTH_URL}?${requestQueries}`}>
      User Authorization
    </a>
  );
};

export const UserAuthorizationLink = React.memo(Component);
