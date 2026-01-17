/**
 * Home.test.js - Home Component Tests
 *
 * Tests for the Home/Dashboard component including:
 * - Lesson card rendering
 * - Progress tracking from localStorage
 * - Status badges
 * - Navigation links
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

/**
 * Helper function to render Home with router context
 */
const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('Hero Section', () => {
    test('renders main title', () => {
      renderHome();
      expect(screen.getByRole('heading', { name: /master react development/i })).toBeInTheDocument();
    });

    test('renders subtitle description', () => {
      renderHome();
      expect(screen.getByText(/from fundamentals to employment-ready skills/i)).toBeInTheDocument();
    });

    test('renders Learning Path section title', () => {
      renderHome();
      expect(screen.getByRole('heading', { name: /learning path/i })).toBeInTheDocument();
    });
  });

  describe('Lesson Cards', () => {
    test('renders all lesson cards', () => {
      renderHome();
      // Check for lesson titles
      expect(screen.getByText(/creating components/i)).toBeInTheDocument();
      expect(screen.getByText(/using state with usestate/i)).toBeInTheDocument();
      expect(screen.getByText(/props and component communication/i)).toBeInTheDocument();
    });

    test('each lesson card has a Start Learning link', () => {
      renderHome();
      const startButtons = screen.getAllByRole('link', { name: /start learning/i });
      expect(startButtons.length).toBeGreaterThan(0);
    });

    test('lesson cards have correct navigation links', () => {
      renderHome();
      const firstLessonLink = screen.getByRole('link', { name: /start learning creating components/i });
      expect(firstLessonLink).toHaveAttribute('href', '/lesson/1');
    });

    test('displays lesson difficulty badges', () => {
      renderHome();
      expect(screen.getAllByText(/beginner/i).length).toBeGreaterThan(0);
    });

    test('displays estimated time for lessons', () => {
      renderHome();
      expect(screen.getByText(/30 minutes/i)).toBeInTheDocument();
    });
  });

  describe('Progress Tracking', () => {
    test('loads progress from localStorage on mount', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ 1: 'completed' }));
      renderHome();
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('lessonProgress');
    });

    test('displays completed status badge for completed lessons', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ 1: 'completed' }));
      renderHome();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    test('displays in progress status badge', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ 1: 'needs-more-practice' }));
      renderHome();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
    });

    test('displays not started status by default', () => {
      renderHome();
      const notStartedBadges = screen.getAllByText('Not Started');
      expect(notStartedBadges.length).toBeGreaterThan(0);
    });

    test('shows progress summary when lessons completed', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ 1: 'completed', 2: 'completed' }));
      renderHome();
      expect(screen.getByText(/2 of \d+ lessons completed/i)).toBeInTheDocument();
    });

    test('handles malformed localStorage data gracefully', () => {
      mockLocalStorage.getItem.mockReturnValueOnce('invalid json');
      // Should not throw
      expect(() => renderHome()).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy', () => {
      renderHome();
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
    });

    test('status badges have proper ARIA roles', () => {
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify({ 1: 'completed' }));
      renderHome();
      const statusBadges = screen.getAllByRole('status');
      expect(statusBadges.length).toBeGreaterThan(0);
    });

    test('lesson cards are semantic articles', () => {
      renderHome();
      const articles = screen.getAllByRole('article');
      expect(articles.length).toBeGreaterThan(0);
    });
  });
});
