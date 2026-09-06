import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { Skill, Project, Experience } from '../../data/portfolio-data';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, FormsModule, UpperCasePipe],
  template: `
    <div class="admin-page">
      <!-- Admin Top Navbar -->
      <header class="admin-header glass-card">
        <div class="container header-inner">
          <div class="brand">
            <span class="shield-icon"><i class="fa-solid fa-user-shield"></i></span>
            <div class="brand-text">
              <h1>Portfolio Admin Control Panel</h1>
              <div class="firebase-status">
                <i class="fa-solid fa-fire fire-icon"></i>
                <span>Firebase: e-commers-82209</span>
                @if (isSyncing()) {
                  <span class="badge sync-badge"><i class="fa-solid fa-spinner fa-spin"></i> Syncing...</span>
                } @else if (isFirebaseConnected()) {
                  <span class="badge live-badge"><i class="fa-solid fa-circle-check"></i> Cloud Synced</span>
                }
              </div>
            </div>
          </div>

          <div class="actions">
            <button (click)="syncNow()" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-cloud-arrow-up"></i> Sync to Firebase
            </button>
            <button (click)="resetDefaults()" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-rotate-left"></i> Reset Defaults
            </button>
            <a [routerLink]="['/']" class="btn btn-angular btn-sm">
              <i class="fa-solid fa-eye"></i> View Live Portfolio
            </a>
            <button (click)="logout()" class="btn btn-outline btn-sm logout-btn">
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Toast Notification -->
      @if (toastMessage()) {
        <div class="toast-notification">
          <i class="fa-solid fa-circle-check"></i> {{ toastMessage() }}
        </div>
      }

      <div class="container main-admin-container">
        <!-- Tab Navigation -->
        <div class="admin-tabs">
          <button class="tab-btn" [class.active]="activeTab() === 'personal'" (click)="setTab('personal')">
            <i class="fa-solid fa-id-card"></i> Personal Profile
          </button>
          <button class="tab-btn" [class.active]="activeTab() === 'skills'" (click)="setTab('skills')">
            <i class="fa-solid fa-code"></i> Skills Manager ({{ portfolio.skills.length }})
          </button>
          <button class="tab-btn" [class.active]="activeTab() === 'projects'" (click)="setTab('projects')">
            <i class="fa-solid fa-rocket"></i> Projects Manager ({{ portfolio.projects.length }})
          </button>
          <button class="tab-btn" [class.active]="activeTab() === 'experience'" (click)="setTab('experience')">
            <i class="fa-solid fa-briefcase"></i> Work History ({{ portfolio.experiences.length }})
          </button>
        </div>

        <!-- Tab 1: Personal Info -->
        @if (activeTab() === 'personal') {
          <div class="tab-content glass-card">
            <h2><i class="fa-solid fa-user-gear"></i> Edit Personal & Professional Profile</h2>
            <form (ngSubmit)="savePersonal()">
              <div class="form-grid">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" [(ngModel)]="personalForm.name" name="name" class="form-input" required />
                </div>

                <div class="form-group">
                  <label>Job Title</label>
                  <input type="text" [(ngModel)]="personalForm.title" name="title" class="form-input" required />
                </div>

                <div class="form-group">
                  <label>Years of Experience (e.g. "3.10 Years")</label>
                  <input type="text" [(ngModel)]="personalForm.yearsOfExperience" name="yearsOfExperience" class="form-input" required />
                </div>

                <div class="form-group">
                  <label>Email Address</label>
                  <input type="email" [(ngModel)]="personalForm.email" name="email" class="form-input" required />
                </div>

                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="text" [(ngModel)]="personalForm.phone" name="phone" class="form-input" required />
                </div>

                <div class="form-group">
                  <label>Location</label>
                  <input type="text" [(ngModel)]="personalForm.location" name="location" class="form-input" required />
                </div>

                <div class="form-group full-col">
                  <label>Avatar / Profile Image URL (Firebase Storage Link: e-commers-82209.firebasestorage.app)</label>
                  <input type="text" [(ngModel)]="personalForm.avatarUrl" name="avatarUrl" class="form-input" required />
                </div>

                <div class="form-group full-col">
                  <label>Professional Availability Tag</label>
                  <input type="text" [(ngModel)]="personalForm.availability" name="availability" class="form-input" required />
                </div>

                <div class="form-group full-col">
                  <label>Summary Bio</label>
                  <textarea rows="4" [(ngModel)]="personalForm.bio" name="bio" class="form-input" required></textarea>
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-angular">
                  <i class="fa-solid fa-floppy-disk"></i> Save & Push to Firebase
                </button>
              </div>
            </form>
          </div>
        }

        <!-- Tab 2: Skills Manager -->
        @if (activeTab() === 'skills') {
          <div class="tab-content glass-card">
            <div class="content-header">
              <h2><i class="fa-solid fa-sliders"></i> Manage Skills & Proficiency</h2>
              <button (click)="openAddSkillModal()" class="btn btn-angular btn-sm">
                <i class="fa-solid fa-plus"></i> Add New Skill
              </button>
            </div>

            <div class="items-list">
              @for (skill of portfolio.skills; track skill.name; let i = $index) {
                <div class="list-item glass-card">
                  <div class="item-icon">
                    <i [class]="skill.icon"></i>
                  </div>
                  <div class="item-info">
                    <h4>{{ skill.name }}</h4>
                    <span class="item-sub">{{ skill.category | uppercase }} • Level: {{ skill.level }}%</span>
                  </div>
                  <div class="item-actions">
                    <button (click)="editSkill(i)" class="action-btn edit" title="Edit Skill"><i class="fa-solid fa-pen"></i></button>
                    <button (click)="deleteSkill(i)" class="action-btn delete" title="Delete Skill"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Tab 3: Projects Manager -->
        @if (activeTab() === 'projects') {
          <div class="tab-content glass-card">
            <div class="content-header">
              <h2><i class="fa-solid fa-folder-open"></i> Manage Portfolio Projects</h2>
              <button (click)="openAddProjectModal()" class="btn btn-angular btn-sm">
                <i class="fa-solid fa-plus"></i> Add New Project
              </button>
            </div>

            <div class="items-list">
              @for (project of portfolio.projects; track project.id; let i = $index) {
                <div class="list-item glass-card">
                  <img [src]="project.imageUrl" [alt]="project.title" class="item-thumb" />
                  <div class="item-info">
                    <h4>{{ project.title }}</h4>
                    <span class="item-sub">{{ project.category | uppercase }} • {{ project.shortDescription }}</span>
                  </div>
                  <div class="item-actions">
                    <button (click)="editProject(i)" class="action-btn edit" title="Edit Project"><i class="fa-solid fa-pen"></i></button>
                    <button (click)="deleteProject(i)" class="action-btn delete" title="Delete Project"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Tab 4: Work Experience Manager -->
        @if (activeTab() === 'experience') {
          <div class="tab-content glass-card">
            <div class="content-header">
              <h2><i class="fa-solid fa-building-user"></i> Manage Work Experience & Companies</h2>
              <button (click)="openAddExperienceModal()" class="btn btn-angular btn-sm">
                <i class="fa-solid fa-plus"></i> Add New Role
              </button>
            </div>

            <div class="items-list">
              @for (exp of portfolio.experiences; track exp.id; let i = $index) {
                <div class="list-item glass-card">
                  <div class="item-icon company-icon">
                    <i class="fa-solid fa-building"></i>
                  </div>
                  <div class="item-info">
                    <h4>{{ exp.role }}</h4>
                    <span class="item-sub">{{ exp.company }} • {{ exp.location }} ({{ exp.period }})</span>
                  </div>
                  <div class="item-actions">
                    <button (click)="editExperience(i)" class="action-btn edit" title="Edit Experience"><i class="fa-solid fa-pen"></i></button>
                    <button (click)="deleteExperience(i)" class="action-btn delete" title="Delete Experience"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Add/Edit Skill Modal Popup -->
      @if (editingSkillModal()) {
        <div class="modal-backdrop" (click)="closeSkillModal()">
          <div class="modal-card glass-card" (click)="$event.stopPropagation()">
            <h3>{{ editingSkillIndex() !== null ? 'Edit Skill' : 'Add New Skill' }}</h3>
            <form (ngSubmit)="saveSkill()">
              <div class="form-group">
                <label>Skill Name</label>
                <input type="text" [(ngModel)]="skillForm.name" name="skillName" class="form-input" required />
              </div>

              <div class="form-group">
                <label>Category</label>
                <select [(ngModel)]="skillForm.category" name="skillCategory" class="form-input">
                  <option value="angular">Angular</option>
                  <option value="react">React</option>
                  <option value="frontend">Frontend</option>
                  <option value="tools">Tools</option>
                </select>
              </div>

              <div class="form-group">
                <label>Proficiency Level (0 - 100%)</label>
                <input type="number" min="0" max="100" [(ngModel)]="skillForm.level" name="skillLevel" class="form-input" required />
              </div>

              <div class="form-group">
                <label>FontAwesome Icon Class (e.g. "fa-brands fa-angular")</label>
                <input type="text" [(ngModel)]="skillForm.icon" name="skillIcon" class="form-input" required />
              </div>

              <div class="modal-btn-row">
                <button type="submit" class="btn btn-angular">Save Skill to Firebase</button>
                <button type="button" (click)="closeSkillModal()" class="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Add/Edit Project Modal Popup -->
      @if (editingProjectModal()) {
        <div class="modal-backdrop" (click)="closeProjectModal()">
          <div class="modal-card glass-card" (click)="$event.stopPropagation()">
            <h3>{{ editingProjectIndex() !== null ? 'Edit Project' : 'Add New Project' }}</h3>
            <form (ngSubmit)="saveProject()">
              <div class="form-group">
                <label>Project Title</label>
                <input type="text" [(ngModel)]="projectForm.title" name="pTitle" class="form-input" required />
              </div>

              <div class="form-group">
                <label>Category</label>
                <select [(ngModel)]="projectForm.category" name="pCategory" class="form-input">
                  <option value="angular">Angular</option>
                  <option value="react">React</option>
                  <option value="fullstack">Fullstack</option>
                </select>
              </div>

              <div class="form-group">
                <label>Firebase Storage Image URL (e.g. https://firebasestorage.googleapis.com/...)</label>
                <input type="text" [(ngModel)]="projectForm.imageUrl" name="pImageUrl" class="form-input" required />
              </div>

              <div class="form-group">
                <label>Short Description</label>
                <input type="text" [(ngModel)]="projectForm.shortDescription" name="pShortDesc" class="form-input" required />
              </div>

              <div class="form-group">
                <label>Full Architectural Description</label>
                <textarea rows="3" [(ngModel)]="projectForm.fullDescription" name="pFullDesc" class="form-input" required></textarea>
              </div>

              <div class="form-group">
                <label>Tags (comma separated e.g. "Angular 20, Signals, Firebase")</label>
                <input type="text" [(ngModel)]="projectTagsInput" name="pTags" class="form-input" required />
              </div>

              <div class="form-group">
                <label>Live Demo URL (Optional)</label>
                <input type="text" [(ngModel)]="projectForm.demoUrl" name="pDemoUrl" class="form-input" />
              </div>

              <div class="form-group">
                <label>GitHub Code URL (Optional)</label>
                <input type="text" [(ngModel)]="projectForm.githubUrl" name="pGithubUrl" class="form-input" />
              </div>

              <div class="modal-btn-row">
                <button type="submit" class="btn btn-angular">Save Project to Firebase</button>
                <button type="button" (click)="closeProjectModal()" class="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Add/Edit Work Experience Modal Popup -->
      @if (editingExperienceModal()) {
        <div class="modal-backdrop" (click)="closeExperienceModal()">
          <div class="modal-card glass-card modal-large" (click)="$event.stopPropagation()">
            <h3>{{ editingExperienceIndex() !== null ? 'Edit Work Experience' : 'Add New Work Experience' }}</h3>
            <form (ngSubmit)="saveExperience()">
              <div class="form-grid">
                <div class="form-group">
                  <label>Role Title</label>
                  <input type="text" [(ngModel)]="experienceForm.role" name="expRole" class="form-input" required placeholder="e.g. Senior Angular Engineer" />
                </div>

                <div class="form-group">
                  <label>Company Name</label>
                  <input type="text" [(ngModel)]="experienceForm.company" name="expCompany" class="form-input" required placeholder="e.g. VisionWaves" />
                </div>

                <div class="form-group">
                  <label>Location</label>
                  <input type="text" [(ngModel)]="experienceForm.location" name="expLocation" class="form-input" required placeholder="e.g. Indore, India" />
                </div>

                <div class="form-group">
                  <label>Period (e.g. "Feb 2026 - Present")</label>
                  <input type="text" [(ngModel)]="experienceForm.period" name="expPeriod" class="form-input" required placeholder="Feb 2026 - Present" />
                </div>

                <div class="form-group">
                  <label>Employment Type</label>
                  <select [(ngModel)]="experienceForm.type" name="expType" class="form-input">
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div class="form-group full-col">
                  <label>Role Description</label>
                  <textarea rows="3" [(ngModel)]="experienceForm.description" name="expDesc" class="form-input" required placeholder="Summary of responsibilities and scope..."></textarea>
                </div>

                <div class="form-group full-col">
                  <label>Key Accomplishments (One per line)</label>
                  <textarea rows="3" [(ngModel)]="experienceAchievementsInput" name="expAch" class="form-input" placeholder="Worked on splitting ITSM modules into Angular micro frontends...&#10;Prototyped select UI pieces in React..."></textarea>
                </div>

                <div class="form-group full-col">
                  <label>Technologies Used (comma separated)</label>
                  <input type="text" [(ngModel)]="experienceTechInput" name="expTech" class="form-input" placeholder="Angular 20, Micro Frontends, RxJS, Cursor AI" />
                </div>
              </div>

              <div class="modal-btn-row">
                <button type="submit" class="btn btn-angular">Save Experience to Firebase</button>
                <button type="button" (click)="closeExperienceModal()" class="btn btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-page {
      min-height: 100vh;
      background: var(--bg-primary);
      color: var(--text-primary);
      padding-bottom: 5rem;
    }

    .admin-header {
      padding: 1.2rem 0;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 2rem;

      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        flex-wrap: wrap;

        .brand {
          display: flex;
          align-items: center;
          gap: 1rem;

          .shield-icon {
            width: 46px;
            height: 46px;
            border-radius: var(--radius-sm);
            background: var(--primary-gradient);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
          }

          h1 {
            font-size: 1.3rem;
            font-weight: 800;
            line-height: 1.2;
          }

          .firebase-status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            color: var(--text-secondary);

            .fire-icon {
              color: #ffca28;
            }

            .badge {
              padding: 0.15rem 0.5rem;
              border-radius: var(--radius-full);
              font-size: 0.7rem;
              font-weight: 600;

              &.live-badge {
                background: rgba(16, 185, 129, 0.15);
                color: #10b981;
              }

              &.sync-badge {
                background: rgba(245, 158, 11, 0.15);
                color: #f59e0b;
              }
            }
          }
        }

        .actions {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;

          .logout-btn:hover {
            border-color: #ef4444;
            color: #ef4444;
          }
        }
      }
    }

    .toast-notification {
      position: fixed;
      top: 90px;
      right: 20px;
      z-index: 2000;
      background: #10b981;
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: var(--radius-full);
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      animation: fadeIn 0.3s ease;
    }

    .admin-tabs {
      display: flex;
      gap: 0.8rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;

      .tab-btn {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: 0.8rem 1.4rem;
        border-radius: var(--radius-sm);
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        &:hover {
          color: white;
          border-color: var(--border-glow);
        }

        &.active {
          background: var(--primary-gradient);
          color: white;
          border-color: transparent;
        }
      }
    }

    .tab-content {
      padding: 2.2rem;

      h2 {
        font-size: 1.3rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: var(--text-primary);

        i {
          color: var(--cyber-purple);
        }
      }

      .content-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.2rem;

      .full-col {
        grid-column: span 2;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-secondary);
      }

      .form-input {
        background: rgba(10, 13, 20, 0.7);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        padding: 0.8rem 1rem;
        color: white;
        font-family: var(--font-sans);
        font-size: 0.95rem;
        outline: none;

        &:focus {
          border-color: var(--cyber-purple);
        }
      }
    }

    .form-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .list-item {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;

      .item-icon {
        width: 44px;
        height: 44px;
        border-radius: 8px;
        background: rgba(99, 102, 241, 0.15);
        color: var(--cyber-purple);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
      }

      .item-thumb {
        width: 60px;
        height: 42px;
        border-radius: 6px;
        object-fit: cover;
      }

      .item-info {
        flex-grow: 1;

        h4 {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .item-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      }

      .item-actions {
        display: flex;
        gap: 0.5rem;

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          cursor: pointer;

          &.edit:hover { background: var(--cyber-purple); }
          &.delete:hover { background: #ef4444; }
        }
      }
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-card {
      width: 100%;
      max-width: 550px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2rem;
      background: #0f1522;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-glow);

      &.modal-large {
        max-width: 720px;
      }

      h3 {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
      }

      .modal-btn-row {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .form-grid { grid-template-columns: 1fr; .full-col { grid-column: span 1; } }
    }
  `]
})
export class AdminDashboardComponent {
  private portfolioService = inject(PortfolioService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected get portfolio() { return this.portfolioService.portfolioData(); }
  protected get isFirebaseConnected() { return this.portfolioService.isFirebaseConnected; }
  protected get isSyncing() { return this.portfolioService.isSyncing; }

  protected activeTab = signal<'personal' | 'skills' | 'projects' | 'experience'>('personal');
  protected toastMessage = signal<string | null>(null);

  // Forms State
  personalForm = { ...this.portfolio.personal };

  // Skill Modal
  editingSkillModal = signal(false);
  editingSkillIndex = signal<number | null>(null);
  skillForm: Skill = { name: '', level: 90, category: 'angular', icon: 'fa-brands fa-angular' };

  // Project Modal
  editingProjectModal = signal(false);
  editingProjectIndex = signal<number | null>(null);
  projectForm: Project = {
    id: '',
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'angular',
    tags: [],
    imageUrl: '',
    fallbackImageUrl: 'assets/images/project-ai-dashboard.jpg',
    highlights: []
  };
  projectTagsInput = '';

  // Experience Modal
  editingExperienceModal = signal(false);
  editingExperienceIndex = signal<number | null>(null);
  experienceForm: Experience = {
    id: '',
    role: '',
    company: '',
    location: '',
    period: '',
    type: 'Full-time',
    description: '',
    achievements: [],
    technologies: []
  };
  experienceAchievementsInput = '';
  experienceTechInput = '';

  setTab(tab: 'personal' | 'skills' | 'projects' | 'experience') {
    this.activeTab.set(tab);
    if (tab === 'personal') {
      this.personalForm = { ...this.portfolio.personal };
    }
  }

  showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async syncNow() {
    const success = await this.portfolioService.saveToFirebase();
    if (success) {
      this.showToast('Synced to Firebase Cloud!');
    } else {
      this.showToast('Firebase sync failed. Check internet connection.');
    }
  }

  savePersonal() {
    this.portfolioService.updatePersonal(this.personalForm);
    this.showToast('Profile saved & synced to Firebase!');
  }

  async resetDefaults() {
    if (confirm('Are you sure you want to reset all portfolio data to defaults?')) {
      await this.portfolioService.resetToDefault();
      this.personalForm = { ...this.portfolio.personal };
      this.showToast('Portfolio reset & synced to Firebase!');
    }
  }

  // Skills
  openAddSkillModal() {
    this.editingSkillIndex.set(null);
    this.skillForm = { name: '', level: 90, category: 'angular', icon: 'fa-brands fa-angular' };
    this.editingSkillModal.set(true);
  }

  editSkill(index: number) {
    this.editingSkillIndex.set(index);
    this.skillForm = { ...this.portfolio.skills[index] };
    this.editingSkillModal.set(true);
  }

  deleteSkill(index: number) {
    if (confirm('Delete this skill?')) {
      this.portfolioService.deleteSkill(index);
      this.showToast('Skill deleted & synced to Firebase!');
    }
  }

  saveSkill() {
    const idx = this.editingSkillIndex();
    if (idx !== null) {
      this.portfolioService.updateSkill(idx, this.skillForm);
      this.showToast('Skill updated & synced to Firebase!');
    } else {
      this.portfolioService.addSkill(this.skillForm);
      this.showToast('Skill added & synced to Firebase!');
    }
    this.closeSkillModal();
  }

  closeSkillModal() {
    this.editingSkillModal.set(false);
  }

  // Projects
  openAddProjectModal() {
    this.editingProjectIndex.set(null);
    this.projectForm = {
      id: 'proj-' + Date.now(),
      title: '',
      shortDescription: '',
      fullDescription: '',
      category: 'angular',
      tags: ['Angular 20', 'Signals'],
      imageUrl: 'https://e-commers-82209.firebasestorage.app/o/project.jpg',
      fallbackImageUrl: 'assets/images/project-ai-dashboard.jpg',
      highlights: ['High speed reactive UI', 'Enterprise architecture']
    };
    this.projectTagsInput = 'Angular 20, Signals, Firebase';
    this.editingProjectModal.set(true);
  }

  editProject(index: number) {
    this.editingProjectIndex.set(index);
    this.projectForm = { ...this.portfolio.projects[index] };
    this.projectTagsInput = this.projectForm.tags.join(', ');
    this.editingProjectModal.set(true);
  }

  deleteProject(index: number) {
    if (confirm('Delete this project?')) {
      this.portfolioService.deleteProject(index);
      this.showToast('Project deleted & synced to Firebase!');
    }
  }

  saveProject() {
    this.projectForm.tags = this.projectTagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const idx = this.editingProjectIndex();
    if (idx !== null) {
      this.portfolioService.updateProject(idx, this.projectForm);
      this.showToast('Project updated & synced to Firebase!');
    } else {
      this.portfolioService.addProject(this.projectForm);
      this.showToast('Project added & synced to Firebase!');
    }
    this.closeProjectModal();
  }

  closeProjectModal() {
    this.editingProjectModal.set(false);
  }

  // Work Experience
  openAddExperienceModal() {
    this.editingExperienceIndex.set(null);
    this.experienceForm = {
      id: 'exp-' + Date.now(),
      role: '',
      company: '',
      location: 'Indore, India',
      period: 'Feb 2026 - Present',
      type: 'Full-time',
      description: '',
      achievements: [],
      technologies: []
    };
    this.experienceAchievementsInput = '';
    this.experienceTechInput = 'Angular 20, Micro Frontends, RxJS, Cursor AI';
    this.editingExperienceModal.set(true);
  }

  editExperience(index: number) {
    this.editingExperienceIndex.set(index);
    const item = this.portfolio.experiences[index];
    this.experienceForm = { ...item };
    this.experienceAchievementsInput = item.achievements.join('\n');
    this.experienceTechInput = item.technologies.join(', ');
    this.editingExperienceModal.set(true);
  }

  deleteExperience(index: number) {
    if (confirm('Delete this experience entry?')) {
      this.portfolioService.deleteExperience(index);
      this.showToast('Experience deleted & synced to Firebase!');
    }
  }

  saveExperience() {
    this.experienceForm.achievements = this.experienceAchievementsInput
      .split('\n')
      .map(a => a.trim())
      .filter(Boolean);
      
    this.experienceForm.technologies = this.experienceTechInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const idx = this.editingExperienceIndex();
    if (idx !== null) {
      this.portfolioService.updateExperience(idx, this.experienceForm);
      this.showToast('Experience updated & synced to Firebase!');
    } else {
      this.portfolioService.addExperience(this.experienceForm);
      this.showToast('Experience added & synced to Firebase!');
    }
    this.closeExperienceModal();
  }

  closeExperienceModal() {
    this.editingExperienceModal.set(false);
  }
}
