import { Component, signal, computed, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../data/portfolio-data';
import { ProjectModalComponent } from '../project-modal/project-modal';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectModalComponent, UpperCasePipe, RouterLink],
  template: `
    <section id="projects" class="section-padding projects-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">
            <i class="fa-solid fa-rocket"></i> Portfolio Showcase
          </span>
          <h2 class="section-title">
            Featured <span class="angular-gradient-text">Angular</span> & <span class="gradient-text">React</span> Projects
          </h2>
          <p class="section-subtitle">
            Real-world applications built during my {{ portfolio.personal.yearsOfExperience }} of experience, showcasing clean architecture, state management, and high performance.
          </p>
        </div>

        <!-- Project Filter Buttons -->
        <div class="project-filters">
          <button 
            class="filter-btn" 
            [class.active]="activeFilter() === 'all'" 
            (click)="setFilter('all')">
            All Projects ({{ portfolio.projects.length }})
          </button>
          
          <button 
            class="filter-btn angular-btn" 
            [class.active]="activeFilter() === 'angular'" 
            (click)="setFilter('angular')">
            <i class="fa-brands fa-angular"></i> Angular Apps
          </button>

          <button 
            class="filter-btn react-btn" 
            [class.active]="activeFilter() === 'react'" 
            (click)="setFilter('react')">
            <i class="fa-brands fa-react"></i> React Apps
          </button>

          @if (isLoggedIn()) {
            <a [routerLink]="['/admin']" class="filter-btn admin-add-btn">
              <i class="fa-solid fa-plus-circle"></i> Add / Edit Projects (Admin)
            </a>
          }
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id) {
            <div class="project-card glass-card" (click)="openProject(project)">
              <!-- Thumbnail Image -->
              <div class="card-image-wrapper">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title" 
                  (error)="handleImageError($event, project)"
                  class="project-img" />
                <div class="image-overlay">
                  <span class="view-btn">
                    <i class="fa-solid fa-eye"></i> View Details
                  </span>
                </div>
                <span class="category-badge" [class.angular-badge]="project.category === 'angular'">
                  {{ project.category | uppercase }}
                </span>
              </div>

              <!-- Card Content -->
              <div class="card-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-desc">{{ project.shortDescription }}</p>

                <!-- Tags -->
                <div class="tags-container">
                  @for (tag of project.tags.slice(0, 4); track tag) {
                    <span class="tag-chip">{{ tag }}</span>
                  }
                </div>

                <!-- Footer Buttons -->
                <div class="card-action-bar">
                  <button class="details-link">
                    Explore Architecture <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Detail Modal -->
      <app-project-modal 
        [project]="selectedProject()" 
        (onClose)="closeModal()">
      </app-project-modal>
    </section>
  `,
  styles: [`
    .projects-section {
      position: relative;
    }

    .project-filters {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;

      .filter-btn {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.7rem 1.4rem;
        border-radius: var(--radius-full);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;

        &:hover {
          color: var(--text-primary);
          border-color: var(--border-glow);
        }

        &.active {
          background: var(--primary-gradient);
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 20px -5px rgba(99, 102, 241, 0.5);
        }

        &.angular-btn.active {
          background: var(--accent-gradient-angular);
          box-shadow: 0 8px 20px -5px rgba(221, 0, 49, 0.5);
        }

        &.admin-add-btn {
          background: rgba(139, 92, 246, 0.15);
          border-color: var(--cyber-purple);
          color: var(--cyber-purple);

          &:hover {
            background: var(--cyber-purple);
            color: white;
          }
        }
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 2rem;
    }

    .project-card {
      overflow: hidden;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;

      .card-image-wrapper {
        position: relative;
        height: 220px;
        overflow: hidden;

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 13, 20, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;

          .view-btn {
            background: var(--primary-gradient);
            color: white;
            padding: 0.6rem 1.2rem;
            border-radius: var(--radius-full);
            font-size: 0.875rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
        }

        .category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.3rem 0.7rem;
          background: rgba(99, 102, 241, 0.9);
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: var(--radius-sm);

          &.angular-badge {
            background: rgba(221, 0, 49, 0.9);
          }
        }
      }

      &:hover {
        .project-img {
          transform: scale(1.06);
        }
        .image-overlay {
          opacity: 1;
        }
      }

      .card-content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .project-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.2rem;
          flex-grow: 1;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.2rem;

          .tag-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-color);
            padding: 0.2rem 0.6rem;
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            color: var(--cyber-cyan);
            font-family: var(--font-mono);
          }
        }

        .card-action-bar {
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);

          .details-link {
            background: none;
            border: none;
            color: var(--cyber-purple);
            font-weight: 600;
            font-size: 0.875rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0;

            i {
              transition: transform 0.2s ease;
            }
          }
        }
      }

      &:hover .details-link i {
        transform: translateX(4px);
      }
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  private portfolioService = inject(PortfolioService);
  private authService = inject(AuthService);

  protected get portfolio() { return this.portfolioService.portfolioData(); }
  protected get isLoggedIn() { return this.authService.isLoggedIn; }

  protected activeFilter = signal<'all' | 'angular' | 'react'>('all');
  protected selectedProject = signal<Project | null>(null);

  protected filteredProjects = computed(() => {
    const f = this.activeFilter();
    const projects = this.portfolio.projects;
    if (f === 'all') return projects;
    return projects.filter(p => p.category === f || p.category === 'fullstack');
  });

  setFilter(filter: 'all' | 'angular' | 'react') {
    this.activeFilter.set(filter);
  }

  openProject(project: Project) {
    this.selectedProject.set(project);
  }

  closeModal() {
    this.selectedProject.set(null);
  }

  handleImageError(event: Event, project: Project) {
    const img = event.target as HTMLImageElement;
    if (project.fallbackImageUrl) {
      img.src = project.fallbackImageUrl;
    }
  }
}
