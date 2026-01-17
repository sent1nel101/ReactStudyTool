/**
 * Lesson.js - Individual Lesson Component
 *
 * Displays a single lesson with tabbed navigation between:
 * - Theory: Conceptual explanations
 * - Example: Working code demonstrations
 * - Exercises: Interactive coding challenges with tests
 * - Quiz: Multiple choice knowledge checks
 *
 * Features:
 * - Code editor with syntax highlighting
 * - Real-time test validation
 * - Progress persistence to localStorage
 * - Celebration animations on success
 * - Mobile-responsive sidebar
 *
 * @module Lesson
 */

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { lessons } from '../data/lessons';
import CodeTester from './CodeTester';
import confetti from 'canvas-confetti';
import './Lesson.css';

/**
 * Tab configuration for lesson navigation
 * @constant {Array}
 */
const TABS = [
  { id: 'theory', label: 'Theory' },
  { id: 'example', label: 'Example' },
  { id: 'exercises', label: 'Exercises' },
  { id: 'quiz', label: 'Quiz' }
];

/**
 * LocalStorage key for lesson progress
 * @constant {string}
 */
const PROGRESS_STORAGE_KEY = 'lessonProgress';

/**
 * Safely get/set localStorage with error handling
 */
const storage = {
  get(key, defaultValue = {}) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Failed to read ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Failed to write ${key} to localStorage:`, error);
      return false;
    }
  }
};

/**
 * Trigger confetti celebration animation
 * Used when user completes exercise or answers quiz correctly
 */
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

/**
 * ExerciseSelector Component
 * Renders tabs for selecting between multiple exercises
 *
 * @param {Object} props - Component props
 * @param {Array} props.exercises - Array of exercise objects
 * @param {number} props.activeIndex - Currently selected exercise index
 * @param {Function} props.onSelect - Callback when exercise is selected
 */
const ExerciseSelector = memo(function ExerciseSelector({
  exercises,
  activeIndex,
  onSelect
}) {
  if (!exercises || exercises.length <= 1) return null;

  return (
    <div className="exercise-selector">
      <h3>Choose an Exercise:</h3>
      <div className="exercise-tabs" role="tablist">
        {exercises.map((exercise, index) => (
          <button
            key={exercise.id || index}
            onClick={() => onSelect(index)}
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`exercise-panel-${index}`}
            className={`exercise-tab ${activeIndex === index ? 'active' : ''} difficulty-${exercise.difficulty}`}
          >
            <span className="exercise-title">{exercise.title}</span>
            <span className="exercise-difficulty">{exercise.difficulty}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

ExerciseSelector.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired
    })
  ),
  activeIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

/**
 * QuizQuestion Component
 * Renders a single multiple choice question with feedback
 *
 * @param {Object} props - Component props
 * @param {Object} props.question - Question data object
 * @param {number} props.questionNumber - Display number for the question
 * @param {number|null} props.selectedAnswer - User's selected answer index
 * @param {boolean|null} props.isCorrect - Whether answer is correct (null if unanswered)
 * @param {Function} props.onAnswer - Callback when answer is selected
 */
const QuizQuestion = memo(function QuizQuestion({
  question,
  questionNumber,
  selectedAnswer,
  isCorrect,
  onAnswer
}) {
  const isAnswered = selectedAnswer !== null && selectedAnswer !== undefined;

  return (
    <div className="question-card" data-testid={`question-${question.id}`}>
      <div className="question-header">
        <h4>Question {questionNumber}</h4>
      </div>
      <p className="question-text">{question.question}</p>

      <div className="options-container" role="radiogroup" aria-label={`Question ${questionNumber} options`}>
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedAnswer === optionIndex;
          const isCorrectOption = optionIndex === question.correctAnswer;
          const showResult = isAnswered && isSelected;

          let buttonClass = 'option-button';
          if (isSelected) buttonClass += ' selected';
          if (showResult) buttonClass += isCorrectOption ? ' correct' : ' incorrect';

          return (
            <button
              key={optionIndex}
              onClick={() => !isAnswered && onAnswer(question.id, optionIndex)}
              disabled={isAnswered}
              className={buttonClass}
              role="radio"
              aria-checked={isSelected}
            >
              <span className="option-letter">{String.fromCharCode(65 + optionIndex)}.</span>
              <span className="option-text">{option}</span>
              {showResult && (
                <span className="result-icon" aria-label={isCorrectOption ? 'Correct' : 'Incorrect'}>
                  {isCorrectOption ? '✓' : '×'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div
          className={`explanation ${isCorrect ? 'correct' : 'incorrect'}`}
          role="alert"
        >
          <h5>{isCorrect ? 'Correct!' : 'Incorrect'}</h5>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
});

QuizQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.number.isRequired,
    explanation: PropTypes.string.isRequired
  }).isRequired,
  questionNumber: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.number,
  isCorrect: PropTypes.bool,
  onAnswer: PropTypes.func.isRequired
};

/**
 * NotFound Component
 * Displayed when lesson ID doesn't match any lesson
 */
function NotFound() {
  return (
    <div className="lesson-not-found" role="alert">
      <h2>Lesson not found</h2>
      <p>The lesson you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
}

/**
 * Lesson Component
 *
 * Main lesson interface with tabbed content areas.
 * Manages exercise state, quiz progress, and persistence.
 *
 * @returns {JSX.Element} Rendered lesson page
 */
function Lesson() {
  const { id } = useParams();
  const lessonId = parseInt(id, 10);

  // Find the current lesson
  const lesson = useMemo(
    () => lessons.find(l => l.id === lessonId),
    [lessonId]
  );

  // Component state
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('theory');
  const [activeExercise, setActiveExercise] = useState(0);
  const [testResults, setTestResults] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqResults, setMcqResults] = useState({});
  const [showErrorPulse, setShowErrorPulse] = useState(false);

  /**
   * Get the current exercise based on lesson structure
   * Supports both single exercise and multiple exercises formats
   */
  const currentExercise = useMemo(() => {
    if (!lesson) return null;
    if (lesson.content.exercises && lesson.content.exercises.length > 0) {
      return lesson.content.exercises[activeExercise];
    }
    // Backward compatibility with single exercise format
    return lesson.content.exercise || null;
  }, [lesson, activeExercise]);

  /**
   * Initialize code when lesson or exercise changes
   */
  useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.initialCode);
      setTestResults(null);
    }
  }, [currentExercise]);

  /**
   * Trigger error pulse animation
   */
  const triggerErrorPulse = useCallback(() => {
    setShowErrorPulse(true);
    const timer = setTimeout(() => setShowErrorPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle test results from CodeTester
   * Updates progress in localStorage based on results
   */
  const handleTestResults = useCallback((results) => {
    setTestResults(results);

    if (results.allPassed) {
      triggerConfetti();
    } else {
      triggerErrorPulse();
    }

    // Persist progress
    const progress = storage.get(PROGRESS_STORAGE_KEY);
    if (results.allPassed) {
      progress[lessonId] = 'completed';
    } else if (results.passedCount > 0) {
      progress[lessonId] = 'needs-more-practice';
    }
    storage.set(PROGRESS_STORAGE_KEY, progress);
  }, [lessonId, triggerErrorPulse]);

  /**
   * Handle quiz answer selection
   */
  const handleMcqAnswer = useCallback((questionId, answerIndex) => {
    if (!lesson?.content?.multipleChoice) return;

    const question = lesson.content.multipleChoice.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = answerIndex === question.correctAnswer;

    setMcqAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setMcqResults(prev => ({ ...prev, [questionId]: isCorrect }));

    if (isCorrect) {
      triggerConfetti();
    } else {
      triggerErrorPulse();
    }
  }, [lesson, triggerErrorPulse]);

  /**
   * Show the exercise solution
   */
  const showSolution = useCallback(() => {
    if (currentExercise) {
      setCode(currentExercise.solution);
    }
  }, [currentExercise]);

  /**
   * Reset code to initial state
   */
  const resetCode = useCallback(() => {
    if (currentExercise) {
      setCode(currentExercise.initialCode);
      setTestResults(null);
    }
  }, [currentExercise]);

  /**
   * Handle exercise tab change
   */
  const handleExerciseSelect = useCallback((index) => {
    setActiveExercise(index);
  }, []);

  /**
   * Close mobile sidebar
   */
  const closeSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);

  /**
   * Toggle mobile sidebar
   */
  const toggleSidebar = useCallback(() => {
    setShowSidebar(prev => !prev);
  }, []);

  /**
   * Handle code changes from editor
   */
  const handleCodeChange = useCallback((value) => {
    setCode(value);
  }, []);

  /**
   * Prism highlight function for code editor
   */
  const highlightCode = useCallback((value) => {
    return Prism.highlight(value, Prism.languages.jsx, 'jsx');
  }, []);

  // Calculate quiz progress
  const quizProgress = useMemo(() => {
    if (!lesson?.content?.multipleChoice) return { answered: 0, correct: 0, total: 0 };

    const total = lesson.content.multipleChoice.length;
    const answered = Object.keys(mcqResults).length;
    const correct = Object.values(mcqResults).filter(Boolean).length;

    return { answered, correct, total };
  }, [lesson, mcqResults]);

  // Handle lesson not found
  if (!lesson) {
    return <NotFound />;
  }

  return (
    <div className={`lesson-container ${showErrorPulse ? 'error-pulse' : ''}`}>
      {/* Header */}
      <header className="lesson-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1 className="lesson-title">{lesson.title}</h1>
        <p className="lesson-description">{lesson.description}</p>
        <div className="lesson-meta">
          <span className="meta-item">Difficulty: {lesson.difficulty}</span>
          <span className="meta-item">Estimated Time: {lesson.estimatedTime}</span>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-navigation" aria-label="Lesson sections">
        <div className="tab-container" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Panels */}
      <div className="lesson-content">
        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div
            id="theory-panel"
            role="tabpanel"
            aria-labelledby="theory-tab"
            className="theory-content"
          >
            <div className="content-text">
              {lesson.content.theory}
            </div>
          </div>
        )}

        {/* Example Tab */}
        {activeTab === 'example' && (
          <div
            id="example-panel"
            role="tabpanel"
            aria-labelledby="example-tab"
            className="example-content"
          >
            <div className="example-panel">
              <h3 className="panel-title">Example Code:</h3>
              <pre className="code-example">
                <code>{lesson.content.example}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Exercises Tab */}
        {activeTab === 'exercises' && (
          <div
            id="exercises-panel"
            role="tabpanel"
            aria-labelledby="exercises-tab"
            className="exercises-content"
          >
            {/* Exercise Selection */}
            <ExerciseSelector
              exercises={lesson.content.exercises}
              activeIndex={activeExercise}
              onSelect={handleExerciseSelect}
            />

            {/* Mobile Instructions Toggle */}
            <button
              className="mobile-sidebar-toggle"
              onClick={toggleSidebar}
              aria-expanded={showSidebar}
              aria-controls="instructions-panel"
            >
              {showSidebar ? 'Close Instructions' : 'View Instructions'}
            </button>

            {/* Instructions Panel */}
            <aside
              id="instructions-panel"
              className={`instructions-panel ${showSidebar ? 'mobile-visible' : ''}`}
            >
              <div className="panel-header">
                <h3 className="panel-title">
                  {currentExercise?.title || 'Exercise'}
                  {currentExercise?.difficulty && (
                    <span className={`difficulty-badge ${currentExercise.difficulty}`}>
                      {currentExercise.difficulty}
                    </span>
                  )}
                </h3>
                <button
                  className="mobile-close-btn"
                  onClick={closeSidebar}
                  aria-label="Close instructions"
                >
                  ×
                </button>
              </div>

              <p className="instruction-text">{currentExercise?.instruction}</p>

              <div className="action-buttons">
                <button onClick={resetCode} className="btn btn-secondary">
                  Reset
                </button>
                <button onClick={showSolution} className="btn btn-success">
                  Show Solution
                </button>
              </div>

              {testResults && (
                <div className="progress-panel">
                  <h4 className="progress-title">Progress:</h4>
                  <div
                    className={`progress-indicator ${testResults.allPassed ? 'success' : 'warning'}`}
                    role="status"
                    aria-live="polite"
                  >
                    {testResults.allPassed
                      ? 'Congratulations! Exercise completed!'
                      : `${testResults.passedCount}/${testResults.totalCount} tests passed. Keep trying!`}
                  </div>
                </div>
              )}
            </aside>

            {/* Code Editor Panel */}
            <div className="editor-panel">
              <div className="editor-header">
                <h3 className="panel-title">Code Editor:</h3>
              </div>
              <CodeEditor
                value={code}
                onValueChange={handleCodeChange}
                highlight={highlightCode}
                padding={15}
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  minHeight: 400,
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--border-radius)',
                  boxShadow: 'var(--shadow)'
                }}
                textareaProps={{
                  'aria-label': 'Code editor',
                  style: {
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-quaternary)'
                  }
                }}
              />

              {currentExercise?.tests && (
                <CodeTester
                  code={code}
                  tests={currentExercise.tests}
                  onTestResults={handleTestResults}
                />
              )}
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && lesson.content.multipleChoice && (
          <div
            id="quiz-panel"
            role="tabpanel"
            aria-labelledby="quiz-tab"
            className="quiz-content"
          >
            <h3>Knowledge Quiz</h3>
            <p>Test your understanding with these multiple choice questions:</p>

            {lesson.content.multipleChoice.map((question, index) => (
              <QuizQuestion
                key={question.id}
                question={question}
                questionNumber={index + 1}
                selectedAnswer={mcqAnswers[question.id]}
                isCorrect={mcqResults[question.id]}
                onAnswer={handleMcqAnswer}
              />
            ))}

            <div className="quiz-summary" role="status" aria-live="polite">
              <h4>Quiz Progress</h4>
              <p>
                {quizProgress.answered} of {quizProgress.total} questions answered
                {quizProgress.answered > 0 && (
                  <span> • {quizProgress.correct} correct</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="mobile-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Lesson;
