import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/page';
import './index.css'; // Uncomment this if you have the CSS file

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 