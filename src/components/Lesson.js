import React, { useState, useEffect } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { useParams, Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import CodeTester from './CodeTester';
import confetti from 'canvas-confetti';
import './Lesson.css';

function Lesson() {
  const { id } = useParams();
  const lessonId = parseInt(id);
  const lesson = lessons.find(l => l.id === lessonId);
  
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('theory');
  const [activeExercise, setActiveExercise] = useState(0);
  const [testResults, setTestResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqResults, setMcqResults] = useState({});
  const [showConfetti, setShowConfetti] = useState(false); // eslint-disable-line no-unused-vars
  const [showErrorPulse, setShowErrorPulse] = useState(false);

  useEffect(() => {
    if (lesson) {
      // Handle both old single exercise format and new multiple exercises format
      if (lesson.content.exercises && lesson.content.exercises.length > 0) {
        setCode(lesson.content.exercises[0].initialCode);
      } else if (lesson.content.exercise) {
        // Backward compatibility
        setCode(lesson.content.exercise.initialCode);
      }
    }
  }, [lesson]);

  useEffect(() => {
    if (lesson && lesson.content.exercises && lesson.content.exercises[activeExercise]) {
      setCode(lesson.content.exercises[activeExercise].initialCode);
      setTestResults(null);
    }
  }, [activeExercise, lesson]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const triggerErrorPulse = () => {
    setShowErrorPulse(true);
    setTimeout(() => setShowErrorPulse(false), 3000);
  };

  const handleTestResults = (results) => {
    setTestResults(results);
    
    if (results.allPassed) {
      triggerConfetti();
    } else {
      triggerErrorPulse();
    }
    
    // Save progress to localStorage
    const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    if (results.allPassed) {
      progress[lessonId] = 'completed';
    } else if (results.passedCount > 0) {
      progress[lessonId] = 'needs-more-practice';
    }
    localStorage.setItem('lessonProgress', JSON.stringify(progress));
  };

  const handleMcqAnswer = (questionId, answerIndex) => {
    const question = lesson.content.multipleChoice.find(q => q.id === questionId);
    const isCorrect = answerIndex === question.correctAnswer;
    
    setMcqAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
    
    setMcqResults(prev => ({
      ...prev,
      [questionId]: isCorrect
    }));

    if (isCorrect) {
      triggerConfetti();
    } else {
      triggerErrorPulse();
    }
  };

  const getCurrentExercise = () => {
    if (lesson.content.exercises && lesson.content.exercises.length > 0) {
      return lesson.content.exercises[activeExercise];
    } else if (lesson.content.exercise) {
      // Backward compatibility
      return lesson.content.exercise;
    }
    return null;
  };

  const showSolution = () => {
    const exercise = getCurrentExercise();
    if (exercise) {
      setCode(exercise.solution);
    }
  };

  const resetCode = () => {
    const exercise = getCurrentExercise();
    if (exercise) {
      setCode(exercise.initialCode);
    }
  };

  if (!lesson) {
    return (
      <div className="lesson-not-found">
        <h2 style={{ color: 'var(--text-primary)' }}>Lesson not found</h2>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={`lesson-container ${showErrorPulse ? 'error-pulse' : ''}`}>
      {/* Header */}
      <div className="lesson-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1 className="lesson-title">{lesson.title}</h1>
        <p className="lesson-description">{lesson.description}</p>
        <div className="lesson-meta">
          <span className="meta-item">Difficulty: {lesson.difficulty}</span>
          <span className="meta-item">Estimated Time: {lesson.estimatedTime}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <div className="tab-container">
          {['theory', 'example', 'exercises', 'quiz'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="lesson-content">
        {activeTab === 'theory' && (
          <div className="theory-content">
            <div className="content-text">
              {lesson.content.theory}
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div className="example-content">
            <div className="example-panel">
              <h3 className="panel-title">Example Code:</h3>
              <pre className="code-example">
                {lesson.content.example}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="exercises-content">
            {/* Exercise Selection */}
            {lesson.content.exercises && lesson.content.exercises.length > 1 && (
              <div className="exercise-selector">
                <h3>Choose an Exercise:</h3>
                <div className="exercise-tabs">
                  {lesson.content.exercises.map((exercise, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveExercise(index)}
                      className={`exercise-tab ${activeExercise === index ? 'active' : ''} difficulty-${exercise.difficulty}`}
                    >
                      <span className="exercise-title">{exercise.title}</span>
                      <span className="exercise-difficulty">{exercise.difficulty}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Instructions Toggle */}
            <button 
              className="mobile-sidebar-toggle"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? 'Close Instructions' : 'Instructions'}
            </button>

            {/* Instructions Panel */}
            <div className={`instructions-panel ${showSidebar ? 'mobile-visible' : ''}`}>
              <div className="panel-header">
                <h3 className="panel-title">
                  {getCurrentExercise()?.title || 'Exercise'}
                  <span className={`difficulty-badge ${getCurrentExercise()?.difficulty}`}>
                    {getCurrentExercise()?.difficulty}
                  </span>
                </h3>
                <button 
                  className="mobile-close-btn"
                  onClick={() => setShowSidebar(false)}
                >
                  ×
                </button>
              </div>
              
              <p className="instruction-text">{getCurrentExercise()?.instruction}</p>
              
              <div className="action-buttons">
                <button 
                  onClick={resetCode}
                  className="btn btn-secondary"
                >
                  Reset
                </button>
                <button 
                  onClick={showSolution}
                  className="btn btn-success"
                >
                  Show Solution
                </button>
              </div>

              {testResults && (
                <div className="progress-panel">
                  <h4 className="progress-title">Progress:</h4>
                  <div className={`progress-indicator ${testResults.allPassed ? 'success' : 'warning'}`}>
                    {testResults.allPassed ? 
                      'Congratulations! Exercise completed!' : 
                      `${testResults.passedCount}/${testResults.totalCount} tests passed. Keep trying!`
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Code Editor Panel */}
            <div className="editor-panel">
              <div className="editor-header">
                <h3 className="panel-title">Code Editor:</h3>
              </div>
              <CodeEditor
                value={code}
                onValueChange={(value) => setCode(value)}
                highlight={(value) => Prism.highlight(value, Prism.languages.jsx, 'jsx')}
                padding={15}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  minHeight: 400,
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow)'
                }}
                textareaProps={{
                  style: {
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-quaternary)"
                  }
                }}
              />
              
              {getCurrentExercise()?.tests && (
                <CodeTester
                  code={code}
                  tests={getCurrentExercise().tests}
                  onTestResults={handleTestResults}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && lesson.content.multipleChoice && (
          <div className="quiz-content">
            <h3>Knowledge Quiz</h3>
            <p>Test your understanding with these multiple choice questions:</p>
            
            {lesson.content.multipleChoice.map((question, index) => (
              <div key={question.id} className="question-card">
                <div className="question-header">
                  <h4>Question {index + 1}</h4>
                </div>
                <p className="question-text">{question.question}</p>
                
                <div className="options-container">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = mcqAnswers[question.id] === optionIndex;
                    const isAnswered = question.id in mcqResults;
                    const isCorrect = optionIndex === question.correctAnswer;
                    const showResult = isAnswered && isSelected;
                    
                    return (
                      <button
                        key={optionIndex}
                        onClick={() => !isAnswered && handleMcqAnswer(question.id, optionIndex)}
                        disabled={isAnswered}
                        className={`option-button ${
                          isSelected ? 'selected' : ''
                        } ${
                          showResult ? (isCorrect ? 'correct' : 'incorrect') : ''
                        }`}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + optionIndex)}.</span>
                        <span className="option-text">{option}</span>
                        {showResult && (
                          <span className="result-icon">
                            {isCorrect ? '✓' : '×'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {mcqResults[question.id] !== undefined && (
                  <div className={`explanation ${mcqResults[question.id] ? 'correct' : 'incorrect'}`}>
                    <h5>{mcqResults[question.id] ? 'Correct!' : 'Incorrect'}</h5>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
            
            <div className="quiz-summary">
              <h4>Quiz Progress</h4>
              <p>
                {Object.keys(mcqResults).length} of {lesson.content.multipleChoice.length} questions answered
                {Object.keys(mcqResults).length > 0 && (
                  <span> • {Object.values(mcqResults).filter(Boolean).length} correct</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {showSidebar && <div className="mobile-overlay" onClick={() => setShowSidebar(false)}></div>}
    </div>
  );
}

export default Lesson;
