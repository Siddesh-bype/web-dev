# AIForge Platform Website

A modern, responsive website for an AI agent company built with vanilla HTML, CSS, and JavaScript.

## Features

- **Hero Section**: Eye-catching landing area with animated demo window
- **Services/Products**: Showcase of AI platform features with interactive cards
- **Interactive Demo**: Live AI agent configuration and testing interface
- **Pricing Plans**: Tiered pricing with monthly/annual toggle
- **Contact Form**: Advanced validation with auto-save functionality
- **Blog/Resources**: Full-featured blog with articles and sidebar
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern Animations**: Smooth scroll effects and micro-interactions
- **Accessibility**: Semantic HTML and ARIA labels

## Technology Stack

- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern features including Grid, Flexbox, and Custom Properties
- **JavaScript ES6+**: Vanilla JS with modern features
- **No Frameworks**: Pure HTML/CSS/JS for maximum performance

## File Structure

```
ai-platform-website/
├── index.html                 # Main landing page
├── assets/
│   ├── css/
│   │   ├── main.css          # Main styles and variables
│   │   ├── components.css    # Reusable component styles
│   │   ├── responsive.css    # Mobile-first responsive design
│   │   └── blog.css          # Blog-specific styles
│   ├── js/
│   │   ├── main.js          # Core functionality
│   │   ├── demo.js          # Interactive demo features
│   │   └── contact.js       # Contact form handling
│   ├── images/              # Image assets
│   └── icons/               # Icon assets
├── pages/
│   └── blog.html           # Blog page with full articles
└── data/
    └── blog-posts.json     # Blog content data
```

## Key Features

### Navigation
- Fixed header with scroll effects
- Smooth scrolling to sections
- Mobile-responsive hamburger menu
- Active state indicators

### Hero Section
- Gradient background with subtle animations
- Interactive demo window
- Trust badges and social proof
- Call-to-action buttons

### Features Grid
- Responsive card layout
- Hover effects and animations
- Icon-based visual hierarchy
- "Learn More" links

### Interactive Demo
- Real-time agent configuration
- Live chat interface
- Typing indicators
- Contextual responses

### Pricing Section
- Three-tier pricing structure
- Monthly/annual toggle
- Featured plan highlighting
- Feature comparison lists

### Contact Form
- Advanced field validation
- Auto-save functionality
- Loading states
- Success/error handling

### Blog System
- Full article layouts
- Sidebar with widgets
- Category and tag systems
- Search functionality

## Responsive Breakpoints

- **Mobile**: 320px - 479px
- **Small**: 480px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large**: 1280px+

## Performance Features

- Optimized CSS with custom properties
- Lazy loading ready
- Efficient JavaScript with debouncing
- Minimal dependencies
- Fast animations with CSS transforms

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Getting Started

1. Clone or download the files
2. Open `index.html` in your browser
3. No build process required - it's ready to use!

## Customization

### Colors
Edit the CSS custom properties in `main.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #22d3ee;
  --text-primary: #1f2937;
  /* ... */
}
```

### Fonts
Replace the Google Fonts link in the HTML head section.

### Content
Update the text content directly in the HTML files.

## Deployment

This website can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact the development team or open an issue in the repository.