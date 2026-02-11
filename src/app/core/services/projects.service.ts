import { Injectable, signal } from '@angular/core';
import { Project, ProjectFilter } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects = signal<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with Angular and Node.js',
      longDescription: 'A full-featured e-commerce platform built with Angular 18, featuring product catalog, shopping cart, payment integration, and admin dashboard.',
      imageUrl: '/assets/images/projects/ecommerce-thumb.jpg',
      screenshots: [
        '/assets/images/projects/ecommerce-1.jpg',
        '/assets/images/projects/ecommerce-2.jpg',
        '/assets/images/projects/ecommerce-3.jpg'
      ],
      techStack: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API'],
      category: 'fullstack',
      githubUrl: 'https://github.com/username/ecommerce-platform',
      liveDemoUrl: 'https://ecommerce-demo.com',
      featured: true,
      problemStatement: 'Create a scalable e-commerce platform with modern UX and seamless payment integration',
      architecture: 'Microservices architecture with Angular frontend, Node.js/Express backend, MongoDB database, and Stripe for payment processing',
      challenges: [
        'Implementing real-time inventory management',
        'Optimizing performance for large product catalogs',
        'Ensuring secure payment processing'
      ],
      solutions: [
        'Used WebSocket for real-time updates',
        'Implemented lazy loading and virtual scrolling',
        'Integrated Stripe with proper security measures'
      ],
      results: 'Successfully deployed platform handling 10k+ daily visitors with 99.9% uptime',
      completedDate: '2024-01'
    },
    {
      id: '2',
      title: 'Task Management Dashboard',
      description: 'React-based project management tool with real-time collaboration',
      longDescription: 'A comprehensive task management application built with React 18, featuring real-time collaboration, drag-and-drop functionality, and advanced analytics.',
      imageUrl: '/assets/images/projects/taskmanager-thumb.jpg',
      screenshots: [
        '/assets/images/projects/taskmanager-1.jpg',
        '/assets/images/projects/taskmanager-2.jpg'
      ],
      techStack: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'Redux Toolkit'],
      category: 'react',
      githubUrl: 'https://github.com/username/task-manager',
      liveDemoUrl: 'https://taskmanager-demo.com',
      featured: true,
      problemStatement: 'Build a collaborative project management tool for distributed teams',
      architecture: 'SPA with React frontend, Firebase for real-time backend, Redux for state management',
      challenges: [
        'Real-time synchronization across multiple users',
        'Complex drag-and-drop functionality',
        'Performance optimization for large datasets'
      ],
      solutions: [
        'Implemented Firebase real-time database with optimistic updates',
        'Used react-beautiful-dnd for smooth drag-and-drop',
        'Applied virtualization and memoization techniques'
      ],
      results: 'Adopted by 500+ teams with 95% user satisfaction rating',
      completedDate: '2023-11'
    },
    {
      id: '3',
      title: 'Weather Analytics Dashboard',
      description: 'Angular weather app with data visualization and forecasting',
      longDescription: 'A sophisticated weather application built with Angular 18, featuring interactive weather maps, historical data analysis, and ML-powered forecasting.',
      imageUrl: '/assets/images/projects/weather-thumb.jpg',
      screenshots: [
        '/assets/images/projects/weather-1.jpg',
        '/assets/images/projects/weather-2.jpg',
        '/assets/images/projects/weather-3.jpg'
      ],
      techStack: ['Angular', 'TypeScript', 'D3.js', 'OpenWeather API', 'Chart.js'],
      category: 'angular',
      githubUrl: 'https://github.com/username/weather-dashboard',
      liveDemoUrl: 'https://weather-dashboard-demo.com',
      featured: false,
      problemStatement: 'Create an intuitive weather dashboard with advanced visualization and forecasting',
      architecture: 'Angular standalone components with reactive state management, D3.js for visualizations, and OpenWeather API integration',
      challenges: [
        'Complex data visualization requirements',
        'API rate limiting and caching',
        'Responsive design for complex charts'
      ],
      solutions: [
        'Implemented modular D3.js components',
        'Used local storage and service workers for caching',
        'Created responsive chart components with CSS Grid'
      ],
      results: 'Featured on Angular official blog with 50k+ monthly active users',
      completedDate: '2023-09'
    }
  ]);

  getProjects() {
    return this.projects;
  }

  getFeaturedProjects() {
    return this.projects().filter(project => project.featured);
  }

  getProjectById(id: string): Project | undefined {
    return this.projects().find(project => project.id === id);
  }

  getFilteredProjects(filter: ProjectFilter): Project[] {
    return this.projects().filter(project => {
      const matchesCategory = filter.category === 'all' || project.category === filter.category;
      const matchesSearch = project.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(filter.searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }

  getProjectsByCategory(category: 'angular' | 'react' | 'fullstack'): Project[] {
    return this.projects().filter(project => project.category === category);
  }
}
