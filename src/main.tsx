import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// Make sure the file exists at this path, or update the path if necessary
import './styles/globals.css'; // Ensure this file exists at src/styles/globals.css


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
