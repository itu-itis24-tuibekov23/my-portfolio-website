// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Make sure src/index.css exists, otherwise remove this line.
import { BrowserRouter } from 'react-router-dom';

// Import and initialize the mock server
import { makeServer } from './services/server.js';

// Only start the server if in development environment
if (import.meta.env.DEV) {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
