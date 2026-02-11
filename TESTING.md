# Testing Guide

This guide covers testing strategies for your Angular 18 portfolio application.

## 🧪 Testing Stack Overview

### Built-in Testing Tools
- **Jest**: Unit testing framework
- **Angular Testing Utilities**: Component testing helpers
- **TestBed**: Angular's testing environment
- **HttpClientTestingModule**: HTTP request testing

### Recommended Additional Tools
- **Cypress**: End-to-end testing
- **Playwright**: E2E testing with better performance
- **Testing Library**: User-centric testing approach

## 🔬 Unit Testing

### Component Testing Example

#### Testing Home Component
```typescript
// src/app/features/home/components/home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero section', () => {
    const heroElement = fixture.debugElement.query(By.css('.hero-section'));
    expect(heroElement).toBeTruthy();
  });

  it('should display skills tabs', () => {
    const tabsElement = fixture.debugElement.query(By.css('mat-tab-group'));
    expect(tabsElement).toBeTruthy();
  });

  it('should display featured projects', () => {
    const projectsElement = fixture.debugElement.query(By.css('.featured-projects'));
    expect(projectsElement).toBeTruthy();
  });
});
```

#### Testing Projects Component
```typescript
// src/app/features/projects/components/projects.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from '../../../core/services/projects.service';
import { of } from 'rxjs';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockProjectsService: jasmine.SpyObj<ProjectsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProjectsService', ['getProjects', 'getFilteredProjects']);
    
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: ProjectsService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    mockProjectsService = TestBed.inject(ProjectsService) as jasmine.SpyObj<ProjectsService>;
    
    mockProjectsService.getProjects.and.returnValue([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter projects by category', () => {
    component.onCategoryChange('angular');
    expect(component.filter().category).toBe('angular');
  });

  it('should filter projects by search term', () => {
    const mockEvent = { target: { value: 'test search' } } as unknown as Event;
    component.onSearchChange(mockEvent);
    expect(component.filter().searchTerm).toBe('test search');
  });

  it('should clear all filters', () => {
    component.clearFilters();
    expect(component.filter()).toEqual({
      category: 'all',
      searchTerm: ''
    });
  });
});
```

### Service Testing

#### Testing Projects Service
```typescript
// src/app/core/services/projects.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project.model';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all projects', () => {
    const projects = service.getProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty('id');
    expect(projects[0]).toHaveProperty('title');
    expect(projects[0]).toHaveProperty('category');
  });

  it('should filter projects by category', () => {
    const filter = { category: 'angular', searchTerm: '' };
    const filteredProjects = service.getFilteredProjects(filter);
    
    filteredProjects.forEach(project => {
      expect(project.category).toBe('angular');
    });
  });

  it('should filter projects by search term', () => {
    const filter = { category: 'all', searchTerm: 'angular' };
    const filteredProjects = service.getFilteredProjects(filter);
    
    filteredProjects.forEach(project => {
      expect(
        project.title.toLowerCase().includes('angular') ||
        project.description.toLowerCase().includes('angular')
      ).toBeTrue();
    });
  });

  it('should get project by id', () => {
    const projects = service.getProjects();
    const firstProject = projects[0];
    const foundProject = service.getProjectById(firstProject.id);
    
    expect(foundProject).toEqual(firstProject);
  });

  it('should return undefined for non-existent project', () => {
    const foundProject = service.getProjectById('non-existent-id');
    expect(foundProject).toBeUndefined();
  });
});
```

#### Testing Theme Service
```typescript
// src/app/core/services/theme.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { PLATFORM_ID } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    
    service = TestBed.inject(ThemeService);
    localStorageSpy = spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light theme', () => {
    expect(service.currentTheme()).toBe('light');
  });

  it('should toggle theme', () => {
    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
  });

  it('should set theme', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
  });

  it('should get stored theme', () => {
    localStorageSpy.and.returnValue('dark');
    const newService = new ThemeService({} as any, TestBed.inject(PLATFORM_ID));
    expect(newService.currentTheme()).toBe('dark');
  });
});
```

## 🎭 Integration Testing

### Testing Navigation
```typescript
// src/app/app.routes.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './features/home/components/home.component';
import { ProjectsComponent } from './features/projects/components/projects.component';

describe('Router', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HomeComponent,
        ProjectsComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to home', async () => {
    await router.navigate(['/home']);
    expect(location.path()).toBe('/home');
  });

  it('should navigate to projects', async () => {
    await router.navigate(['/projects']);
    expect(location.path()).toBe('/projects');
  });

  it('should redirect empty path to home', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/home');
  });
});
```

