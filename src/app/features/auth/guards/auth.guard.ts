import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../models/auth.model';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isInitializing()) {
    // Still initializing, let the auth state resolve
    return true;
  }

  if (authService.isAuthenticated()) {
    return true;
  }

  // Not authenticated, redirect to login
  return router.parseUrl('/auth/login');
};

export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isInitializing()) {
    // Still initializing, let the auth state resolve
    return true;
  }

  if (authService.isAuthenticated()) {
    // Already authenticated, redirect to admin dashboard
    return router.parseUrl('/admin/dashboard');
  }

  // Not authenticated, allow access to public routes
  return true;
};
