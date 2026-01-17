/**
 * index.js - Application Entry Point
 *
 * This file bootstraps the React application:
 * - Initializes the theme from localStorage (dark by default)
 * - Sets up React 19 createRoot rendering
 * - Wraps the app in StrictMode and HashRouter for routing
 *
 * HashRouter is used for GitHub Pages compatibility since it
 * doesn't support HTML5 pushState routing.
 *
 * @module index
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

/**
 * Initialize theme before React renders to prevent flash of wrong theme
 * Reads from localStorage, defaults to dark theme if not set
 */
function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    // If localStorage is unavailable, use dark theme
    console.warn('Unable to access localStorage for theme:', error);
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Initialize theme immediately
initializeTheme();

// Get the root DOM element
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in index.html');
}

// Create React root and render app
const root = createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
