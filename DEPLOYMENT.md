# Deployment Guide

This guide covers deploying your Angular 18 portfolio to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify
```bash
# Build the project
npm run build

# Deploy dist/ folder to Netlify
# Drag and drop dist/ folder to Netlify dashboard
```

### 3. Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy --only hosting
```

## 📋 Pre-Deployment Checklist

### Build Optimization
- [ ] Run `npm run build` successfully
- [ ] Check bundle sizes are optimized
- [ ] Verify all routes work in production build
- [ ] Test on mobile devices
- [ ] Test dark/light theme functionality

### SEO & Performance
- [ ] Meta tags are properly set
- [ ] Open Graph tags work
- [ ] Sitemap is generated (if needed)
- [ ] Lighthouse scores are good (90+)

### Content Updates
- [ ] Update personal information (name, email, links)
- [ ] Replace placeholder images with real ones
- [ ] Update project descriptions
- [ ] Verify all external links work

## 🔧 Environment Configuration

### Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables
Create `.env.production`:
```env
# Add any production environment variables
# Example: API endpoints, analytics keys, etc.
```

## 🌐 Platform-Specific Configuration

### Vercel
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/portfolio/browser",
  "framework": "angular",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist/portfolio/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Firebase
Create `firebase.json`:
```json
{
  "hosting": {
    "public": "dist/portfolio/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 🎯 Custom Domain Setup

### Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Update DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records
4. Enable HTTPS

### Firebase
1. Go to Firebase Console → Hosting
2. Click "Connect domain"
3. Follow verification steps
4. Update DNS records

## 📊 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle sizes
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/portfolio/browser/stats.json
```

### Image Optimization
- Use WebP format for images
- Implement lazy loading
- Compress images before upload
- Use responsive images

### Caching Strategy
```typescript
// Add to app.config.ts for better caching
{
  provide: HTTP_INTERCEPTORS,
  useClass: CacheInterceptor,
  multi: true
}
```

## 🔍 SEO Enhancements

### Structured Data
Add JSON-LD to `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Lomesh Yadav",
  "jobTitle": "Full Stack Developer",
  "url": "https://yourdomain.com",
  "sameAs": [
    "https://linkedin.com/in/johndoe",
    "https://github.com/johndoe"
  ]
}
</script>
```

### Sitemap Generation
```bash
# Install sitemap generator
npm install sitemap --save-dev

# Create sitemap script
node scripts/generate-sitemap.js
```

## 🚨 Troubleshooting

### Common Issues

#### 404 Errors on Refresh
- Ensure server is configured for SPA routing
- Check redirect rules in platform configuration

#### White Screen on Mobile
- Check for console errors
- Verify CSS media queries
- Test with different devices

#### Slow Loading
- Analyze bundle sizes
- Implement code splitting
- Optimize images
- Enable compression

#### Theme Not Persisting
- Check localStorage availability
- Verify SSR compatibility
- Test in different browsers

### Debugging Production
```bash
# Build with source maps for debugging
npm run build -- --source-map

# Use Angular CLI for analysis
ng analyze
```

## 📈 Monitoring

### Analytics Integration
```typescript
// Add to app.config.ts
import { provideAnalytics } from '@angular/fire/analytics';

providers: [
  provideAnalytics(() => initializeAnalytics(app))
]
```

### Performance Monitoring
- Google PageSpeed Insights
- Lighthouse CI
- Web Vitals monitoring
- Error tracking (Sentry, etc.)

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📝 Post-Deployment

### Verification Checklist
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms work properly
- [ ] Mobile responsive
- [ ] SEO meta tags visible
- [ ] Analytics tracking active
- [ ] Custom domain working
- [ ] HTTPS enabled

### Performance Testing
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse audit

---

## 🎉 Success!

Your Angular 18 portfolio is now deployed and ready to showcase your work to the world! 🚀

For any issues or questions, refer to the troubleshooting section or check the Angular documentation.
