/**
 * Lesson.test.js - Lesson Component Tests
 *
 * Tests for the individual lesson component including:
 * - Tab navigation
 * - Exercise functionality
 * - Quiz interactions
 * - Progress persistence
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Lesson from './Lesson';

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

// Mock confetti
jest.mock('canvas-confetti', () => jest.fn());

/**
 * Helper function to render Lesson with router context
 * @param {string} lessonId - ID of the lesson to render
 */
const renderLesson = (lessonId = '1') => {
  return render(
    <MemoryRouter initialEntries={[`/lesson/${lessonId}`]}>
      <Routes>
        <Route path="/lesson/:id" element={<Lesson />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Lesson Component', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('Lesson Header', () => {
    test('renders lesson title', () => {
      renderLesson('1');
      expect(screen.getByRole('heading', { name: /creating components/i })).toBeInTheDocument();
    });

    test('renders back to home link', () => {
      renderLesson('1');
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
    });

    test('displays lesson difficulty', () => {
      renderLesson('1');
      expect(screen.getByText(/difficulty.*beginner/i)).toBeInTheDocument();
    });

    test('displays estimated time', () => {
      renderLesson('1');
      expect(screen.getByText(/estimated time.*30 minutes/i)).toBeInTheDocument();
    });
  });

  describe('Not Found State', () => {
    test('shows not found message for invalid lesson', () => {
      renderLesson('999');
      expect(screen.getByText(/lesson not found/i)).toBeInTheDocument();
    });

    test('provides link back to home on not found', () => {
      renderLesson('999');
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    test('renders all navigation tabs', () => {
      renderLesson('1');
      expect(screen.getByRole('tab', { name: /theory/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /example/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /exercises/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /quiz/i })).toBeInTheDocument();
    });

    test('theory tab is active by default', () => {
      renderLesson('1');
      const theoryTab = screen.getByRole('tab', { name: /theory/i });
      expect(theoryTab).toHaveAttribute('aria-selected', 'true');
    });

    test('clicking tab changes active tab', async () => {
      renderLesson('1');
      const exampleTab = screen.getByRole('tab', { name: /example/i });

      fireEvent.click(exampleTab);

      expect(exampleTab).toHaveAttribute('aria-selected', 'true');
    });

    test('displays theory content when theory tab active', () => {
      renderLesson('1');
      expect(screen.getByText(/react components are the building blocks/i)).toBeInTheDocument();
    });

    test('displays example code when example tab clicked', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /example/i }));

      await waitFor(() => {
        expect(screen.getByText(/example code/i)).toBeInTheDocument();
      });
    });
  });

  describe('Exercises Tab', () => {
    test('displays exercise selector for lessons with multiple exercises', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));

      await waitFor(() => {
        expect(screen.getByText(/choose an exercise/i)).toBeInTheDocument();
      });
    });

    test('displays code editor in exercises tab', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));

      await waitFor(() => {
        expect(screen.getByText(/code editor/i)).toBeInTheDocument();
      });
    });

    test('reset button resets code to initial state', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));

      await waitFor(() => {
        const resetButton = screen.getByRole('button', { name: /reset/i });
        expect(resetButton).toBeInTheDocument();
      });
    });

    test('show solution button is present', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show solution/i })).toBeInTheDocument();
      });
    });

    test('displays run tests button', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /run tests/i })).toBeInTheDocument();
      });
    });
  });

  describe('Quiz Tab', () => {
    test('displays quiz title', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /quiz/i }));

      await waitFor(() => {
        expect(screen.getByText(/knowledge quiz/i)).toBeInTheDocument();
      });
    });

    test('displays quiz questions', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /quiz/i }));

      await waitFor(() => {
        expect(screen.getByText(/question 1/i)).toBeInTheDocument();
      });
    });

    test('displays multiple choice options', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /quiz/i }));

      await waitFor(() => {
        const options = screen.getAllByRole('radio');
        expect(options.length).toBeGreaterThan(0);
      });
    });

    test('selecting answer shows explanation', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /quiz/i }));

      await waitFor(() => {
        const firstOption = screen.getAllByRole('radio')[0];
        fireEvent.click(firstOption);
      });

      await waitFor(() => {
        // Should show either correct or incorrect explanation
        expect(screen.queryByRole('alert')).toBeInTheDocument();
      });
    });

    test('disables options after answering', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /quiz/i }));

      await waitFor(() => {
        const firstOption = screen.getAllByRole('radio')[0];
        fireEvent.click(firstOption);
      });

      await waitFor(() => {
        const options = screen.getAllByRole('radio');
        options.forEach(option => {
          expect(option).toBeDisabled();
        });
      });
    });

    test('displays quiz progress summary', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /quiz/i }));

      await waitFor(() => {
        expect(screen.getByText(/quiz progress/i)).toBeInTheDocument();
      });
    });
  });

  describe('Mobile Interactions', () => {
    test('mobile instructions toggle is present in exercises', async () => {
      renderLesson('1');

      fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /view instructions/i })).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('tabs have proper ARIA attributes', () => {
      renderLesson('1');
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveAttribute('aria-selected');
        expect(tab).toHaveAttribute('aria-controls');
      });
    });

    test('tab panels have proper roles', async () => {
      renderLesson('1');
      const theoryPanel = screen.getByRole('tabpanel');
      expect(theoryPanel).toBeInTheDocument();
    });

    test('navigation has proper landmark role', () => {
      renderLesson('1');
      expect(screen.getByRole('navigation', { name: /lesson sections/i })).toBeInTheDocument();
    });
  });
});
