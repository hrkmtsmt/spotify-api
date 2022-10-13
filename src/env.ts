import { Buffer } from 'buffer';

export const ENCODED_CLIENT_ID_AND_CLIENT_SECRET = new Buffer(
  `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
).toString('base64');
