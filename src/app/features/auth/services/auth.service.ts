import { Injectable, signal, computed } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User as AppUser, LoginCredentials, RegisterData, AuthStatus } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _user = signal<AppUser | null>(null);
  private readonly _authStatus = signal<AuthStatus>(AuthStatus.INITIALIZING);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly user = this._user.asReadonly();
  readonly authStatus = computed(() => this._authStatus());
  readonly error = this._error.asReadonly();
  readonly isAuthenticated = computed(() => this._authStatus() === AuthStatus.AUTHENTICATED);
  readonly isInitializing = computed(() => this._authStatus() === AuthStatus.INITIALIZING);

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    onAuthStateChanged(this.auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || undefined,
          photoURL: firebaseUser.photoURL || undefined
        };
        this._user.set(appUser);
        this._authStatus.set(AuthStatus.AUTHENTICATED);
        this._error.set(null);
      } else {
        this._user.set(null);
        this._authStatus.set(AuthStatus.UNAUTHENTICATED);
        this._error.set(null);
      }
    }, (error: any) => {
      console.error('Auth state change error:', error);
      this._authStatus.set(AuthStatus.ERROR);
      this._error.set(error.message);
    });
  }

  login(credentials: LoginCredentials): Observable<void> {
    this._authStatus.set(AuthStatus.INITIALIZING);
    this._error.set(null);

    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
      map(() => {
        // Auth state change will be handled by onAuthStateChanged
        this.router.navigate(['/admin/dashboard']);
      }),
      catchError((error) => {
        this._authStatus.set(AuthStatus.ERROR);
        this._error.set(this.getErrorMessage(error.code));
        return throwError(() => error);
      })
    );
  }

  register(data: RegisterData): Observable<void> {
    this._authStatus.set(AuthStatus.INITIALIZING);
    this._error.set(null);

    return from(createUserWithEmailAndPassword(this.auth, data.email, data.password)).pipe(
      map(() => {
        // Auth state change will be handled by onAuthStateChanged
        this.router.navigate(['/admin/dashboard']);
      }),
      catchError((error) => {
        this._authStatus.set(AuthStatus.ERROR);
        this._error.set(this.getErrorMessage(error.code));
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      map(() => {
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => error);
      })
    );
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'An error occurred during authentication.';
    }
  }
}
