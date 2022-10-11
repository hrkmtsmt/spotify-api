import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@src/routes';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('app');

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </React.StrictMode>
  );
}
