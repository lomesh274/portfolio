import { Component, signal, computed, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Skill } from '../../data/portfolio-data';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills" class="section-padding skills-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">
            <i class="fa-solid fa-code"></i> Technical Matrix
          </span>
          <h2 class="section-title">
            Skills & <span class="angular-gradient-text">Framework Expertise</span>
          </h2>
          <p class="section-subtitle">
            {{ portfolio.personal.yearsOfExperience }} of hands-on mastery in Angular and React ecosystems, state management, and modern web architectures.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="filter-tabs">
          <button 
            class="tab-btn" 
            [class.active]="activeCategory() === 'all'"
            (click)="setCategory('all')">
            <i class="fa-solid fa-list"></i> All Tech Stack
          </button>

          <button 
            class="tab-btn angular-tab" 
            [class.active]="activeCategory() === 'angular'"
            (click)="setCategory('angular')">
            <i class="fa-brands fa-angular"></i> Angular Focus
          </button>

          <button 
            class="tab-btn react-tab" 
            [class.active]="activeCategory() === 'react'"
            (click)="setCategory('react')">
            <i class="fa-brands fa-react"></i> React Ecosystem
          </button>

          <button 
            class="tab-btn" 
            [class.active]="activeCategory() === 'frontend'"
            (click)="setCategory('frontend')">
            <i class="fa-solid fa-code"></i> Frontend & Web
          </button>

          <button 
            class="tab-btn" 
            [class.active]="activeCategory() === 'tools'"
            (click)="setCategory('tools')">
            <i class="fa-solid fa-toolbox"></i> Tools & Cloud
          </button>
        </div>

        <!-- Skills Grid -->
        <div class="skills-grid">
          @for (skill of filteredSkills(); track skill.name) {
            <div class="skill-card glass-card">
              <div class="skill-top">
                <div class="skill-icon-wrapper" [class.angular-icon]="skill.category === 'angular'" [class.react-icon]="skill.category === 'react'">
                  <i [class]="skill.icon"></i>
                </div>
                <div class="skill-info">
                  <h3 class="skill-name">{{ skill.name }}</h3>
                  <span class="skill-cat">{{ getCategoryLabel(skill.category) }}</span>
                </div>
                <span class="skill-pct">{{ skill.level }}%</span>
              </div>

              <!-- Animated Skill Level Bar -->
              <div class="skill-bar-track">
                <div 
                  class="skill-bar-fill" 
                  [class.angular-bar]="skill.category === 'angular'" 
                  [class.react-bar]="skill.category === 'react'"
                  [style.width.%]="skill.level">
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      background: rgba(16, 21, 34, 0.4);
    }

    .filter-tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      flex-wrap: wrap;
      margin-bottom: 3rem;

      .tab-btn {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.75rem 1.4rem;
        border-radius: var(--radius-full);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;

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

        &.angular-tab.active {
          background: var(--accent-gradient-angular);
          box-shadow: 0 8px 20px -5px rgba(221, 0, 49, 0.5);
        }
      }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .skill-card {
      padding: 1.5rem;

      .skill-top {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.2rem;

        .skill-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.1);
          color: var(--cyber-purple);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;

          &.angular-icon {
            background: rgba(221, 0, 49, 0.15);
            color: #dd0031;
          }

          &.react-icon {
            background: rgba(97, 218, 251, 0.15);
            color: #61dafb;
          }
        }

        .skill-info {
          flex-grow: 1;

          .skill-name {
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.3;
          }

          .skill-cat {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
        }

        .skill-pct {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
      }

      .skill-bar-track {
        height: 6px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: var(--radius-full);
        overflow: hidden;

        .skill-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          background: var(--primary-gradient);
          transition: width 1s ease-in-out;

          &.angular-bar {
            background: var(--accent-gradient-angular);
          }
          &.react-bar {
            background: linear-gradient(90deg, #61dafb, #3b82f6);
          }
        }
      }
    }
  `]
})
export class SkillsComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }

  protected activeCategory = signal<'all' | 'angular' | 'react' | 'frontend' | 'tools'>('all');

  protected filteredSkills = computed(() => {
    const cat = this.activeCategory();
    const skills = this.portfolio.skills;
    if (cat === 'all') return skills;
    return skills.filter(s => s.category === cat);
  });

  setCategory(cat: 'all' | 'angular' | 'react' | 'frontend' | 'tools') {
    this.activeCategory.set(cat);
  }

  getCategoryLabel(category: string): string {
    switch (category) {
      case 'angular': return 'Angular Core';
      case 'react': return 'React Ecosystem';
      case 'frontend': return 'Frontend & Web';
      case 'tools': return 'Tools & Cloud';
      default: return category;
    }
  }
}
