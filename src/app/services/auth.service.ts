import { Injectable, signal } from '@angular/core';
import { FIREBASE_CONFIG } from './firebase.service';

const AUTH_STORAGE_KEY = 'ng_portfolio_admin_auth_v2';
const TOKEN_STORAGE_KEY = 'ng_portfolio_firebase_token';
const FIREBASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_CONFIG.apiKey}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn = signal<boolean>(this.checkInitialAuth());
  readonly userEmail = signal<string | null>(this.getStoredEmail());
  readonly idToken = signal<string | null>(this.getStoredToken());

  private checkInitialAuth(): boolean {
    if (typeof window !== 'undefined') {
      const fromLocal = localStorage?.getItem(AUTH_STORAGE_KEY) === 'true';
      const fromSession = sessionStorage?.getItem(AUTH_STORAGE_KEY) === 'true';
      return fromLocal || fromSession;
    }
    return false;
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage?.getItem(TOKEN_STORAGE_KEY) || sessionStorage?.getItem(TOKEN_STORAGE_KEY) || null;
    }
    return null;
  }

  private getStoredEmail(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage?.getItem('ng_portfolio_admin_email') || sessionStorage?.getItem('ng_portfolio_admin_email') || null;
    }
    return null;
  }

  /**
   * Authenticate Admin via Firebase Auth REST API (signInWithPassword)
   */
  async loginWithFirebase(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      // 1. Try Firebase Auth REST API
      const response = await fetch(FIREBASE_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          returnSecureToken: true
        })
      });

      const data = await response.json();

      if (response.ok && data.idToken) {
        this.setAuthSuccess(data.idToken, data.email || email);
        return { success: true };
      }

      // Handle specific Firebase Auth errors
      if (data.error && data.error.message) {
        const msg = data.error.message;
        if (msg === 'EMAIL_NOT_FOUND' || msg === 'INVALID_PASSWORD' || msg === 'INVALID_LOGIN_CREDENTIALS') {
          // Allow admin fallback passcode for initial setup if account is not created in Firebase Console yet
          if ((password === 'admin123' || password === 'admin' || password === 'lomesh123') && email.includes('lomeshyadav')) {
            this.setAuthSuccess('fallback-admin-token', email);
            return { success: true };
          }
          return { success: false, error: 'Invalid email or password.' };
        }
        return { success: false, error: `Firebase Auth Error: ${msg}` };
      }

      return { success: false, error: 'Firebase authentication failed.' };
    } catch (err: any) {
      console.warn('Firebase Auth network warning:', err);
      // Fallback check if offline or network blocked
      if (password === 'admin123' || password === 'admin' || password === 'lomesh123') {
        this.setAuthSuccess('fallback-admin-token', email);
        return { success: true };
      }
      return { success: false, error: 'Unable to connect to Firebase Auth.' };
    }
  }

  private setAuthSuccess(token: string, email: string) {
    this.isLoggedIn.set(true);
    this.idToken.set(token);
    this.userEmail.set(email);

    if (typeof window !== 'undefined') {
      localStorage?.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage?.setItem(TOKEN_STORAGE_KEY, token);
      localStorage?.setItem('ng_portfolio_admin_email', email);

      sessionStorage?.setItem(AUTH_STORAGE_KEY, 'true');
      sessionStorage?.setItem(TOKEN_STORAGE_KEY, token);
      sessionStorage?.setItem('ng_portfolio_admin_email', email);
    }
  }

  logout() {
    this.isLoggedIn.set(false);
    this.idToken.set(null);
    this.userEmail.set(null);

    if (typeof window !== 'undefined') {
      localStorage?.removeItem(AUTH_STORAGE_KEY);
      localStorage?.removeItem(TOKEN_STORAGE_KEY);
      localStorage?.removeItem('ng_portfolio_admin_email');

      sessionStorage?.removeItem(AUTH_STORAGE_KEY);
      sessionStorage?.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage?.removeItem('ng_portfolio_admin_email');
    }
  }
}
