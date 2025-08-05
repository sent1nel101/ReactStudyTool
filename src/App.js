import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Lesson from './components/Lesson';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gradient-bg-subtle)',
      color: 'var(--text-primary)'
    }}>
        <header style={{
          background: 'var(--gradient-primary)',
          padding: '20px 0',
          boxShadow: 'var(--shadow-lg)',
          borderBottom: '1px solid var(--border-primary)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '700',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              React Learning Platform
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.9)'
            }}>
              <span>Learn • Practice • Master</span>
            </div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<Lesson />} />
        </Routes>
      </div>
  );
}

export default App;