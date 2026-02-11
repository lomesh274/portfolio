import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Experience, Education } from '../../../core/models/experience.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  professionalSummary = `Senior Full Stack Developer with 5+ years of experience building scalable web applications 
  using Angular, React, and Node.js. Passionate about creating clean, efficient code and exceptional user experiences. 
  Strong background in both frontend and backend development, with expertise in modern JavaScript frameworks, 
  cloud technologies, and agile methodologies.`;

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
        'Implement CI/CD pipelines and improve deployment processes',
        'Collaborate with product managers to define technical requirements',
        'Optimize application performance and implement best practices'
      ],
      technologies: ['Angular', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL']
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
        'Integrated RESTful APIs and implemented state management solutions',
        'Participated in agile development processes and code reviews'
      ],
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'SCSS', 'Jest', 'Webpack']
    },
    {
      id: '3',
      company: 'StartUp Ventures',
      position: 'Junior Developer',
      location: 'Seattle, WA',
      startDate: '2019-03',
      endDate: '2020-05',
      current: false,
      description: [
        'Developed and maintained web applications using React and Node.js',
        'Worked closely with senior developers to learn best practices',
        'Participated in all phases of the software development lifecycle',
        'Contributed to code reviews and team meetings'
      ],
      technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Git', 'HTML/CSS']
    }
  ];

  education: Education[] = [
    {
      id: '1',
      institution: 'University of Washington',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Seattle, WA',
      startDate: '2015-09',
      endDate: '2019-06',
      gpa: '3.8'
    },
    {
      id: '2',
      institution: 'Coding Bootcamp',
      degree: 'Full Stack Web Development',
      field: 'Web Development',
      location: 'Online',
      startDate: '2018-06',
      endDate: '2018-12'
    }
  ];

  skills = {
    frontend: {
      expert: ['Angular', 'React', 'TypeScript', 'HTML5', 'CSS3', 'SCSS'],
      proficient: ['Vue.js', 'JavaScript ES6+', 'Redux', 'NgRx', 'RxJS']
    },
    backend: {
      expert: ['Node.js', 'Express', 'TypeScript', 'REST APIs'],
      proficient: ['NestJS', 'GraphQL', 'MongoDB', 'PostgreSQL', 'MySQL']
    },
    tools: {
      expert: ['Git', 'Docker', 'AWS', 'CI/CD'],
      proficient: ['Jest', 'Webpack', 'Vite', 'Kubernetes', 'Terraform']
    }
  };

  certifications = [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-06',
      credentialId: 'AWS-ASA-123456'
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022-11',
      credentialId: 'GCP-PD-789012'
    }
  ];

  downloadResume(): void {
    // In a real application, this would link to an actual PDF file
    const link = document.createElement('a');
    link.href = '/assets/resume/john-doe-resume.pdf';
    link.download = 'john-doe-resume.pdf';
    link.click();
  }
}