## 🌐 End-to-End Testing

### Cypress Tests
```typescript
// cypress/e2e/navigation.cy.ts
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to home page', () => {
    cy.url().should('include', '/home');
    cy.contains('Lomesh Yadav').should('be.visible');
  });

  it('should navigate to projects page', () => {
    cy.get('a[href="/projects"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Projects').should('be.visible');
  });

  it('should navigate to resume page', () => {
    cy.get('a[href="/resume"]').click();
    cy.url().should('include', '/resume');
    cy.contains('Resume').should('be.visible');
  });

  it('should navigate to contact page', () => {
    cy.get('a[href="/contact"]').click();
    cy.url().should('include', '/contact');
    cy.contains('Contact').should('be.visible');
  });

  it('should toggle theme', () => {
    cy.get('.theme-toggle').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    
    cy.get('.theme-toggle').click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });
});
```

### Contact Form Tests
```typescript
// cypress/e2e/contact-form.cy.ts
describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should show validation errors for empty form', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('[formcontrolname="name"]')
      .should('have.class', 'mat-mdc-form-field-invalid');
    
    cy.get('[formcontrolname="email"]')
      .should('have.class', 'mat-mdc-form-field-invalid');
    
    cy.get('[formcontrolname="message"]')
      .should('have.class', 'mat-mdc-form-field-invalid');
  });

  it('should validate email format', () => {
    cy.get('[formcontrolname="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    
    cy.get('[formcontrolname="email"]')
      .should('have.class', 'mat-mdc-form-field-invalid');
  });

  it('should submit valid form', () => {
    cy.get('[formcontrolname="name"]').type('Lomesh Yadav');
    cy.get('[formcontrolname="email"]').type('john@example.com');
    cy.get('[formcontrolname="message"]').type('Test message');
    
    cy.get('button[type="submit"]').click();
    
    // Check for success message or snackbar
    cy.get('.mat-mdc-snack-bar-container').should('be.visible');
  });
});
```

## 📱 Responsive Testing

### Viewport Testing
```typescript
// cypress/e2e/responsive.cy.ts
describe('Responsive Design', () => {
  const viewports = [
    { width: 375, height: 667, name: 'Mobile' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1920, height: 1080, name: 'Desktop' }
  ];

  viewports.forEach(viewport => {
    context(viewport.name, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
      });

      it('should display navigation properly', () => {
        if (viewport.width < 768) {
          cy.get('.mobile-menu-toggle').should('be.visible');
          cy.get('.desktop-nav').should('not.be.visible');
        } else {
          cy.get('.desktop-nav').should('be.visible');
          cy.get('.mobile-menu-toggle').should('not.be.visible');
        }
      });

      it('should display content properly', () => {
        cy.get('.hero-section').should('be.visible');
        cy.get('.skills-section').should('be.visible');
        cy.get('.experience-section').should('be.visible');
      });
    });
  });
});
```

## 🔧 Testing Configuration

### Jest Configuration
```json
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Test Setup
```typescript
// src/setup-jest.ts
import 'jest-preset-angular/setup-jest';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## 📊 Coverage Reports

### Running Tests with Coverage
```bash
# Run all tests with coverage
npm run test:coverage

# Run specific test file with coverage
npm run test:coverage -- --testPathPattern=projects.component.spec.ts

# Generate HTML coverage report
npm run test:coverage:html
```

### Coverage Thresholds
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## 🚀 Performance Testing

### Lighthouse CI
```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4200'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

## 🎯 Best Practices

### Testing Guidelines
1. **Test user behavior, not implementation**
2. **Use descriptive test names**
3. **Arrange, Act, Assert pattern**
4. **Mock external dependencies**
5. **Test edge cases**
6. **Keep tests independent**
7. **Use meaningful assertions**

### Test Organization
```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── theme.service.ts
│   │   │   └── theme.service.spec.ts
│   │   └── ...
│   ├── features/
│   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── home.component.ts
│   │   │   │   └── home.component.spec.ts
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── support/
│   └── tsconfig.json
└── jest.config.js
```

## 🔄 Continuous Testing

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run unit tests
      run: npm run test:ci
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
```

---

## 🎉 Testing Complete!

With this comprehensive testing setup, your Angular 18 portfolio will be robust, reliable, and maintainable. Happy testing! 🧪
