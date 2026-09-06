import { Injectable, signal, effect, inject } from '@angular/core';
import { PORTFOLIO_DATA, PortfolioData, Skill, Project, Experience } from '../data/portfolio-data';
import { FirebaseService } from './firebase.service';

const STORAGE_KEY = 'ng_portfolio_lomesh_yadav_v2';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private firebaseService = inject(FirebaseService);

  // Reactive Signals for global dynamic data
  readonly portfolioData = signal<PortfolioData>(this.loadInitialLocalData());
  readonly isFirebaseConnected = signal<boolean>(false);
  readonly isSyncing = signal<boolean>(false);

  constructor() {
    // Attempt background sync from Cloud Firestore on startup
    this.initFirebaseSync();

    // Auto-sync with LocalStorage and Firebase whenever portfolioData changes
    effect(() => {
      const data = this.portfolioData();
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    });
  }

  private loadInitialLocalData(): PortfolioData {
    if (typeof window !== 'undefined' && localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed?.personal?.avatarUrl?.includes('unsplash.com')) {
            parsed.personal.avatarUrl = 'assets/images/lomesh-avatar.jpg';
          }
          if (!parsed?.personal?.resumeUrl || parsed?.personal?.resumeUrl === '#resume') {
            parsed.personal.resumeUrl = 'assets/resume/Lomesh_Yadav_Resume.pdf';
          }
          return parsed;
        } catch (e) {
          console.error('Error parsing local portfolio data:', e);
        }
      }
    }
    return PORTFOLIO_DATA;
  }

  private async initFirebaseSync() {
    this.isSyncing.set(true);
    const remoteData = await this.firebaseService.loadPortfolioFromFirebase();
    if (remoteData) {
      let needsSave = false;
      if (!remoteData.personal?.avatarUrl || remoteData.personal.avatarUrl.includes('unsplash.com')) {
        remoteData.personal.avatarUrl = 'assets/images/lomesh-avatar.jpg';
        needsSave = true;
      }
      if (!remoteData.personal?.resumeUrl || remoteData.personal.resumeUrl === '#resume') {
        remoteData.personal.resumeUrl = 'assets/resume/Lomesh_Yadav_Resume.pdf';
        needsSave = true;
      }
      if (needsSave) {
        await this.firebaseService.savePortfolioToFirebase(remoteData);
      }
      this.portfolioData.set(remoteData);
      this.isFirebaseConnected.set(true);
    } else {
      // First time initialization: push current initial data to Firebase
      await this.saveToFirebase(this.portfolioData());
    }
    this.isSyncing.set(false);
  }

  async saveToFirebase(data: PortfolioData = this.portfolioData()): Promise<boolean> {
    this.isSyncing.set(true);
    const success = await this.firebaseService.savePortfolioToFirebase(data);
    if (success) {
      this.isFirebaseConnected.set(true);
    }
    this.isSyncing.set(false);
    return success;
  }

  // Update Personal Info
  updatePersonal(personal: PortfolioData['personal']) {
    this.portfolioData.update(data => {
      const updated = { ...data, personal: { ...personal } };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  // Skills CRUD
  addSkill(skill: Skill) {
    this.portfolioData.update(data => {
      const updated = { ...data, skills: [skill, ...data.skills] };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  updateSkill(index: number, updatedSkill: Skill) {
    this.portfolioData.update(data => {
      const newSkills = [...data.skills];
      newSkills[index] = updatedSkill;
      const updated = { ...data, skills: newSkills };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  deleteSkill(index: number) {
    this.portfolioData.update(data => {
      const updated = { ...data, skills: data.skills.filter((_, i) => i !== index) };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  // Projects CRUD
  addProject(project: Project) {
    this.portfolioData.update(data => {
      const updated = { ...data, projects: [project, ...data.projects] };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  updateProject(index: number, updatedProject: Project) {
    this.portfolioData.update(data => {
      const newProjects = [...data.projects];
      newProjects[index] = updatedProject;
      const updated = { ...data, projects: newProjects };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  deleteProject(index: number) {
    this.portfolioData.update(data => {
      const updated = { ...data, projects: data.projects.filter((_, i) => i !== index) };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  // Experiences CRUD
  addExperience(exp: Experience) {
    this.portfolioData.update(data => {
      const updated = { ...data, experiences: [exp, ...data.experiences] };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  updateExperience(index: number, updatedExp: Experience) {
    this.portfolioData.update(data => {
      const newExps = [...data.experiences];
      newExps[index] = updatedExp;
      const updated = { ...data, experiences: newExps };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  deleteExperience(index: number) {
    this.portfolioData.update(data => {
      const updated = { ...data, experiences: data.experiences.filter((_, i) => i !== index) };
      this.saveToFirebase(updated);
      return updated;
    });
  }

  // Reset to original preset data
  async resetToDefault() {
    this.portfolioData.set(PORTFOLIO_DATA);
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
    await this.saveToFirebase(PORTFOLIO_DATA);
  }
}
