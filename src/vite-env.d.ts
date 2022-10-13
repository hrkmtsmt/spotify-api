/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_CLIENT_ID: string;
  VITE_CLIENT_SECRET: string;
  VITE_REDIRECT_URI: string;
  VITE_SPOTIFY_API_URL: string;
  VITE_SPOTIFY_API_AUTH_URL: string;
  VITE_SPOTIFY_API_TOKEN_URL: string;
  VITE_SPOTIFY_API_REFRESH_TOKEN: string;
}

interface ImportMetaEnv {
  readonly env: ImportMetaEnv;
}
