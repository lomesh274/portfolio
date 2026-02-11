import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService } from '../../../core/services/projects.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.loadProject();
  }

  private loadProject(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    
    if (projectId) {
      this.project = this.projectsService.getProjectById(projectId);
      
      if (this.project) {
        this.loading = false;
      } else {
        this.error = 'Project not found';
        this.loading = false;
      }
    } else {
      this.error = 'Invalid project ID';
      this.loading = false;
    }
  }

  getProjectCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'angular': 'Angular',
      'react': 'React',
      'fullstack': 'Full Stack'
    };
    return labels[category] || category;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = '/assets/images/placeholder.jpg';
    }
  }
}
