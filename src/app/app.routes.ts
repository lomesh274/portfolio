import { Routes } from '@angular/router';
import { PortfolioViewComponent } from './pages/portfolio-view/portfolio-view';
import { AdminDashboardComponent } from './pages/admin/admin';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: PortfolioViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
