import { Component, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-left">
          <div class="footer-logo">
            <span class="logo-badge">NG</span>
            <span class="logo-name">{{ portfolio.personal.name }}</span>
          </div>
          <p class="footer-tagline">
            Building modern Angular 20 & React applications with {{ portfolio.personal.yearsOfExperience }} of professional expertise.
          </p>
        </div>

        <div class="footer-center">
          <span class="built-with">
            Built with <i class="fa-brands fa-angular angular-color"></i> Angular 20 & <i class="fa-solid fa-fire firebase-color"></i> Firebase
          </span>
          <span class="copyright">
            &copy; 2026 {{ portfolio.personal.name }}. All rights reserved.
          </span>
        </div>

        <div class="footer-right">
          <button (click)="scrollToTop()" class="back-to-top glass-card" aria-label="Back to Top">
            <i class="fa-solid fa-arrow-up"></i> Top
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #07090e;
      border-top: 1px solid var(--border-color);
      padding: 3rem 0;
      color: var(--text-secondary);
    }

    .footer-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .footer-left {
      max-width: 380px;

      .footer-logo {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin-bottom: 0.6rem;

        .logo-badge {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--accent-gradient-angular);
          color: white;
          font-weight: 800;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-name {
          font-weight: 800;
          font-size: 1.1rem;
          color: white;
        }
      }

      .footer-tagline {
        font-size: 0.875rem;
        color: var(--text-muted);
        line-height: 1.5;
      }
    }

    .footer-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
      text-align: center;

      .built-with {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--text-primary);

        .angular-color { color: #dd0031; }
        .firebase-color { color: #ffca28; }
      }

      .copyright {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
    }

    .back-to-top {
      padding: 0.6rem 1.2rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      border-radius: var(--radius-full);
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        border-color: var(--cyber-cyan);
        color: var(--cyber-cyan);
      }
    }
  `]
})
export class FooterComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
