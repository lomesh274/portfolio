import { Component, input, output, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  template: `
    @if (isOpen()) {
      <div class="resume-backdrop" (click)="closeResume()">
        <div class="resume-paper glass-card" (click)="$event.stopPropagation()">
          <!-- Close Button -->
          <button class="close-btn" (click)="closeResume()" aria-label="Close Resume">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <!-- Resume Document Header -->
          <div class="resume-header">
            <div class="header-left">
              <h1 class="dev-name">{{ portfolio.personal.name }}</h1>
              <p class="dev-title">{{ portfolio.personal.title }} ({{ portfolio.personal.yearsOfExperience }} Experience)</p>
            </div>
            <div class="header-contact">
              <span><i class="fa-solid fa-envelope"></i> {{ portfolio.personal.email }}</span>
              <span><i class="fa-solid fa-phone"></i> {{ portfolio.personal.phone }}</span>
              <span><i class="fa-solid fa-location-dot"></i> {{ portfolio.personal.location }}</span>
            </div>
          </div>

          <hr class="divider" />

          <!-- Summary -->
          <div class="resume-section">
            <h3 class="sec-heading"><i class="fa-solid fa-user"></i> Executive Professional Summary</h3>
            <p class="sec-text">
              Results-driven Frontend Engineer with <strong>{{ portfolio.personal.yearsOfExperience }} of enterprise experience</strong> specializing in Angular (v14-v20) and React framework ecosystems. Proven track record of architecting high-performance single page applications, implementing Angular Signals & RxJS state pipelines, and optimizing web performance.
            </p>
          </div>

          <!-- Technical Skills -->
          <div class="resume-section">
            <h3 class="sec-heading"><i class="fa-solid fa-gear"></i> Key Technical Competencies</h3>
            <div class="skills-bullets">
              <div><strong>Core Frameworks:</strong> Angular 20, Angular Signals, RxJS, NgRx, React 18, Next.js, Redux Toolkit</div>
              <div><strong>Languages & Web:</strong> TypeScript, JavaScript (ES6+), HTML5, SCSS, CSS Grid/Flexbox, Tailwind CSS</div>
              <div><strong>Architecture & Tools:</strong> Micro-frontends (Module Federation), Firebase, REST APIs, GraphQL, Jest, Jasmine/Karma, Git</div>
            </div>
          </div>

          <!-- Work Experience -->
          <div class="resume-section">
            <h3 class="sec-heading"><i class="fa-solid fa-briefcase"></i> Professional Work Experience</h3>
            
            @for (exp of portfolio.experiences; track exp.id) {
              <div class="exp-entry">
                <div class="entry-head">
                  <span class="role-name">{{ exp.role }}</span>
                  <span class="dates">{{ exp.period }}</span>
                </div>
                <div class="company-sub">{{ exp.company }} — {{ exp.location }}</div>
                <ul class="ach-list">
                  @for (ach of exp.achievements; track ach) {
                    <li>{{ ach }}</li>
                  }
                </ul>
              </div>
            }
          </div>

          <!-- Education -->
          <div class="resume-section">
            <h3 class="sec-heading"><i class="fa-solid fa-graduation-cap"></i> Education</h3>
            @for (edu of portfolio.education; track edu.degree) {
              <div class="edu-entry">
                <strong>{{ edu.degree }}</strong> — {{ edu.institution }} ({{ edu.year }})
              </div>
            }
          </div>

          <!-- Action Footer -->
          <div class="resume-footer">
            <button (click)="printResume()" class="btn btn-angular">
              <i class="fa-solid fa-print"></i> Print / Download PDF
            </button>
            <button (click)="closeResume()" class="btn btn-outline">
              Close Preview
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .resume-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(5, 8, 15, 0.9);
      backdrop-filter: blur(14px);
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.2s ease;
    }

    .resume-paper {
      width: 100%;
      max-width: 850px;
      max-height: 92vh;
      overflow-y: auto;
      background: #0d121f;
      border: 1px solid var(--border-glow);
      padding: 2.5rem;
      border-radius: var(--radius-md);
      position: relative;
      color: #e2e8f0;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
    }

    .close-btn {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.1rem;

      &:hover {
        background: #ef4444;
      }
    }

    .resume-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
      flex-wrap: wrap;

      .dev-name {
        font-size: 1.8rem;
        font-weight: 900;
        color: #ffffff;
      }

      .dev-title {
        font-size: 1.05rem;
        color: var(--cyber-cyan);
        font-weight: 700;
      }

      .header-contact {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        font-size: 0.85rem;
        color: var(--text-secondary);

        i {
          color: var(--cyber-purple);
          width: 16px;
        }
      }
    }

    .divider {
      border: none;
      height: 1px;
      background: var(--border-color);
      margin: 1.5rem 0;
    }

    .resume-section {
      margin-bottom: 1.8rem;

      .sec-heading {
        font-size: 1.1rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 0.4rem;

        i {
          color: #dd0031;
        }
      }

      .sec-text {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.6;

        strong {
          color: white;
        }
      }

      .skills-bullets {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-secondary);

        strong {
          color: white;
        }
      }

      .exp-entry {
        margin-bottom: 1.2rem;

        .entry-head {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          font-size: 1rem;
          color: white;

          .dates {
            font-size: 0.85rem;
            color: var(--cyber-purple);
            font-family: var(--font-mono);
          }
        }

        .company-sub {
          font-size: 0.85rem;
          color: var(--cyber-cyan);
          margin-bottom: 0.5rem;
        }

        .ach-list {
          padding-left: 1.2rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
      }

      .edu-entry {
        font-size: 0.9rem;
        color: var(--text-secondary);
        strong {
          color: white;
        }
      }
    }

    .resume-footer {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);

      @media print {
        display: none;
      }
    }
  `]
})
export class ResumeModalComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }

  isOpen = input<boolean>(false);
  onClose = output<void>();

  closeResume() {
    this.onClose.emit();
  }

  printResume() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}
