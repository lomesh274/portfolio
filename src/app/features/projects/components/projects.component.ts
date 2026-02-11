import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService } from '../../../core/services/projects.service';
import { Project, ProjectFilter } from '../../../core/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  allProjects = this.projectsService.getProjects();
  
  filter = signal<ProjectFilter>({
    category: 'all',
    searchTerm: ''
  });

  categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'fullstack', label: 'Full Stack' }
  ];

  constructor(private projectsService: ProjectsService) {}

  get filteredProjects() {
    return this.projectsService.getFilteredProjects(this.filter());
  }

  onCategoryChange(category: 'all' | 'angular' | 'react' | 'fullstack'): void {
    this.filter.update((current :any)=> ({ ...current, category }));
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement?.value || '';
    this.filter.update(current => ({ ...current, searchTerm }));
  }

  clearFilters(): void {
    this.filter.set({
      category: 'all',
      searchTerm: ''
    });
  }

  getProjectCount(): number {
    return this.filteredProjects.length;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src) {
      img.src = '/assets/images/placeholder.jpg';
    }
  }
}
