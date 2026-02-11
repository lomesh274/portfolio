import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectsService } from '../../../core/services/projects.service';
import { Experience } from '../../../core/models/experience.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredProjects = this.projectsService.getFeaturedProjects();
  
  experiences: Experience[] = [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      current: true,
      description: [
        'Lead development of enterprise web applications using Angular and React',
        'Architect scalable microservices solutions with Node.js and TypeScript',
        'Mentor junior developers and conduct code reviews',
        'Implement CI/CD pipelines and improve deployment processes'
      ],
      technologies: ['Angular', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker']
    },
    {
      id: '2',
      company: 'Digital Innovations Ltd.',
      position: 'Frontend Developer',
      location: 'Austin, TX',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: [
        'Developed responsive web applications using Angular and modern JavaScript',
        'Collaborated with UX team to implement pixel-perfect designs',
        'Optimized application performance resulting in 40% faster load times',
        'Integrated RESTful APIs and implemented state management solutions'
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SCSS', 'Jest']
    }
  ];

  skills = {
    frontend: ['Angular', 'React', 'TypeScript', 'HTML5', 'CSS3', 'SCSS', 'JavaScript ES6+'],
    backend: ['Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'],
    tools: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Webpack', 'Vite']
  };

  constructor(private projectsService: ProjectsService) {}
}
