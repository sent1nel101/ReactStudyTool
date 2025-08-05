import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

// Initialize dark theme by default
const savedTheme = localStorage.getItem('theme');
const defaultTheme = savedTheme || 'dark';
document.documentElement.setAttribute('data-theme', defaultTheme);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);