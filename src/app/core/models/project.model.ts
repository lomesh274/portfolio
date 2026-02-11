export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  screenshots: string[];
  techStack: string[];
  category: 'angular' | 'react' | 'fullstack';
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  problemStatement: string;
  architecture: string;
  challenges: string[];
  solutions: string[];
  results: string;
  completedDate: string;
}

export interface ProjectFilter {
  category: 'all' | 'angular' | 'react' | 'fullstack';
  searchTerm: string;
}
