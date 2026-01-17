/**
 * App.test.js - Application Component Tests
 *
 * Tests for the main App component including:
 * - Rendering the application shell
 * - Header display
 * - Route configuration
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * Helper function to render App with router context
 * @param {string} initialRoute - Starting route for the test
 */
const renderApp = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  describe('Header', () => {
    test('renders application title', () => {
      renderApp();
      expect(screen.getByRole('heading', { name: /react learning platform/i })).toBeInTheDocument();
    });

    test('renders tagline', () => {
      renderApp();
      expect(screen.getByText(/learn • practice • master/i)).toBeInTheDocument();
    });
  });

  describe('Routing', () => {
    test('renders Home component on root path', () => {
      renderApp('/');
      expect(screen.getByRole('heading', { name: /master react development/i })).toBeInTheDocument();
    });

    test('renders Lesson component on lesson path', () => {
      renderApp('/lesson/1');
      expect(screen.getByText(/creating components/i)).toBeInTheDocument();
    });

    test('shows lesson not found for invalid lesson ID', () => {
      renderApp('/lesson/999');
      expect(screen.getByText(/lesson not found/i)).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    test('has correct structure with header and main content', () => {
      renderApp();
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
