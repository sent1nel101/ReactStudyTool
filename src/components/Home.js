/**
 * Home.js - Lesson Dashboard Component
 *
 * Displays the main dashboard with all available lessons in a card grid.
 * Handles lesson progress persistence via localStorage and provides
 * visual feedback on completion status.
 *
 * @module Home
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { lessons } from '../data/lessons';
import './Home.css';

/**
 * Status badge colors and labels for different progress states
 * @constant {Object}
 */
const STATUS_CONFIG = {
  completed: {
    className: 'status-badge--completed',
    label: 'Completed',
    ariaLabel: 'Lesson completed'
  },
  'needs-more-practice': {
    className: 'status-badge--in-progress',
    label: 'In Progress',
    ariaLabel: 'Lesson in progress'
  },
  'not-attempted': {
    className: 'status-badge--not-started',
    label: 'Not Started',
    ariaLabel: 'Lesson not started'
  }
};

/**
 * Difficulty level configuration for styling
 * @constant {Object}
 */
const DIFFICULTY_CONFIG = {
  beginner: 'difficulty-badge--beginner',
  intermediate: 'difficulty-badge--intermediate',
  advanced: 'difficulty-badge--advanced'
};

/**
 * StatusBadge Component
 * Displays a colored badge indicating lesson completion status
 *
 * @param {Object} props - Component props
 * @param {string} props.status - Current status: 'completed' | 'needs-more-practice' | 'not-attempted'
 * @returns {JSX.Element} Rendered status badge
 */
function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['not-attempted'];

  return (
    <div
      className={`status-badge ${config.className}`}
      role="status"
      aria-label={config.ariaLabel}
    >
      {config.label}
    </div>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['completed', 'needs-more-practice', 'not-attempted'])
};

StatusBadge.defaultProps = {
  status: 'not-attempted'
};

/**
 * DifficultyBadge Component
 * Displays a colored badge indicating lesson difficulty level
 *
 * @param {Object} props - Component props
 * @param {string} props.difficulty - Difficulty level: 'beginner' | 'intermediate' | 'advanced'
 * @returns {JSX.Element} Rendered difficulty badge
 */
function DifficultyBadge({ difficulty }) {
  const className = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.beginner;

  return (
    <span className={`difficulty-badge ${className}`}>
      {difficulty}
    </span>
  );
}

DifficultyBadge.propTypes = {
  difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced'])
};

DifficultyBadge.defaultProps = {
  difficulty: 'beginner'
};

/**
 * LessonCard Component
 * Renders an individual lesson card with metadata and navigation
 *
 * @param {Object} props - Component props
 * @param {Object} props.lesson - Lesson data object
 * @param {string} props.status - Current completion status
 * @returns {JSX.Element} Rendered lesson card
 */
function LessonCard({ lesson, status }) {
  return (
    <article className="lesson-card" data-testid={`lesson-card-${lesson.id}`}>
      <div className="lesson-card__content">
        <div className="lesson-card__icon" aria-hidden="true">
          {lesson.id}
        </div>

        <div className="lesson-card__details">
          <header className="lesson-card__header">
            <h3 className="lesson-card__title">
              <Link
                to={`/lesson/${lesson.id}`}
                className="lesson-card__link"
              >
                {lesson.title}
              </Link>
            </h3>
            <StatusBadge status={status} />
          </header>

          <div className="lesson-card__difficulty">
            <DifficultyBadge difficulty={lesson.difficulty} />
          </div>

          <p className="lesson-card__description">
            {lesson.description}
          </p>

          <footer className="lesson-card__footer">
            <span className="lesson-card__time">
              {lesson.estimatedTime}
            </span>

            <Link
              to={`/lesson/${lesson.id}`}
              className="lesson-card__button"
              aria-label={`Start learning ${lesson.title}`}
            >
              Start Learning
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}

LessonCard.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    estimatedTime: PropTypes.string.isRequired,
    status: PropTypes.string
  }).isRequired,
  status: PropTypes.string.isRequired
};

/**
 * Home Component
 * Main dashboard displaying all lessons with progress tracking
 *
 * Features:
 * - Loads and persists lesson progress from localStorage
 * - Displays lessons in a responsive grid layout
 * - Shows visual status indicators for each lesson
 * - Handles errors gracefully when localStorage is unavailable
 *
 * @returns {JSX.Element} Rendered home dashboard
 */
function Home() {
  const [lessonProgress, setLessonProgress] = useState({});
  const [loadError, setLoadError] = useState(null);

  /**
   * Load progress from localStorage on component mount
   * Wrapped in useCallback for consistency and potential reuse
   */
  const loadProgress = useCallback(() => {
    try {
      const savedProgress = localStorage.getItem('lessonProgress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        // Validate that parsed data is an object
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setLessonProgress(parsed);
        }
      }
      setLoadError(null);
    } catch (error) {
      console.error('Failed to load lesson progress:', error);
      setLoadError('Unable to load your progress. Starting fresh.');
      setLessonProgress({});
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  /**
   * Memoized lesson list with computed status
   * Prevents recalculation on every render
   */
  const lessonsWithStatus = useMemo(() => {
    return lessons.map(lesson => ({
      ...lesson,
      currentStatus: lessonProgress[lesson.id] || lesson.status || 'not-attempted'
    }));
  }, [lessonProgress]);

  /**
   * Calculate overall progress statistics
   */
  const progressStats = useMemo(() => {
    const completed = lessonsWithStatus.filter(
      l => l.currentStatus === 'completed'
    ).length;
    const inProgress = lessonsWithStatus.filter(
      l => l.currentStatus === 'needs-more-practice'
    ).length;
    const total = lessonsWithStatus.length;

    return { completed, inProgress, total };
  }, [lessonsWithStatus]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero" aria-labelledby="home-title">
        <h1 id="home-title" className="home-hero__title">
          Master React Development
        </h1>
        <p className="home-hero__subtitle">
          From fundamentals to employment-ready skills. Learn React through
          interactive lessons and hands-on coding exercises.
        </p>

        {/* Progress Summary */}
        {progressStats.completed > 0 && (
          <div className="home-hero__progress" role="status" aria-live="polite">
            <span className="progress-stat">
              {progressStats.completed} of {progressStats.total} lessons completed
            </span>
          </div>
        )}
      </section>

      {/* Error Message */}
      {loadError && (
        <div className="home-error" role="alert">
          {loadError}
        </div>
      )}

      {/* Lessons Grid */}
      <section className="home-lessons" aria-labelledby="lessons-title">
        <h2 id="lessons-title" className="home-lessons__title">
          Learning Path
        </h2>

        <div className="lessons-grid">
          {lessonsWithStatus.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              status={lesson.currentStatus}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
