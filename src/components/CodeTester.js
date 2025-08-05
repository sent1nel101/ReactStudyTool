import React, { useState } from 'react';
import * as Babel from '@babel/standalone';

function CodeTester({ code, tests, onTestResults }) {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = () => {
    setIsRunning(true);
    const results = [];

    try {
      // Transform JSX to regular JavaScript
      const transformedCode = Babel.transform(code, {
        presets: ['react', 'env']
      }).code;

      // Run each test
      tests.forEach((test, index) => {
        try {
          const passed = test.test(code);
          results.push({
            id: index,
            description: test.description,
            passed,
            error: null
          });
        } catch (error) {
          results.push({
            id: index,
            description: test.description,
            passed: false,
            error: error.message
          });
        }
      });

      // Check if code compiles (using Function constructor instead of eval)
      try {
        // eslint-disable-next-line no-new-func
        new Function(transformedCode);
        results.push({
          id: 'compile',
          description: 'Code compiles without errors',
          passed: true,
          error: null
        });
      } catch (error) {
        results.push({
          id: 'compile',
          description: 'Code compiles without errors',
          passed: false,
          error: error.message
        });
      }

    } catch (error) {
      results.push({
        id: 'syntax',
        description: 'Code has valid syntax',
        passed: false,
        error: error.message
      });
    }

    setTestResults(results);
    setIsRunning(false);
    
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
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <button 
          onClick={runTests}
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </button>
        {testResults.length > 0 && (
          <span style={{ color: testResults.every(r => r.passed) ? '#4CAF50' : '#F44336' }}>
            {testResults.filter(r => r.passed).length} / {testResults.length} tests passed
          </span>
        )}
      </div>

      {testResults.length > 0 && (
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '15px' }}>
          <h4>Test Results:</h4>
          {testResults.map(result => (
            <div 
              key={result.id} 
              style={{ 
                margin: '8px 0', 
                padding: '8px',
                backgroundColor: result.passed ? '#E8F5E8' : '#FFEBEE',
                borderLeft: `4px solid ${result.passed ? '#4CAF50' : '#F44336'}`,
                borderRadius: '3px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  color: result.passed ? '#4CAF50' : '#F44336',
                  fontWeight: 'bold'
                }}>
                  {result.passed ? '✓' : '✗'}
                </span>
                <span>{result.description}</span>
              </div>
              {result.error && (
                <div style={{ 
                  marginTop: '5px', 
                  fontSize: '12px', 
                  color: '#F44336',
                  fontFamily: 'monospace',
                  backgroundColor: '#FFEBEE',
                  padding: '5px',
                  borderRadius: '3px'
                }}>
                  Error: {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CodeTester;
