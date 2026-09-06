import { Component, input, output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Project } from '../../data/portfolio-data';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    @if (project()) {
      <div class="modal-backdrop" (click)="closeModal()">
        <div class="modal-content glass-card" (click)="$event.stopPropagation()">
          <!-- Close Button -->
          <button class="close-btn" (click)="closeModal()" aria-label="Close Modal">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Project Banner Image with Image Fallback -->
          <div class="modal-banner">
            <img 
              [src]="project()?.imageUrl" 
              [alt]="project()?.title" 
              (error)="handleImageError($event)"
              class="project-banner-img" />
            <div class="banner-overlay">
              <span class="category-badge" [class.angular-badge]="project()?.category === 'angular'">
                {{ project()?.category | uppercase }} PROJECT
              </span>
              <h2 class="banner-title">{{ project()?.title }}</h2>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Metrics Row -->
            @if (project()?.metrics?.length) {
              <div class="metrics-grid">
                @for (m of project()?.metrics; track m.label) {
                  <div class="metric-item glass-card">
                    <span class="m-val">{{ m.value }}</span>
                    <span class="m-lbl">{{ m.label }}</span>
                  </div>
                }
              </div>
            }

            <!-- Tech Tags -->
            <div class="tags-row">
              @for (tag of project()?.tags; track tag) {
                <span class="tag-pill">{{ tag }}</span>
              }
            </div>

            <!-- Description -->
            <div class="section-block">
              <h3><i class="fa-solid fa-circle-info"></i> Project Overview</h3>
              <p>{{ project()?.fullDescription }}</p>
            </div>

            <!-- Highlights -->
            <div class="section-block">
              <h3><i class="fa-solid fa-star"></i> Key Architectural Highlights</h3>
              <ul class="highlights-list">
                @for (h of project()?.highlights; track h) {
                  <li><i class="fa-solid fa-check-circle"></i> {{ h }}</li>
                }
              </ul>
            </div>

            <!-- Modal Action Footer -->
            <div class="modal-footer">
              @if (project()?.demoUrl) {
                <a [href]="project()?.demoUrl" target="_blank" rel="noopener noreferrer" class="btn btn-angular">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo Preview
                </a>
              }

              @if (project()?.githubUrl) {
                <a [href]="project()?.githubUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                  <i class="fa-brands fa-github"></i> View GitHub Code
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(5, 8, 15, 0.85);
      backdrop-filter: blur(12px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease;
    }

    .modal-content {
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      background: #0f1522;
      border: 1px solid var(--border-glow);
      box-shadow: 0 25px 60px rgba(0,0,0,0.8);
      border-radius: var(--radius-lg);
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background: #ef4444;
        border-color: #ef4444;
      }
    }

    .modal-banner {
      position: relative;
      height: 280px;
      overflow: hidden;

      .project-banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .banner-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem 1.5rem 1.5rem;
        background: linear-gradient(to top, #0f1522 20%, transparent 100%);
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        .category-badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid var(--cyber-purple);
          color: var(--cyber-purple);
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          width: fit-content;

          &.angular-badge {
            background: rgba(221, 0, 49, 0.2);
            border-color: #dd0031;
            color: #ff4d6d;
          }
        }

        .banner-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: white;
        }
      }
    }

    .modal-body {
      padding: 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;

      .metric-item {
        padding: 0.8rem;
        text-align: center;

        .m-val {
          display: block;
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--cyber-cyan);
          font-family: var(--font-mono);
        }

        .m-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      }
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag-pill {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid var(--border-color);
        padding: 0.3rem 0.8rem;
        border-radius: var(--radius-full);
        font-size: 0.8rem;
        color: var(--text-secondary);
        font-weight: 500;
      }
    }

    .section-block {
      h3 {
        font-size: 1.05rem;
        font-weight: 700;
        margin-bottom: 0.6rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-primary);

        i {
          color: var(--cyber-purple);
        }
      }

      p {
        color: var(--text-secondary);
        font-size: 0.95rem;
        line-height: 1.6;
      }

      .highlights-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        li {
          font-size: 0.92rem;
          color: var(--text-secondary);
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;

          i {
            color: var(--neon-emerald);
            font-size: 1rem;
            margin-top: 0.2rem;
          }
        }
      }
    }

    .modal-footer {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
      flex-wrap: wrap;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class ProjectModalComponent {
  project = input<Project | null>(null);
  onClose = output<void>();

  closeModal() {
    this.onClose.emit();
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (this.project()?.fallbackImageUrl) {
      img.src = this.project()!.fallbackImageUrl;
    }
  }
}
