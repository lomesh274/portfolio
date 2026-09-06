import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="section-padding experience-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">
            <i class="fa-solid fa-briefcase"></i> Work History
          </span>
          <h2 class="section-title">
            <span class="angular-gradient-text">{{ portfolio.personal.yearsOfExperience }}</span> Career Journey & Impact
          </h2>
          <p class="section-subtitle">
            Track record of building enterprise Angular & React applications, optimizing performance, and delivering business value.
          </p>
        </div>

        <div class="timeline-container">
          @for (exp of portfolio.experiences; track exp.id) {
            <div class="timeline-item">
              <!-- Timeline Dot & Connector -->
              <div class="timeline-marker">
                <div class="marker-dot">
                  <i class="fa-brands fa-angular"></i>
                </div>
                <div class="marker-line"></div>
              </div>

              <!-- Content Card -->
              <div class="timeline-content glass-card">
                <div class="item-header">
                  <div class="title-block">
                    <h3 class="role-title">{{ exp.role }}</h3>
                    <span class="company-name"><i class="fa-solid fa-building"></i> {{ exp.company }} • {{ exp.location }}</span>
                  </div>
                  <span class="period-badge">
                    <i class="fa-regular fa-calendar-check"></i> {{ exp.period }}
                  </span>
                </div>

                <p class="exp-desc">{{ exp.description }}</p>

                <div class="achievements-block">
                  <h4><i class="fa-solid fa-trophy"></i> Key Accomplishments</h4>
                  <ul>
                    @for (ach of exp.achievements; track ach) {
                      <li><i class="fa-solid fa-chevron-right"></i> {{ ach }}</li>
                    }
                  </ul>
                </div>

                <div class="tech-stack-row">
                  <span class="stack-label">Tech Used:</span>
                  @for (t of exp.technologies; track t) {
                    <span class="tech-pill">{{ t }}</span>
                  }
                </div>
              </div>
            </div>
          }

          <!-- Education Item -->
          <div class="timeline-item education-item">
            <div class="timeline-marker">
              <div class="marker-dot edu-dot">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>

            <div class="timeline-content glass-card">
              @for (edu of portfolio.education; track edu.degree) {
                <div class="item-header">
                  <div class="title-block">
                    <h3 class="role-title">{{ edu.degree }}</h3>
                    <span class="company-name"><i class="fa-solid fa-university"></i> {{ edu.institution }}</span>
                  </div>
                  <span class="period-badge">{{ edu.year }}</span>
                </div>
                @if (edu.score) {
                  <p class="edu-score"><i class="fa-solid fa-award"></i> {{ edu.score }}</p>
                }
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      background: rgba(16, 21, 34, 0.4);
    }

    .timeline-container {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      position: relative;
    }

    .timeline-item {
      display: flex;
      gap: 1.8rem;
      position: relative;

      .timeline-marker {
        display: flex;
        flex-direction: column;
        align-items: center;

        .marker-dot {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--accent-gradient-angular);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          box-shadow: 0 0 20px rgba(221, 0, 49, 0.5);
          z-index: 2;
          flex-shrink: 0;

          &.edu-dot {
            background: var(--primary-gradient);
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
          }
        }

        .marker-line {
          width: 2px;
          height: calc(100% + 2.5rem);
          background: linear-gradient(to bottom, var(--border-glow), transparent);
          margin-top: 0.5rem;
        }
      }

      .timeline-content {
        flex-grow: 1;
        padding: 2rem;

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;

          .role-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--text-primary);
          }

          .company-name {
            display: block;
            font-size: 0.9rem;
            color: var(--cyber-cyan);
            font-weight: 600;
            margin-top: 0.2rem;
          }

          .period-badge {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-color);
            padding: 0.35rem 0.9rem;
            border-radius: var(--radius-full);
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--cyber-purple);
            font-family: var(--font-mono);
          }
        }

        .exp-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.2rem;
        }

        .achievements-block {
          margin-bottom: 1.2rem;

          h4 {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.5rem;

            i {
              color: var(--cyber-purple);
            }
          }

          ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.4rem;

            li {
              font-size: 0.88rem;
              color: var(--text-secondary);
              display: flex;
              align-items: flex-start;
              gap: 0.5rem;

              i {
                color: var(--neon-emerald);
                font-size: 0.75rem;
                margin-top: 0.3rem;
              }
            }
          }
        }

        .tech-stack-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);

          .stack-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            font-weight: 600;
          }

          .tech-pill {
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            color: var(--text-primary);
            padding: 0.2rem 0.6rem;
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
            font-family: var(--font-mono);
          }
        }
      }
    }

    .edu-score {
      font-size: 0.9rem;
      color: var(--neon-emerald);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 640px) {
      .timeline-item {
        flex-direction: column;
        gap: 1rem;

        .marker-line {
          display: none;
        }
      }
    }
  `]
})
export class ExperienceComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }
}
