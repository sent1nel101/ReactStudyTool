/**
 * CodeTester.test.js - CodeTester Component Tests
 *
 * Tests for the code testing component including:
 * - Test execution
 * - Result display
 * - Error handling
 * - Callback functionality
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeTester from './CodeTester';

describe('CodeTester Component', () => {
  const defaultProps = {
    code: 'function Test() { return <div>Hello</div>; }',
    tests: [
      {
        description: 'Should include function keyword',
        test: (code) => code.includes('function')
      },
      {
        description: 'Should include return statement',
        test: (code) => code.includes('return')
      }
    ],
    onTestResults: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    test('renders run tests button', () => {
      render(<CodeTester {...defaultProps} />);
      expect(screen.getByRole('button', { name: /run tests/i })).toBeInTheDocument();
    });

    test('does not show results before running tests', () => {
      render(<CodeTester {...defaultProps} />);
      expect(screen.queryByText(/test results/i)).not.toBeInTheDocument();
    });
  });

  describe('Test Execution', () => {
    test('displays test results after running', async () => {
      render(<CodeTester {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(screen.getByText(/test results/i)).toBeInTheDocument();
      });
    });

    test('shows passing tests with checkmarks', async () => {
      render(<CodeTester {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        // Multiple checkmarks appear for passing tests
        const checkmarks = screen.getAllByText('✓');
        expect(checkmarks.length).toBeGreaterThan(0);
      });
    });

    test('shows test count summary', async () => {
      render(<CodeTester {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        // Tests include the compile check, so count is tests.length + 1
        expect(screen.getByText(/3 \/ 3 tests passed/i)).toBeInTheDocument();
      });
    });
  });

  describe('Failing Tests', () => {
    test('shows failing tests with X mark', async () => {
      const failingProps = {
        ...defaultProps,
        code: 'const x = 1',
        tests: [
          {
            description: 'Should include function',
            test: (code) => code.includes('function')
          }
        ]
      };

      render(<CodeTester {...failingProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(screen.getByText('✗')).toBeInTheDocument();
      });
    });

    test('displays partial pass count', async () => {
      const partialPassProps = {
        ...defaultProps,
        tests: [
          {
            description: 'Should include function',
            test: (code) => code.includes('function')
          },
          {
            description: 'Should include nonexistent',
            test: (code) => code.includes('nonexistent')
          }
        ]
      };

      render(<CodeTester {...partialPassProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(screen.getByText(/2 \/ 3 tests passed/i)).toBeInTheDocument();
      });
    });
  });

  describe('Syntax Errors', () => {
    test('handles invalid JSX gracefully', async () => {
      const invalidCodeProps = {
        ...defaultProps,
        code: 'function Test() { return <div>; }' // Invalid JSX
      };

      render(<CodeTester {...invalidCodeProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(screen.getByText(/code has valid syntax/i)).toBeInTheDocument();
      });
    });
  });

  describe('Callback Functionality', () => {
    test('calls onTestResults with correct data on success', async () => {
      const mockCallback = jest.fn();
      render(<CodeTester {...defaultProps} onTestResults={mockCallback} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          expect.objectContaining({
            allPassed: true,
            passedCount: 3,
            totalCount: 3
          })
        );
      });
    });

    test('calls onTestResults with failure data', async () => {
      const mockCallback = jest.fn();
      const failingProps = {
        code: 'const x = 1',
        tests: [
          {
            description: 'Test',
            test: () => false
          }
        ],
        onTestResults: mockCallback
      };

      render(<CodeTester {...failingProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          expect.objectContaining({
            allPassed: false
          })
        );
      });
    });

    test('handles missing callback gracefully', async () => {
      const propsWithoutCallback = {
        code: defaultProps.code,
        tests: defaultProps.tests
      };

      render(<CodeTester {...propsWithoutCallback} />);

      // Should not throw
      expect(() => {
        fireEvent.click(screen.getByRole('button', { name: /run tests/i }));
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    test('button has proper aria-busy state', async () => {
      render(<CodeTester {...defaultProps} />);
      const button = screen.getByRole('button', { name: /run tests/i });

      expect(button).toHaveAttribute('aria-busy', 'false');
    });

    test('test results have list role', async () => {
      render(<CodeTester {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(screen.getByRole('list')).toBeInTheDocument();
      });
    });

    test('individual results have listitem role', async () => {
      render(<CodeTester {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        const listItems = screen.getAllByRole('listitem');
        expect(listItems.length).toBeGreaterThan(0);
      });
    });

    test('summary has status role for screen readers', async () => {
      render(<CodeTester {...defaultProps} />);

      fireEvent.click(screen.getByRole('button', { name: /run tests/i }));

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });
  });
});
