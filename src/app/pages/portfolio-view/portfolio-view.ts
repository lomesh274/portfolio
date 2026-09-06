import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { ProjectsComponent } from '../../components/projects/projects';
import { ExperienceComponent } from '../../components/experience/experience';
import { ContactComponent } from '../../components/contact/contact';
import { FooterComponent } from '../../components/footer/footer';
import { ResumeModalComponent } from '../../components/resume-modal/resume-modal';

@Component({
  selector: 'app-portfolio-view',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    ResumeModalComponent
  ],
  template: `
    <!-- Ambient Background Glow FX Orbs -->
    <div class="ambient-bg">
      <div class="glow-orb-1"></div>
      <div class="glow-orb-2"></div>
      <div class="glow-orb-3"></div>
    </div>

    <!-- Header Navigation -->
    <app-navbar (onResumeClick)="openResumeModal()"></app-navbar>

    <!-- Main Page Sections -->
    <main>
      <app-hero (onResumeClick)="openResumeModal()"></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-projects></app-projects>
      <app-experience></app-experience>
      <app-contact></app-contact>
    </main>

    <!-- Footer -->
    <app-footer></app-footer>

    <!-- Interactive Recruiter Resume Modal -->
    <app-resume-modal 
      [isOpen]="resumeModalOpen()" 
      (onClose)="closeResumeModal()">
    </app-resume-modal>
  `
})
export class PortfolioViewComponent {
  protected resumeModalOpen = signal(false);

  openResumeModal() {
    this.resumeModalOpen.set(true);
  }

  closeResumeModal() {
    this.resumeModalOpen.set(false);
  }
}
