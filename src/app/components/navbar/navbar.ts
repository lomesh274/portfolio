import { Component, signal, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled()">
      <div class="container navbar-content">
        <!-- Brand Logo -->
        <a href="#hero" class="brand-logo">
          <span class="logo-badge">NG</span>
          <div class="logo-text">
            <span class="name">{{ portfolio.personal.name }}</span>
            <span class="role">{{ portfolio.personal.yearsOfExperience }} Exp</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-links desktop-only">
          <a href="#about" class="nav-item">About</a>
          <a href="#skills" class="nav-item">Skills</a>
          <a href="#projects" class="nav-item">Projects</a>
          <a href="#experience" class="nav-item">Experience</a>
          <a href="#contact" class="nav-item">Contact</a>
        </nav>

        <!-- Right Action Buttons -->
        <div class="nav-actions">
          <a [routerLink]="['/admin']" class="admin-link" title="Admin Control Panel">
            <i class="fa-solid fa-user-shield"></i> Admin
          </a>

          <a [href]="portfolio.personal.resumeUrl" target="_blank" download="Lomesh_Yadav_Resume.pdf" class="btn btn-outline btn-sm resume-btn">
            <i class="fa-solid fa-file-pdf"></i> Resume
          </a>

          <a href="#contact" class="btn btn-angular btn-sm hire-btn">
            Hire Me
          </a>

          <!-- Mobile Toggle Button -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle Navigation Menu">
            <i class="fa-solid" [class.fa-bars]="!mobileMenuOpen()" [class.fa-xmark]="mobileMenuOpen()"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Drawer -->
      @if (mobileMenuOpen()) {
        <div class="mobile-menu glass-card">
          <a href="#about" (click)="closeMobileMenu()" class="mobile-item">
            <i class="fa-solid fa-user-gear"></i> About Me
          </a>
          <a href="#skills" (click)="closeMobileMenu()" class="mobile-item">
            <i class="fa-solid fa-code"></i> Skills & Expertise
          </a>
          <a href="#projects" (click)="closeMobileMenu()" class="mobile-item">
            <i class="fa-solid fa-laptop-code"></i> Featured Projects
          </a>
          <a href="#experience" (click)="closeMobileMenu()" class="mobile-item">
            <i class="fa-solid fa-briefcase"></i> Work Experience
          </a>
          <a href="#contact" (click)="closeMobileMenu()" class="mobile-item">
            <i class="fa-solid fa-paper-plane"></i> Contact Me
          </a>
          <a [href]="portfolio.personal.resumeUrl" target="_blank" download="Lomesh_Yadav_Resume.pdf" (click)="closeMobileMenu()" class="mobile-item resume-mobile">
            <i class="fa-solid fa-file-pdf"></i> Download Resume (PDF)
          </a>
          <a [routerLink]="['/admin']" (click)="closeMobileMenu()" class="mobile-item admin-mobile">
            <i class="fa-solid fa-user-shield"></i> Admin Control Panel
          </a>
        </div>
      }
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--nav-height);
      z-index: 1000;
      transition: all 0.3s ease;
      background: rgba(10, 13, 20, 0.4);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);

      &.scrolled {
        background: rgba(10, 13, 20, 0.9);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        border-bottom: 1px solid var(--border-glow);
      }
    }

    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;

      .logo-badge {
        width: 42px;
        height: 42px;
        border-radius: var(--radius-sm);
        background: var(--accent-gradient-angular);
        color: white;
        font-weight: 800;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px rgba(221, 0, 49, 0.5);
      }

      .logo-text {
        display: flex;
        flex-direction: column;

        .name {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .role {
          font-size: 0.75rem;
          color: var(--cyber-cyan);
          font-weight: 600;
          font-family: var(--font-mono);
        }
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;

      .nav-item {
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        position: relative;

        &:hover {
          color: var(--text-primary);
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-gradient);
          transition: width 0.3s ease;
        }

        &:hover::after {
          width: 100%;
        }
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;

      .admin-link {
        color: var(--cyber-purple);
        font-weight: 600;
        font-size: 0.875rem;
        text-decoration: none;
        padding: 0.4rem 0.8rem;
        border-radius: var(--radius-sm);
        background: rgba(139, 92, 246, 0.1);
        border: 1px solid rgba(139, 92, 246, 0.3);
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s ease;

        &:hover {
          background: rgba(139, 92, 246, 0.25);
          color: white;
        }
      }

      .btn-sm {
        padding: 0.55rem 1.2rem;
        font-size: 0.875rem;
      }
    }

    .mobile-toggle {
      display: none;
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      font-size: 1.2rem;
      cursor: pointer;
    }

    .mobile-menu {
      position: absolute;
      top: calc(var(--nav-height) + 8px);
      left: 1.5rem;
      right: 1.5rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      animation: fadeInDown 0.3s ease forwards;

      .mobile-item {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem 1rem;
        border-radius: var(--radius-sm);
        transition: background 0.2s ease;

        i {
          color: var(--cyber-cyan);
        }

        &.resume-mobile {
          color: #ff4d6d;
          background: rgba(221, 0, 49, 0.12);
          border: 1px solid rgba(221, 0, 49, 0.3);
          font-weight: 700;

          i {
            color: #dd0031;
          }
        }

        &.admin-mobile {
          color: var(--cyber-purple);
          background: rgba(139, 92, 246, 0.15);
        }

        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 868px) {
      .desktop-only { display: none; }
      .mobile-toggle { display: flex; align-items: center; justify-content: center; }
      .resume-btn { display: none; }
    }

    @media (max-width: 640px) {
      .admin-link, .hire-btn { display: none !important; }
      .brand-logo .logo-text .role { display: none; }
      .mobile-menu {
        left: 0.75rem;
        right: 0.75rem;
        padding: 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }

  protected isScrolled = signal(false);
  protected mobileMenuOpen = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 40);
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
