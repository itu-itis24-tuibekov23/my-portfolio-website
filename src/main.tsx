// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';          // ✅ Redux Provider
import { store } from './store';                // ✅ Redux Store

// Import and initialize the mock server
import { makeServer } from './services/server.js';

// Only start the server if in development environment
if (import.meta.env.DEV) {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>                    {/* ✅ Wrap App in Redux Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
