import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Or your App.css if used globally
import { Provider } from 'react-redux'; // <-- NEW
import { store } from './store'; // <-- NEW: Import your Redux store
import { makeServer } from './services/server'; // <-- NEW: Import makeServer function
import { BrowserRouter } from 'react-router-dom'; // Already there, but keeping it for context

// Initialize MirageJS server in development
if (import.meta.env.DEV) { // <-- NEW: Use Vite's environment variable for development mode
  makeServer(); // <-- NEW: Call to start the mock server
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* <-- NEW: Wrap your App with Redux Provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);