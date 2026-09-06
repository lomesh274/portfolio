export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: 'angular' | 'react' | 'frontend' | 'tools';
  icon: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'angular' | 'react' | 'fullstack';
  tags: string[];
  imageUrl: string;
  fallbackImageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  highlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  score?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    yearsOfExperience: string;
    experienceHighlight: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    availability: string;
    avatarUrl: string;
    resumeUrl: string;
    github: string;
    linkedin: string;
    website: string;
  };
  stats: { label: string; value: string; icon: string }[];
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: 'Lomesh Yadav',
    title: 'Frontend Engineer | Angular & React Specialist',
    yearsOfExperience: '3.10 Years',
    experienceHighlight: '3+ Years Professional Experience',
    email: 'lomeshyadav101@gmail.com',
    phone: '+91 9340757610',
    location: 'Indore, India',
    website: 'https://thegm10.com',
    bio: 'Frontend Engineer with 3+ years building scalable web applications, primarily in Angular with growing hands-on experience in React. Delivered features across a product-based ITSM platform and a client HRMS system, covering component architecture, state management, and API integration. Comfortable using AI-assisted tools like Cursor to move faster without cutting corners on code quality.',
    availability: 'Open for Frontend Engineer & Angular Roles',
    avatarUrl: 'assets/images/lomesh-avatar.jpg',
    resumeUrl: '#resume',
    github: 'https://github.com/lomesh01',
    linkedin: 'https://www.linkedin.com/in/lomesh-yadav-b815b4219/',
  },
  stats: [
    { label: 'Years Experience', value: '3.10', icon: 'badge' },
    { label: 'Projects Delivered', value: '3 Major', icon: 'code' },
    { label: 'Core Stack', value: 'Angular/React', icon: 'bolt' },
    { label: 'Degree', value: 'B.Tech CS', icon: 'graduation' }
  ],
  skills: [
    // Angular Core
    { name: 'Angular (v14 - v20)', level: 95, category: 'angular', icon: 'fa-brands fa-angular', featured: true },
    { name: 'Micro Frontend Architecture (Module Federation)', level: 92, category: 'angular', icon: 'fa-solid fa-cubes-stacked', featured: true },
    { name: 'RxJS & NgRx State Management', level: 90, category: 'angular', icon: 'fa-solid fa-infinity', featured: true },
    { name: 'Angular Material & PrimeNG', level: 90, category: 'angular', icon: 'fa-solid fa-layer-group', featured: true },

    // React
    { name: 'React (Hooks & Component UI)', level: 88, category: 'react', icon: 'fa-brands fa-react', featured: true },

    // Frontend Core
    { name: 'TypeScript & JavaScript (ES6+)', level: 95, category: 'frontend', icon: 'fa-brands fa-js', featured: true },
    { name: 'Chart.js & Data Visualization', level: 90, category: 'frontend', icon: 'fa-solid fa-chart-line', featured: true },
    { name: 'REST APIs & GraphQL Integration', level: 92, category: 'frontend', icon: 'fa-solid fa-network-wired', featured: true },
    { name: 'Firebase Authentication', level: 88, category: 'frontend', icon: 'fa-solid fa-fire', featured: true },
    { name: 'Responsive UI Design & Performance', level: 94, category: 'frontend', icon: 'fa-solid fa-gauge-high', featured: true },

    // Tools & AI
    { name: 'Cursor AI-Assisted Dev', level: 95, category: 'tools', icon: 'fa-solid fa-wand-magic-sparkles', featured: true },
    { name: 'Git, GitLab & Jira', level: 90, category: 'tools', icon: 'fa-brands fa-git-alt', featured: true },
    { name: 'Agile & Scrum Methodologies', level: 92, category: 'tools', icon: 'fa-solid fa-arrows-spin', featured: true }
  ],
  projects: [
    {
      id: 'the-gm10',
      title: 'The GM10 Dashboard & Prototyping Platform',
      shortDescription: 'Dashboard-driven UI with chart data visualization and React component prototyping.',
      fullDescription: 'Architected and delivered The GM10 dashboard featuring real-time chart data visualization using Chart.js. Explored React for component-level prototyping, optimized video loading performance, and improved overall user interface responsiveness.',
      category: 'angular',
      tags: ['Angular', 'React', 'Chart.js', 'Video Optimization', 'Dashboard UI'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      fallbackImageUrl: 'assets/images/project-ai-dashboard.jpg',
      demoUrl: 'https://thegm10.com',
      metrics: [
        { label: 'Platform', value: 'thegm10.com' },
        { label: 'Charts', value: 'Chart.js' },
        { label: 'UX Perf', value: 'Optimized' }
      ],
      highlights: [
        'Built a dashboard-driven UI with chart-based data visualization.',
        'Explored React for component-level prototyping and UI comparison.',
        'Improved video loading performance and overall UI responsiveness.'
      ]
    },
    {
      id: 'live-traders',
      title: 'Live Traders Authentication & Video Hub',
      shortDescription: 'Trading platform UI with Firebase Authentication and YouTube API integration.',
      fullDescription: 'Developed authentication-based user interface flows for Live Traders. Integrated Firebase Authentication for secure user sign-in and embedded YouTube API for dynamic video content rendering.',
      category: 'angular',
      tags: ['Angular', 'Firebase Auth', 'YouTube API', 'User Authentication', 'RxJS'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      fallbackImageUrl: 'assets/images/project-ecommerce.jpg',
      demoUrl: 'https://livetraders.com',
      metrics: [
        { label: 'Platform', value: 'livetraders.com' },
        { label: 'Auth', value: 'Firebase' },
        { label: 'API', value: 'YouTube' }
      ],
      highlights: [
        'Developed authentication-based UI flows for secure user access.',
        'Integrated YouTube API for dynamic video stream embedding.',
        'Implemented Firebase Authentication with RxJS async state management.'
      ]
    },
    {
      id: 'fvrd-tv',
      title: 'FVRD TV Media Platform',
      shortDescription: 'Responsive media platform with GraphQL APIs for dynamic data rendering.',
      fullDescription: 'Engineered responsive UI components for FVRD TV. Integrated GraphQL APIs to fetch and dynamically render video and media catalogs smoothly across all screen sizes.',
      category: 'fullstack',
      tags: ['Angular', 'GraphQL API', 'Responsive UI', 'Media Streaming'],
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      fallbackImageUrl: 'assets/images/project-ai-dashboard.jpg',
      demoUrl: 'https://fvrdtv.com',
      metrics: [
        { label: 'Platform', value: 'fvrdtv.com' },
        { label: 'API', value: 'GraphQL' },
        { label: 'Design', value: 'Responsive' }
      ],
      highlights: [
        'Created modular responsive UI components for seamless media browsing.',
        'Integrated GraphQL APIs for dynamic, client-side data rendering.'
      ]
    }
  ],
  experiences: [
    {
      id: 'visionwaves',
      role: 'Frontend Engineer',
      company: 'VisionWaves',
      location: 'Indore, India',
      period: 'Feb 2026 - Present',
      type: 'Full-time',
      description: 'Building and maintaining product-based ITSM application modules for service and workflow management, while contributing to a client HRMS system covering employee and payroll modules.',
      achievements: [
        'Build and maintain ITSM modules for service and workflow management.',
        'Contribute to HRMS client project covering employee and payroll modules.',
        'Built reusable Angular components, reducing duplicate code and speeding up new feature development.',
        'Worked on splitting ITSM modules into Angular micro frontends (Module Federation) to enable independent builds and deployments across teams.',
        'Prototyped select UI pieces in React to compare component patterns with Angular for upcoming migrations.',
        'Utilize Cursor AI tool to speed up repetitive coding tasks, freeing up time for core logic and edge-case handling.',
        'Integrated REST APIs and improved page load performance and responsiveness.'
      ],
      technologies: ['Angular 20', 'Micro Frontends', 'Module Federation', 'RxJS', 'React', 'REST APIs', 'Cursor AI']
    },
    {
      id: 'productiva',
      role: 'UI Developer',
      company: 'Productiva IT Solutions',
      location: 'Indore, India',
      period: 'May 2025 - Jul 2025',
      type: 'Full-time',
      description: 'Developed Angular features and enhanced UI responsiveness across enterprise modules.',
      achievements: [
        'Developed Angular features and improved UI responsiveness across multiple modules.',
        'Used RxJS to manage async data flows and state updates efficiently.',
        'Integrated third-party APIs to power data-driven UI functionality.'
      ],
      technologies: ['Angular', 'RxJS', 'REST APIs', 'TypeScript', 'SCSS', 'HTML5']
    },
    {
      id: 'ideal-it',
      role: 'Software Developer',
      company: 'Ideal IT Techno Pvt. Ltd.',
      location: 'Indore, India',
      period: 'Mar 2022 - Mar 2025',
      type: 'Full-time',
      description: 'Built and maintained Angular applications using a modular, component-based architecture and custom data visualizations.',
      achievements: [
        'Built and maintained Angular applications using a modular, component-based architecture.',
        'Developed dashboards and data visualizations using Chart.js.',
        'Debugged and resolved production issues, improving stability of existing features.'
      ],
      technologies: ['Angular', 'Chart.js', 'JavaScript', 'TypeScript', 'HTML5/CSS3', 'Git']
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'RGPV, Bhopal',
      year: '2021',
      score: 'Graduated'
    }
  ]
};
