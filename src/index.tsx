import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App';

const container = document.getElementById('app');

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
