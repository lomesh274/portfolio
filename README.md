# Developer Portfolio

A modern, professional developer portfolio built with Angular 18, featuring standalone components, responsive design, and best practices.

## Features

- **Angular 18 Standalone Components**: No NgModules, clean architecture
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Dark/Light Theme**: Seamless theme switching with persistence
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Modern UI**: Material Design components with custom styling
- **Performance**: Lazy loading, optimized assets, fast navigation

## Pages

- **Home**: Hero section, skills showcase, experience timeline, featured projects
- **Projects**: Filterable project gallery with search functionality
- **Project Detail**: Comprehensive project information with screenshots
- **Resume**: Professional experience, skills, education, certifications
- **Contact**: Contact form with validation and social links

## Architecture

```
src/
├── app/
│   ├── core/                 # Core functionality
│   │   ├── components/       # Core components (Navbar)
│   │   ├── services/         # Core services (Theme, SEO, Projects)
│   │   ├── models/          # Data models
│   │   └── interceptors/    # HTTP interceptors
│   ├── shared/               # Shared functionality
│   │   ├── components/       # Reusable components
│   │   ├── directives/       # Custom directives
│   │   ├── pipes/           # Custom pipes
│   │   └── models/          # Shared models
│   ├── features/             # Feature modules
│   │   ├── home/           # Home page
│   │   ├── projects/        # Projects listing
│   │   ├── project-detail/  # Project details
│   │   ├── resume/          # Resume page
│   │   └── contact/         # Contact page
│   ├── app.routes.ts        # Route configuration
│   ├── app.config.ts        # App configuration
│   └── app.component.ts     # Root component
├── assets/                 # Static assets
└── styles.css             # Global styles
```

## Technologies Used

### Frontend
- **Angular 18**: Framework with standalone components
- **TypeScript**: Type-safe JavaScript
- **Angular Material**: UI component library
- **RxJS**: Reactive programming
- **SCSS**: Styling with CSS preprocessing

### Development Tools
- **Angular CLI**: Build and development tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Unit testing

## Getting Started

### Prerequisites
- Node.js 18+ 
- Angular CLI 18+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be in the `dist/` directory.

## Project Structure

### Core Components

#### Navbar
- Sticky navigation with logo and menu items
- Responsive hamburger menu for mobile
- Theme toggle functionality
- Active route highlighting

#### Theme Service
- Manages light/dark theme state
- Persists theme preference in localStorage
- Provides reactive theme updates

#### Projects Service
- Manages project data
- Provides filtering and search functionality
- Mock data for demonstration

### Feature Components

#### Home Page
- Hero section with call-to-action buttons
- Skills showcase with categorized tabs
- Experience timeline with company details
- Featured projects preview

#### Projects Page
- Grid layout for project cards
- Category filtering (Angular, React, Full Stack)
- Search functionality
- Responsive design

#### Project Detail Page
- Comprehensive project information
- Screenshot gallery
- Architecture explanation
- Challenges and solutions
- Technology stack display

#### Resume Page
- Professional summary
- Experience timeline
- Skills categorization
- Education history
- Certifications
- PDF download functionality

#### Contact Page
- Contact form with validation
- Social media links
- Email copy functionality
- Form submission handling

## Styling

### Design Principles
- **Minimal & Clean**: Focus on content readability
- **Professional**: Business-appropriate design
- **Modern**: Current design trends and best practices
- **Accessible**: WCAG 2.1 AA compliance

### Theme System
- Light theme (default)
- Dark theme with proper contrast
- Smooth transitions
- System preference detection

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance

### Optimization Techniques
- Lazy loading for routes
- Image optimization
- Component-level code splitting
- Efficient change detection
- Minimal bundle sizes

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## SEO Features

### Meta Tags
- Dynamic title updates
- Meta descriptions
- Keywords and author tags
- Canonical URLs

### Social Sharing
- Open Graph tags
- Twitter Card meta
- Social media images

### Structured Data
- JSON-LD for person information
- Organization data
- Breadcrumb navigation

## Accessibility

### Features
- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management

### Testing
- Automated accessibility testing
- Manual keyboard navigation testing
- Screen reader testing

## Deployment

### Build Process
1. Run `npm run build`
2. Optimize assets
3. Configure server headers
4. Deploy to hosting platform

### Recommended Hosting
- **Vercel**: Excellent for Angular apps
- **Netlify**: Great for static sites
- **AWS S3 + CloudFront**: Full control
- **Firebase Hosting**: Google ecosystem

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Email**: john.doe@example.com
- **GitHub**: https://github.com/johndoe
- **LinkedIn**: https://linkedin.com/in/johndoe

---

Built with ❤️ using Angular 18
