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
  selector: 'app-experience-list',
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
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.scss'
})
export class ExperienceListComponent {
  displayedColumns: string[] = ['company', 'position', 'duration', 'actions'];
  
  experiences = [
    {
      id: '1',
      company: 'Tech Company',
      position: 'Senior Developer',
      duration: '2022 - Present'
    }
  ];

  constructor() {}

  editExperience(id: string): void {
    console.log('Edit experience:', id);
  }

  deleteExperience(id: string): void {
    console.log('Delete experience:', id);
  }

  addExperience(): void {
    console.log('Add new experience');
  }
}
