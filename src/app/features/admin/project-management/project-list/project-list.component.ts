import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  displayedColumns: string[] = ['title', 'description', 'technologies', 'actions'];
  
  projects = [
    {
      id: '1',
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Angular',
      technologies: 'Angular, TypeScript, SCSS'
    },
    {
      id: '2',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution',
      technologies: 'React, Node.js, MongoDB'
    }
  ];

  constructor() {}

  editProject(id: string): void {
    console.log('Edit project:', id);
  }

  deleteProject(id: string): void {
    console.log('Delete project:', id);
  }

  addProject(): void {
    console.log('Add new project');
  }
}
