# React Learning Platform

A comprehensive, interactive React learning platform with a built-in code editor, real-time testing, and progress tracking. Designed for developers learning React fundamentals through hands-on practice.

## Features

### Interactive Learning
- **6 comprehensive lessons** covering React fundamentals to advanced concepts
- **Theory-Practice approach** with explanations, examples, and hands-on exercises
- **Real-time code testing** with automated validation and immediate feedback
- **Progress tracking** with localStorage persistence across sessions

### Built-in IDE Experience
- **Syntax highlighting** powered by PrismJS
- **Code editor** with React JSX support
- **Live error detection** via Babel transformation
- **Reset and solution reveal** functionality for exercises

### Modern UI/UX
- **Professional dark theme** with CSS custom properties
- **Fully responsive** mobile-first design
- **Touch-friendly** interface for mobile learning
- **Celebration animations** with confetti on success
- **Accessible** with ARIA attributes and keyboard navigation

## Lesson Content

| # | Title | Difficulty | Topics Covered |
|---|-------|------------|----------------|
| 1 | Creating Components | Beginner | Functional components, JSX, component structure |
| 2 | Using State with useState | Beginner | useState hook, state updates, re-rendering |
| 3 | Props and Component Communication | Beginner | Props, prop drilling, callbacks, render props |
| 4 | Side Effects with useEffect | Intermediate | useEffect, dependencies, cleanup, data fetching |
| 5 | Context API & useContext | Intermediate | Context creation, providers, consumers |
| 6 | Event Handling & Forms | Beginner | Controlled components, form validation, events |

Each lesson includes:
- **Theory tab** - Clear explanations with code examples
- **Example tab** - Working code demonstrations
- **Exercises tab** - Multiple hands-on coding challenges with tests
- **Quiz tab** - Multiple choice knowledge checks with explanations

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm test` | Launch test runner in watch mode |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to GitHub Pages |

## Project Structure

```
src/
├── components/
│   ├── Home.js           # Lesson dashboard with progress tracking
│   ├── Home.css          # Home component styles
│   ├── Home.test.js      # Home component tests
│   ├── Lesson.js         # Individual lesson interface
│   ├── Lesson.css        # Lesson component styles
│   ├── Lesson.test.js    # Lesson component tests
│   ├── CodeTester.js     # Code testing and validation
│   ├── CodeTester.css    # CodeTester styles
│   └── CodeTester.test.js # CodeTester tests
├── data/
│   └── lessons.js        # Lesson content, exercises, and tests
├── styles/
│   ├── App.css           # Application-level styles
│   └── index.css         # Global styles and CSS variables
├── App.js                # Main application component
├── App.test.js           # App component tests
└── index.js              # Application entry point
```

## Architecture

### Component Hierarchy
```
App
├── Header (app branding)
└── Routes
    ├── Home (lesson dashboard)
    │   └── LessonCard[] (lesson previews)
    └── Lesson (lesson interface)
        ├── TabNavigation
        ├── TheoryPanel
        ├── ExamplePanel
        ├── ExercisesPanel
        │   ├── ExerciseSelector
        │   ├── CodeEditor
        │   └── CodeTester
        └── QuizPanel
            └── QuizQuestion[]
```

### State Management
- **Local component state** via React hooks (useState, useEffect)
- **Progress persistence** via localStorage
- **URL-based routing** via React Router (HashRouter for GitHub Pages)

### Styling Approach
- **CSS custom properties** for theming (dark/light mode support)
- **BEM-like naming** for component styles
- **Mobile-first responsive** design with breakpoints at 768px and 480px
- **Reduced motion** support for accessibility

## Testing

The project includes comprehensive unit tests using:
- **React Testing Library** for component testing
- **Jest** as the test runner

Run tests:
```bash
npm test
```

Test coverage includes:
- Component rendering
- User interactions
- Routing behavior
- localStorage integration
- Accessibility compliance

## Code Quality

### Standards Applied
- **PropTypes** for runtime type checking
- **JSDoc comments** for documentation
- **ESLint** for code linting
- **Consistent code style** throughout

### Performance Optimizations
- **React.memo** for component memoization
- **useCallback** for stable function references
- **useMemo** for expensive computations
- **Conditional rendering** to minimize DOM updates

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will:
1. Build the production bundle
2. Deploy to the `gh-pages` branch

**Live URL:** https://sent1nel101.github.io/ReactStudyTool

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write tests for new components
- Follow existing code style and patterns
- Update documentation as needed
- Ensure accessibility compliance

## Known Limitations

- Code execution uses string matching for tests (not actual execution)
- Single-user experience (no backend/authentication)
- Lessons 4-6 have limited exercises (content expansion planned)

## Roadmap

- [ ] Add more lessons (custom hooks, performance, testing)
- [ ] Implement theme toggle UI
- [ ] Add TypeScript support
- [ ] Create achievement/badge system
- [ ] Add code sharing functionality

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Syntax highlighting by [PrismJS](https://prismjs.com/)
- Code editor by [@uiw/react-textarea-code-editor](https://github.com/uiwjs/react-textarea-code-editor)
- Confetti animations by [canvas-confetti](https://github.com/catdad/canvas-confetti)

---

**Happy Learning!** Start building amazing React applications today.
