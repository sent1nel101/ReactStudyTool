import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';

function Home() {
  const [lessonProgress, setLessonProgress] = useState({});

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      setLessonProgress(JSON.parse(savedProgress));
    }
  }, []);



  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': 
        return (
          <div style={{
            backgroundColor: 'var(--accent-success)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            Completed
          </div>
        );
      case 'needs-more-practice': 
        return (
          <div style={{
            backgroundColor: 'var(--accent-warning)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            In Progress
          </div>
        );
      case 'not-attempted':
      default: 
        return (
          <div style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            border: '1px solid var(--border-primary)'
          }}>
            Not Started
          </div>
        );
    }
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh',
      background: 'transparent',
      color: 'var(--text-primary)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          margin: '0 0 16px 0',
          color: 'var(--text-primary)',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }}>
          Master React Development
        </h1>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--text-secondary)', 
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          From fundamentals to employment-ready skills. Learn React through interactive lessons and hands-on coding exercises.
        </p>
      </div>
      
      <div>
        <h2 style={{ 
          fontSize: '1.875rem', 
          marginBottom: '40px',
          color: 'var(--text-primary)',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          Learning Path
        </h2>
        <div style={{ 
          display: 'grid', 
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
        }}>
          {lessons.map(lesson => {
            const status = lessonProgress[lesson.id] || lesson.status;
            return (
              <div key={lesson.id} style={{
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '32px',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
                e.currentTarget.style.borderColor = 'var(--border-primary)';
              }}>                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                    border: '1px solid var(--border-primary)',
                    color: 'var(--accent-primary)',
                    fontWeight: '600'
                  }}>
                    {lesson.id}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
                        <Link 
                          to={`/lesson/${lesson.id}`} 
                          style={{ 
                            textDecoration: 'none', 
                            color: 'var(--text-primary)',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                          onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                        >
                          {lesson.title}
                        </Link>
                      </h3>
                      {getStatusBadge(status)}
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        fontSize: '12px',
                        borderRadius: '6px',
                        backgroundColor: lesson.difficulty === 'beginner' ? 'rgba(16, 185, 129, 0.1)' :
                                       lesson.difficulty === 'intermediate' ? 'rgba(245, 158, 11, 0.1)' :
                                       'rgba(239, 68, 68, 0.1)',
                        color: lesson.difficulty === 'beginner' ? 'var(--accent-success)' :
                               lesson.difficulty === 'intermediate' ? 'var(--accent-warning)' :
                               'var(--accent-danger)',
                        textTransform: 'capitalize',
                        fontWeight: '500',
                        border: `1px solid ${lesson.difficulty === 'beginner' ? 'var(--accent-success)' :
                                lesson.difficulty === 'intermediate' ? 'var(--accent-warning)' :
                                'var(--accent-danger)'}`
                      }}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    
                    <p style={{ 
                      margin: '0 0 20px 0', 
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      fontSize: '0.9rem'
                    }}>
                      {lesson.description}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        gap: '16px', 
                        fontSize: '0.875rem', 
                        color: 'var(--text-tertiary)' 
                      }}>
                        <span>{lesson.estimatedTime}</span>
                      </div>
                      
                      <Link 
                        to={`/lesson/${lesson.id}`}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 'var(--border-radius)',
                          backgroundColor: 'var(--accent-primary)',
                          color: 'white',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          textDecoration: 'none',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-secondary)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--accent-primary)'}
                      >
                        Start Learning
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;