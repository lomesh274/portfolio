import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/components/home.component').then(m => m.HomeComponent as any),
    title: 'Home | Developer Portfolio',
    canActivate: [publicGuard]
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/components/projects.component').then(m => m.ProjectsComponent as any),
    title: 'Projects | Developer Portfolio',
    canActivate: [publicGuard]
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./features/project-detail/components/project-detail.component').then(m => m.ProjectDetailComponent as any),
    title: 'Project Details | Developer Portfolio',
    canActivate: [publicGuard]
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/components/contact.component').then(m => m.ContactComponent as any),
    title: 'Contact | Developer Portfolio',
    canActivate: [publicGuard]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent as any),
        title: 'Login | Developer Portfolio',
        canActivate: [publicGuard]
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/components/dashboard/dashboard.component').then(m => m.DashboardComponent as any),
        title: 'Admin Dashboard | Developer Portfolio'
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/admin/project-management/project-list/project-list.component').then(m => m.ProjectListComponent as any),
            title: 'Admin Projects | Developer Portfolio'
          },
          {
            path: 'add',
            loadComponent: () => import('./features/admin/project-management/project-form/project-form.component').then(m => m.ProjectFormComponent as any),
            title: 'Add Project | Developer Portfolio'
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./features/admin/project-management/project-form/project-form.component').then(m => m.ProjectFormComponent as any),
            title: 'Edit Project | Developer Portfolio'
          }
        ]
      },
      {
        path: 'experience',
        loadComponent: () => import('./features/admin/experience-management/experience-list/experience-list.component').then(m => m.ExperienceListComponent as any),
        title: 'Experience Management | Developer Portfolio'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent as any),
    title: 'Page Not Found | Developer Portfolio'
  }
];
