import { Component, output, inject } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="hero-section">
      <div class="container hero-container">
        <!-- Hero Text Column -->
        <div class="hero-text-col">
          <!-- Experience Badge -->
          <div class="exp-badge">
            <span class="pulse-dot"></span>
            <i class="fa-brands fa-angular angular-icon"></i>
            <span>{{ portfolio.personal.title }} • {{ portfolio.personal.yearsOfExperience }} Exp</span>
          </div>

          <!-- Main Headline -->
          <h1 class="hero-title">
            Crafting High-Performance <br/>
            <span class="angular-gradient-text">Angular</span> & 
            <span class="gradient-text">React</span> Applications
          </h1>

          <p class="hero-bio">
            {{ portfolio.personal.bio }}
          </p>

          <!-- Action Buttons -->
          <div class="hero-actions">
            <a href="#projects" class="btn btn-angular">
              <i class="fa-solid fa-layer-group"></i> View Projects
            </a>
            <a [href]="portfolio.personal.resumeUrl" (click)="triggerResume($event)" class="btn btn-outline">
              <i class="fa-solid fa-file-arrow-down"></i> Get Resume
            </a>
          </div>

          <!-- Quick Stats Bar -->
          <div class="stats-row">
            @for (stat of portfolio.stats; track stat.label) {
              <div class="stat-card glass-card">
                <span class="stat-value">{{ stat.value }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Hero Visual / Code Window Column -->
        <div class="hero-code-col">
          <div class="code-window glass-card">
            <!-- Terminal Header -->
            <div class="window-header">
              <div class="window-controls">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="window-title">angular-developer-profile.component.ts</span>
              <span class="window-lang">TypeScript</span>
            </div>

            <!-- Code Body -->
            <div class="window-body">
              <pre><code><span class="kwd">import</span> &#123; Component, signal, computed &#125; <span class="kwd">from</span> <span class="str">'&#64;angular/core'</span>;

<span class="kwd">&#64;Component</span>(&#123;
  selector: <span class="str">'app-developer-profile'</span>,
  standalone: <span class="kwd">true</span>
&#125;)
<span class="kwd">export class</span> <span class="cls">AngularReactDeveloper</span> &#123;
  <span class="cmt">// {{ portfolio.personal.yearsOfExperience }} Enterprise Experience</span>
  <span class="kwd">readonly</span> experienceYears = signal(<span class="str">'{{ portfolio.personal.yearsOfExperience }}'</span>);
  <span class="kwd">readonly</span> coreFrameworks = [<span class="str">'Angular 20'</span>, <span class="str">'React 18'</span>];
  <span class="kwd">readonly</span> primaryState = [<span class="str">'Signals'</span>, <span class="str">'RxJS'</span>, <span class="str">'NgRx'</span>, <span class="str">'Redux'</span>];

  <span class="kwd">readonly</span> status = computed(() =&gt; &#123;
    <span class="kwd">return</span> <span class="str">'🚀 {{ portfolio.personal.availability }}'</span>;
  &#125;);
&#125;</code></pre>
            </div>

            <!-- Floating Badge Overlay -->
            <div class="code-overlay-badge glass-card">
              <img [src]="portfolio.personal.avatarUrl" [alt]="portfolio.personal.name" class="avatar-img" />
              <div class="badge-text">
                <span class="dev-name">{{ portfolio.personal.name }}</span>
                <span class="dev-role">Angular & React Specialist</span>
              </div>
              <span class="active-badge">Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      padding-top: calc(var(--nav-height) + 3rem);
      padding-bottom: 5rem;
      display: flex;
      align-items: center;
      position: relative;
    }

    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
      align-items: center;
    }

    .exp-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.5rem 1.2rem;
      border-radius: var(--radius-full);
      background: rgba(221, 0, 49, 0.1);
      border: 1px solid rgba(221, 0, 49, 0.3);
      color: #ff4d6d;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1.5rem;

      .angular-icon {
        color: #dd0031;
        font-size: 1.1rem;
      }

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #10b981;
        box-shadow: 0 0 10px #10b981;
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      0% { opacity: 0.4; }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0.4; }
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.8rem);
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
    }

    .hero-bio {
      font-size: 1.15rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2.2rem;
      max-width: 600px;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;

      .stat-card {
        padding: 1rem;
        text-align: center;
        border-radius: var(--radius-sm);

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-mono);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      }
    }

    .code-window {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.2);

      .window-header {
        background: rgba(15, 23, 42, 0.9);
        padding: 0.8rem 1.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);

        .window-controls {
          display: flex;
          gap: 0.4rem;

          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            &.red { background: #ef4444; }
            &.yellow { background: #f59e0b; }
            &.green { background: #10b981; }
          }
        }

        .window-title {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .window-lang {
          font-size: 0.75rem;
          color: var(--cyber-cyan);
          font-weight: 600;
        }
      }

      .window-body {
        padding: 1.5rem;
        background: #090d16;
        font-family: var(--font-mono);
        font-size: 0.875rem;
        line-height: 1.6;
        overflow-x: auto;

        .kwd { color: #c084fc; font-weight: 600; }
        .str { color: #38bdf8; }
        .num { color: #f97316; }
        .cls { color: #facc15; font-weight: 600; }
        .cmt { color: #64748b; font-style: italic; }
      }

      .code-overlay-badge {
        position: absolute;
        bottom: -15px;
        right: -15px;
        padding: 0.8rem 1.2rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        background: rgba(16, 21, 34, 0.95);
        border: 1px solid var(--border-glow);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);

        .avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--cyber-cyan);
        }

        .badge-text {
          display: flex;
          flex-direction: column;

          .dev-name {
            font-weight: 700;
            font-size: 0.9rem;
          }
          .dev-role {
            font-size: 0.75rem;
            color: var(--text-muted);
          }
        }

        .active-badge {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 600;
        }
      }
    }

    @media (max-width: 992px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      .code-overlay-badge {
        position: relative;
        bottom: 0;
        right: 0;
        margin: 1rem;
      }
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class HeroComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }

  onResumeClick = output<void>();

  triggerResume(event: Event) {
    event.preventDefault();
    this.onResumeClick.emit();
  }
}
