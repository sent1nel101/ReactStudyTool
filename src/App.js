/**
 * App.js - Main Application Component
 *
 * This is the root component of the React Learning Platform.
 * It sets up the main layout structure including the header and
 * configures client-side routing for navigation between pages.
 *
 * @module App
 */

import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Lesson from "./components/Lesson"
import "./styles/App.css"

/**
 * Main Application Component
 *
 * Renders the application shell with:
 * - A gradient header with branding
 * - Route definitions for Home and Lesson pages
 *
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">
            Cloud Designs React Learning Platform
          </h1>
          <div className="header-tagline">
            <span>Learn • Practice • Master</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<Lesson />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
