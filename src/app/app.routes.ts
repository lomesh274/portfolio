import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/components/home.component').then(m => m.HomeComponent as any),
    title: 'Home | Developer Portfolio'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/components/projects.component').then(m => m.ProjectsComponent as any),
    title: 'Projects | Developer Portfolio'
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./features/project-detail/components/project-detail.component').then(m => m.ProjectDetailComponent as any),
    title: 'Project Details | Developer Portfolio'
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/components/resume.component').then(m => m.ResumeComponent as any),
    title: 'Resume | Developer Portfolio'
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/components/contact.component').then(m => m.ContactComponent as any),
    title: 'Contact | Developer Portfolio'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent as any),
    title: 'Page Not Found | Developer Portfolio'
  }
];
