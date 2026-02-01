# AGENTS.md - Agent Coding Guidelines

## Build, Lint, and Test Commands

### Core Commands
- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Production build (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Testing Commands
- `npm test` - Run all tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI interface
- `npm run test:coverage` - Generate coverage report
- `npm test -- --run` - Run tests once (CI mode)
- `npm test -- src/test/Integrations.test.jsx` - Run single test file
- `npm test -- -t "renders integration cards"` - Run specific test by name

### Quick Fixes
- After modifying context files, run `npm run build` to verify imports
- Always run `npm run lint` before committing changes
- Use `npm test -- --run` for faster feedback during development

## Project Overview

### Tech Stack
React 19 + Vite 7, Tailwind CSS 4, Framer Motion 12, Zustand 5, SWR, Vitest, Lucide React

### Directory Structure
```
src/
├── components/        # React components (PascalCase files)
├── context/          # Context providers (separate .js files for contexts)
├── hooks/            # Custom hooks (use*.js pattern)
├── store/            # Zustand state management
├── constants/        # Application constants
└── test/             # Test files (*.test.jsx)
```

## Code Style Guidelines

### Import Organization
```jsx
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
```

### Naming Conventions
- **Components**: PascalCase (e.g., `Hero.jsx`)
- **Functions**: camelCase (e.g., `handleClick`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `THEME_CONSTANTS`)
- **Custom Hooks**: `use*` pattern (e.g., `useTheme`)
- **Context Files**: kebab-case (e.g., `theme-context.js`)

### Component Patterns
```jsx
export default function Hero() {
  const [state, setState] = useState(initialValue)
  return <section className="relative min-h-screen">{children}</section>
}
```

### State Management
```jsx
// Component: useState
const [isOpen, setIsOpen] = useState(false)
// Global: Zustand
const { theme, setTheme } = useStore()
// Data: SWR
const { data, error, isLoading } = useWorkflows()
```

### Critical Context Pattern
```jsx
// Create separate context file (theme-context.js)
export const ThemeContext = createContext(null)
// Provider imports context
import { ThemeContext } from './theme-context'
// Custom hook in hooks/useTheme.js
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

### Styling & Icons
```jsx
// Tailwind classes
className="flex items-center justify-between p-4"
// Framer Motion
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
// Icons (Discord unavailable - use MessageCircle)
import { Zap, MessageCircle } from 'lucide-react'
```

### Error Handling & Hooks
```jsx
// Error boundaries
<ErrorBoundary fallback={<ErrorFallback />}><Component /></ErrorBoundary>
// useCallback for stability
const handleClick = useCallback(() => {}, [dependency])
// Avoid setState in effects (use setTimeout)
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme)
  setTimeout(() => setState(value), 0)
}, [theme])
```

### Testing
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
})
```

## Important Notes

### Icon Availability
- Discord icon NOT available in lucide-react
- Use `MessageCircle` for Discord/social messaging
- Always verify icon availability before importing

### Build Requirements
- Context files must be separate (.js files) for React Fast Refresh
- Export contexts using `export const ContextName = createContext()`
- Import contexts in provider files only
- Custom hooks import from context files, not provider files

### Linting Rules
- Unused variables must match `^[A-Z_]|motion` pattern
- No unused imports (remove or prefix with `_`)
- Avoid console.error (use error boundaries instead)

### Git Workflow
1. Create feature branch
2. Make changes with `npm run lint` passing
3. Run `npm test -- --run` to verify
4. Build with `npm run build` to confirm
5. Commit with descriptive message
6. Push and create PR

## Common Patterns

### Data Fetching
```jsx
const { data, error, isLoading } = useWorkflows()
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage />
return <Component data={data} />
```

### Conditional Rendering
```jsx
{isLoading && <LoadingSpinner />}
{isLoggedIn ? <Dashboard /> : <Login />}
if (!data?.length) return <EmptyState />
```

Update this file when patterns emerge or conventions change.