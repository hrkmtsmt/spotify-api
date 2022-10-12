import { Buffer } from 'buffer';

export const ENV = {
  CLIENT_ID: '29c328cd30844af5be36321621d5db9f',
  CLIENT_SECRET: '6cb1865f461a4ec6b09054e2f43bee73',
  REDIRECT_URI: 'http://localhost:8080/callback',
  SPOTIFY_AUTH_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_TOKEN_API_URL: 'https://accounts.spotify.com/api/token'
} as const;

export const ENCODED_CLIENT_ID_AND_CLIENT_SECRET = new Buffer(
  `${ENV.CLIENT_ID}:${ENV.CLIENT_SECRET}`
).toString('base64');
