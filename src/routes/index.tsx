import { createBrowserRouter } from 'react-router-dom';
import { Index } from '@src/pages';
import { Callback } from '@src/pages/callback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/callback',
    element: <Callback />
  }
]);
