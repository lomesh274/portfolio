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
          <!-- Mobile Profile Header Badge (Mobile Only) -->
          <div class="mobile-profile-hero glass-card">
            <img [src]="portfolio.personal.avatarUrl" [alt]="portfolio.personal.name" class="hero-profile-img" />
            <div class="profile-meta">
              <span class="hero-name">{{ portfolio.personal.name }}</span>
              <span class="hero-role">{{ portfolio.personal.title }}</span>
            </div>
            <span class="status-pulse"><i class="fa-solid fa-circle"></i> Available</span>
          </div>

          <!-- Experience Badge -->
          <div class="exp-badge">
            <span class="pulse-dot"></span>
            <i class="fa-brands fa-angular angular-icon"></i>
            <span>{{ portfolio.personal.title }} • {{ portfolio.personal.yearsOfExperience }} Exp</span>
          </div>

          <!-- Main Headline -->
          <h1 class="hero-title">
            Crafting High-Performance
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
            <a [href]="portfolio.personal.resumeUrl" target="_blank" download="Lomesh_Yadav_Resume.pdf" class="btn btn-outline">
              <i class="fa-solid fa-file-arrow-down"></i> Download Resume
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
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
      align-items: center;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .hero-text-col {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .hero-code-col {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
    }

    .exp-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.5rem 1.1rem;
      border-radius: var(--radius-full);
      background: rgba(221, 0, 49, 0.1);
      border: 1px solid rgba(221, 0, 49, 0.3);
      color: #ff4d6d;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      max-width: 100%;
      box-sizing: border-box;
      flex-wrap: wrap;

      span {
        white-space: normal;
        word-break: break-word;
        overflow-wrap: break-word;
      }

      .angular-icon {
        color: #dd0031;
        font-size: 1.1rem;
        flex-shrink: 0;
      }

      .pulse-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #10b981;
        box-shadow: 0 0 10px #10b981;
        animation: pulse 2s infinite;
        flex-shrink: 0;
      }
    }

    @keyframes pulse {
      0% { opacity: 0.4; }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0.4; }
    }

    .hero-title {
      font-size: clamp(1.8rem, 4.5vw, 3.8rem);
      font-weight: 900;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 1.5rem;
      word-break: break-word;
      overflow-wrap: break-word;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .hero-bio {
      font-size: 1.15rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2.2rem;
      max-width: 600px;
      width: 100%;
      box-sizing: border-box;
      word-break: break-word;
      overflow-wrap: break-word;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;

      .btn {
        max-width: 100%;
        box-sizing: border-box;
      }
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;

      .stat-card {
        padding: 1rem;
        text-align: center;
        border-radius: var(--radius-sm);
        min-width: 0;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;

        .stat-value {
          display: block;
          font-size: clamp(1rem, 3.5vw, 1.4rem);
          font-weight: 800;
          color: var(--text-primary);
          font-family: var(--font-mono);
          word-break: break-word;
          overflow-wrap: break-word;
          line-height: 1.25;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
          word-break: break-word;
          overflow-wrap: break-word;
          line-height: 1.2;
          display: block;
          margin-top: 0.2rem;
        }
      }
    }

    .code-window {
      position: relative;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
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
        gap: 0.5rem;
        min-width: 0;
        width: 100%;
        box-sizing: border-box;

        .window-controls {
          display: flex;
          gap: 0.4rem;
          flex-shrink: 0;

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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          flex: 1;
          text-align: center;
        }

        .window-lang {
          font-size: 0.75rem;
          color: var(--cyber-cyan);
          font-weight: 600;
          flex-shrink: 0;
        }
      }

      .window-body {
        padding: 1.5rem;
        background: #090d16;
        font-family: var(--font-mono);
        font-size: 0.875rem;
        line-height: 1.6;
        overflow-x: auto;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;

        pre {
          margin: 0;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        code {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          word-break: break-word;
          overflow-wrap: break-word;
        }

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
        max-width: calc(100% - 20px);
        box-sizing: border-box;

        .avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--cyber-cyan);
          flex-shrink: 0;
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
          flex-shrink: 0;
        }
      }
    }

    .mobile-profile-hero {
      display: none;
      align-items: center;
      gap: 0.8rem;
      padding: 0.75rem 1rem;
      margin-bottom: 1.2rem;
      border: 1px solid var(--border-glow);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;

      .hero-profile-img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--cyber-cyan);
        box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
        flex-shrink: 0;
      }

      .profile-meta {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        min-width: 0;

        .hero-name {
          font-weight: 800;
          font-size: 0.95rem;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-role {
          font-size: 0.72rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .status-pulse {
        font-size: 0.7rem;
        color: #10b981;
        background: rgba(16, 185, 129, 0.15);
        padding: 0.2rem 0.55rem;
        border-radius: var(--radius-full);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        flex-shrink: 0;

        i { font-size: 0.45rem; }
      }
    }

    @media (max-width: 992px) {
      .mobile-profile-hero {
        display: flex;
      }
      .hero-section {
        padding-top: calc(var(--nav-height) + 1.5rem);
        padding-bottom: 2.5rem;
      }
      .hero-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        width: 100%;
        max-width: 100%;
      }
      .hero-text-col, .hero-code-col {
        width: 100%;
        max-width: 100%;
        min-width: 0;
      }
      .code-overlay-badge {
        position: relative;
        bottom: 0;
        right: 0;
        margin: 1rem 0 0 0;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .hero-section {
        padding-top: calc(var(--nav-height) + 1rem);
      }
      .hero-title {
        font-size: 1.45rem;
        line-height: 1.25;
        letter-spacing: -0.01em;
      }
      .hero-bio {
        font-size: 0.92rem;
        line-height: 1.6;
      }
      .hero-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 0.8rem;

        .btn {
          width: 100%;
          justify-content: center;
        }
      }
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;

        .stat-card {
          padding: 0.7rem 0.4rem;
          .stat-value { font-size: 1.05rem; }
          .stat-label { font-size: 0.68rem; }
        }
      }
      .code-window .window-header {
        padding: 0.6rem 0.8rem;
        .window-title { font-size: 0.72rem; }
        .window-lang { font-size: 0.68rem; }
      }
      .code-window .window-body {
        font-size: 0.75rem;
        padding: 0.85rem;
      }
      .code-overlay-badge {
        padding: 0.6rem 0.8rem;
        gap: 0.5rem;
        flex-wrap: wrap;

        .avatar-img {
          width: 36px;
          height: 36px;
        }
        .badge-text {
          .dev-name { font-size: 0.82rem; }
          .dev-role { font-size: 0.68rem; }
        }
        .active-badge {
          font-size: 0.65rem;
          padding: 0.15rem 0.45rem;
        }
      }
    }
  `]
})
export class HeroComponent {
  private portfolioService = inject(PortfolioService);
  protected get portfolio() { return this.portfolioService.portfolioData(); }
}
