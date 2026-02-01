# Campay AI - Landing Page

A modern, responsive landing page for Campay AI, an intelligent automation platform for developers. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Hero Section** - Animated landing with code snippet preview
- **Features Showcase** - Grid of key capabilities with hover effects
- **How It Works** - Step-by-step workflow explanation
- **Live Demo** - Interactive AI chat interface simulation
- **Pricing Plans** - Three-tier pricing with monthly/annual toggle
- **Testimonials** - Social proof from developers
- **Responsive Design** - Works on all screen sizes

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and responsive design
- **Framer Motion** - Animations and transitions
- **Lucide React** - Icon library

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design System

### Color Palette

- **Background**: #0a0a0a (dark-bg)
- **Card**: #1a1a1a (dark-card)
- **Neon Cyan**: #00f5ff
- **Neon Magenta**: #ff00ff
- **Neon Purple**: #8b5cf6
- **Neon Blue**: #3b82f6

### Components

- **Glass Card** - Frosted glass effect with backdrop blur
- **Neon Border** - Glowing border effect
- **Gradient Text** - Animated gradient text effect
- **Floating Animation** - Subtle floating animation

## Project Structure

```
campay-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── LiveDemo.jsx
│   │   ├── Pricing.jsx
│   │   ├── Testimonials.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  neon: {
    cyan: '#00f5ff',
    magenta: '#ff00ff',
    purple: '#8b5cf6',
    blue: '#3b82f6',
  },
  dark: {
    bg: '#0a0a0a',
    card: '#1a1a1a',
    border: '#2a2a2a',
  },
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import it in `src/App.jsx`
3. Add it to the main component tree

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
