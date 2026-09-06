import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section id="about" class="section-padding about-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="section-tag">
            <i class="fa-solid fa-user-check"></i> Career Overview
          </span>
          <h2 class="section-title">
            Passionate Engineer Driven by <span class="angular-gradient-text">Angular Excellence</span>
          </h2>
          <p class="section-subtitle">
            With {{ portfolio.personal.yearsOfExperience }} of focused hands-on experience, I build enterprise web apps that balance pristine code architecture, blazing speed, and intuitive UX.
          </p>
        </div>

        <div class="about-grid">
          <!-- Left Bio & Highlights Card -->
          <div class="about-main-card glass-card">
            <div class="card-header-badge">
              <i class="fa-solid fa-rocket"></i>
              <span>{{ portfolio.personal.yearsOfExperience }} Experience Summary</span>
            </div>
            
            <p class="about-text">
              My professional background spans <strong>{{ portfolio.personal.yearsOfExperience }}</strong> of designing and delivering scalable web products using <strong>Angular</strong> and <strong>React</strong>.
            </p>
            <p class="about-text">
              {{ portfolio.personal.bio }}
            </p>

            <div class="highlights-grid">
              <div class="highlight-item">
                <div class="icon-box angular-bg">
                  <i class="fa-brands fa-angular"></i>
                </div>
                <div class="item-text">
                  <h4>Angular 20 & Signals Specialist</h4>
                  <p>Fine-grained reactivity, Standalone Components, SSR Hydration, and custom RxJS operators.</p>
                </div>
              </div>

              <div class="highlight-item">
                <div class="icon-box react-bg">
                  <i class="fa-brands fa-react"></i>
                </div>
                <div class="item-text">
                  <h4>React 18 & Next.js Proficiency</h4>
                  <p>Hooks architecture, Redux Toolkit state, custom UI component design, and server rendering.</p>
                </div>
              </div>

              <div class="highlight-item">
                <div class="icon-box perf-bg">
                  <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="item-text">
                  <h4>Performance & Web Vitals</h4>
                  <p>Bundle size reduction, lazy loading, sub-second LCP/FID metrics, and Lighthouse optimization.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Specs Card -->
          <div class="about-side-card glass-card">
            <div class="profile-header">
              <img [src]="portfolio.personal.avatarUrl" [alt]="portfolio.personal.name" class="profile-img" />
              <div class="profile-info">
                <h3>{{ portfolio.personal.name }}</h3>
                <span class="exp-tag">{{ portfolio.personal.yearsOfExperience }} Experience</span>
              </div>
            </div>

            <div class="specs-list">
              <div class="spec-row">
                <span class="spec-key"><i class="fa-solid fa-laptop-code"></i> Primary Role</span>
                <span class="spec-val">{{ portfolio.personal.title }}</span>
              </div>

              <div class="spec-row">
                <span class="spec-key"><i class="fa-solid fa-clock-rotate-left"></i> Experience</span>
                <span class="spec-val highlight-val">{{ portfolio.personal.yearsOfExperience }} (Enterprise)</span>
              </div>

              <div class="spec-row">
                <span class="spec-key"><i class="fa-solid fa-database"></i> Core Stack</span>
                <span class="spec-val">Angular 20, React 18, RxJS</span>
              </div>

              <div class="spec-row">
                <span class="spec-key"><i class="fa-solid fa-location-dot"></i> Location</span>
                <span class="spec-val">{{ portfolio.personal.location }}</span>
              </div>

              <div class="spec-row">
                <span class="spec-key"><i class="fa-solid fa-circle-check"></i> Status</span>
                <span class="spec-val status-open">{{ portfolio.personal.availability }}</span>
              </div>
            </div>

            <a href="#contact" class="btn btn-primary full-width">
              <i class="fa-solid fa-envelope"></i> Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      position: relative;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 2rem;
    }

    .about-main-card {
      padding: 2.5rem;

      .card-header-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.4rem 1rem;
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.2);
        color: var(--cyber-purple);
        border-radius: var(--radius-full);
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
      }

      .about-text {
        font-size: 1.05rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1.2rem;

        strong {
          color: var(--text-primary);
        }
      }

      .highlights-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;

          .icon-box {
            width: 48px;
            height: 48px;
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            flex-shrink: 0;

            &.angular-bg {
              background: rgba(221, 0, 49, 0.15);
              color: #dd0031;
            }
            &.react-bg {
              background: rgba(97, 218, 251, 0.15);
              color: #61dafb;
            }
            &.perf-bg {
              background: rgba(16, 185, 129, 0.15);
              color: #10b981;
            }
          }

          .item-text {
            h4 {
              font-size: 1.05rem;
              font-weight: 700;
              margin-bottom: 0.2rem;
            }
            p {
              font-size: 0.9rem;
              color: var(--text-muted);
            }
          }
        }
      }
    }

    .about-side-card {
      padding: 2.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .profile-header {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        margin-bottom: 1.8rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);

        .profile-img {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--cyber-cyan);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
          flex-shrink: 0;
        }

        h3 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
        }

        .exp-tag {
          font-size: 0.82rem;
          color: var(--cyber-cyan);
          font-weight: 600;
          font-family: var(--font-mono);
        }
      }

      .specs-list {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
        margin-bottom: 2rem;

        .spec-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          gap: 0.5rem;

          .spec-key {
            color: var(--text-muted);
            display: flex;
            align-items: center;
            gap: 0.5rem;

            i {
              color: var(--cyber-purple);
            }
          }

          .spec-val {
            font-weight: 600;
            color: var(--text-primary);
            text-align: right;

            &.highlight-val {
              color: #ff4d6d;
            }

            &.status-open {
              color: #10b981;
            }
          }
        }
      }

      .full-width {
        width: 100%;
      }
    }

    @media (max-width: 992px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      .about-side-card {
        order: -1;
      }
    }

    @media (max-width: 576px) {
      .about-main-card, .about-side-card {
        padding: 1.4rem 1.2rem;
      }
      .spec-row {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .spec-val {
          font-size: 0.85rem;
        }
      }
    }
  `]
})
export class AboutComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }
}
