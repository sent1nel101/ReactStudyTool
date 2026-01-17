/**
 * CodeTester.js - Code Testing Component
 *
 * Provides real-time code validation and testing functionality.
 * Transforms JSX code using Babel and runs test assertions against
 * the user's code to provide immediate feedback.
 *
 * @module CodeTester
 */

import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import * as Babel from '@babel/standalone';
import './CodeTester.css';

/**
 * Test result status types
 * @constant {Object}
 */
const TEST_STATUS = {
  PASSED: 'passed',
  FAILED: 'failed',
  ERROR: 'error'
};

/**
 * Safely transform JSX code to JavaScript using Babel
 *
 * @param {string} code - The JSX code to transform
 * @returns {{ success: boolean, code?: string, error?: string }}
 */
function transformCode(code) {
  try {
    const result = Babel.transform(code, {
      presets: ['react', 'env'],
      filename: 'exercise.jsx'
    });
    return { success: true, code: result.code };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to transform code'
    };
  }
}

/**
 * Validate that transformed code can be parsed (syntax check)
 *
 * @param {string} transformedCode - The Babel-transformed code
 * @returns {{ valid: boolean, error?: string }}
 */
function validateSyntax(transformedCode) {
  try {
    // Use Function constructor to check syntax without executing
    // eslint-disable-next-line no-new-func
    new Function(transformedCode);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error.message || 'Syntax error in code'
    };
  }
}

/**
 * Run a single test against the user's code
 *
 * @param {Object} test - Test configuration object
 * @param {string} test.description - Test description
 * @param {Function} test.test - Test function that receives code string
 * @param {string} code - The user's code to test
 * @param {number} index - Test index for identification
 * @returns {Object} Test result object
 */
function runSingleTest(test, code, index) {
  try {
    const passed = test.test(code);
    return {
      id: index,
      description: test.description,
      status: passed ? TEST_STATUS.PASSED : TEST_STATUS.FAILED,
      passed,
      error: null
    };
  } catch (error) {
    return {
      id: index,
      description: test.description,
      status: TEST_STATUS.ERROR,
      passed: false,
      error: error.message || 'Test execution failed'
    };
  }
}

/**
 * TestResultItem Component
 * Renders a single test result with appropriate styling
 *
 * @param {Object} props - Component props
 * @param {Object} props.result - Test result object
 */
const TestResultItem = memo(function TestResultItem({ result }) {
  const statusClass = result.passed ? 'test-result--passed' : 'test-result--failed';
  const statusIcon = result.passed ? '✓' : '✗';
  const statusLabel = result.passed ? 'Passed' : 'Failed';

  return (
    <div className={`test-result ${statusClass}`} role="listitem">
      <div className="test-result__header">
        <span
          className="test-result__icon"
          aria-label={statusLabel}
          role="img"
        >
          {statusIcon}
        </span>
        <span className="test-result__description">{result.description}</span>
      </div>
      {result.error && (
        <div className="test-result__error" role="alert">
          <span className="test-result__error-label">Error:</span> {result.error}
        </div>
      )}
    </div>
  );
});

TestResultItem.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    description: PropTypes.string.isRequired,
    passed: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired
};

/**
 * CodeTester Component
 *
 * Main component that handles code testing workflow:
 * 1. Transforms JSX to JavaScript using Babel
 * 2. Validates syntax
 * 3. Runs user-defined tests against the code
 * 4. Displays results with visual feedback
 *
 * @param {Object} props - Component props
 * @param {string} props.code - The user's code to test
 * @param {Array} props.tests - Array of test objects with description and test function
 * @param {Function} props.onTestResults - Callback when tests complete
 * @returns {JSX.Element} Rendered component
 */
function CodeTester({ code, tests, onTestResults }) {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * Execute all tests against the provided code
   * Wrapped in useCallback for stable reference
   */
  const runTests = useCallback(() => {
    setIsRunning(true);
    const results = [];

    // Step 1: Transform JSX to JavaScript
    const transformation = transformCode(code);

    if (!transformation.success) {
      results.push({
        id: 'syntax',
        description: 'Code has valid syntax',
        passed: false,
        status: TEST_STATUS.ERROR,
        error: transformation.error
      });

      setTestResults(results);
      setIsRunning(false);

      if (onTestResults) {
        onTestResults({
          allPassed: false,
          passedCount: 0,
          totalCount: 1,
          results
        });
      }
      return;
    }

    // Step 2: Run individual tests
    tests.forEach((test, index) => {
      const result = runSingleTest(test, code, index);
      results.push(result);
    });

    // Step 3: Validate syntax (compilation check)
    const syntaxValidation = validateSyntax(transformation.code);
    results.push({
      id: 'compile',
      description: 'Code compiles without errors',
      passed: syntaxValidation.valid,
      status: syntaxValidation.valid ? TEST_STATUS.PASSED : TEST_STATUS.FAILED,
      error: syntaxValidation.error || null
    });

    // Update state
    setTestResults(results);
    setIsRunning(false);

    // Notify parent component
    if (onTestResults) {
      const allPassed = results.every(result => result.passed);
      const passedCount = results.filter(result => result.passed).length;

      onTestResults({
        allPassed,
        passedCount,
        totalCount: results.length,
        results
      });
    }
  }, [code, tests, onTestResults]);

  // Calculate summary statistics
  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;
  const allPassed = totalCount > 0 && passedCount === totalCount;

  return (
    <div className="code-tester" data-testid="code-tester">
      {/* Run Tests Button */}
      <div className="code-tester__actions">
        <button
          onClick={runTests}
          disabled={isRunning}
          className={`code-tester__button ${isRunning ? 'code-tester__button--disabled' : ''}`}
          aria-busy={isRunning}
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>

        {/* Summary Badge */}
        {testResults.length > 0 && (
          <span
            className={`code-tester__summary ${allPassed ? 'code-tester__summary--passed' : 'code-tester__summary--failed'}`}
            role="status"
            aria-live="polite"
          >
            {passedCount} / {totalCount} tests passed
          </span>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div
          className="code-tester__results"
          role="list"
          aria-label="Test results"
        >
          <h4 className="code-tester__results-title">Test Results:</h4>
          {testResults.map(result => (
            <TestResultItem key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}

CodeTester.propTypes = {
  code: PropTypes.string.isRequired,
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      test: PropTypes.func.isRequired
    })
  ).isRequired,
  onTestResults: PropTypes.func
};

CodeTester.defaultProps = {
  onTestResults: null
};

export default memo(CodeTester);
