export interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  published: boolean;
  createdAt: Date;
  updatedAt?: Date;
  featured?: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
  category?: 'angular' | 'react' | 'fullstack' | 'other';
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
  technologies?: string[];
  startDate: Date;
  endDate?: Date;
  current: boolean;
  location?: string;
}
