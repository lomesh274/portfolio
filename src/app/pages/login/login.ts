import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <!-- Ambient Orbs -->
      <div class="ambient-bg">
        <div class="glow-orb-1"></div>
        <div class="glow-orb-2"></div>
      </div>

      <div class="login-card glass-card">
        <div class="card-header">
          <div class="shield-badge">
            <i class="fa-solid fa-fire"></i>
          </div>
          <h2>Firebase Admin Authentication</h2>
          <p>Project: <strong>e-commers-82209</strong></p>
        </div>

        @if (errorMessage()) {
          <div class="error-badge">
            <i class="fa-solid fa-triangle-exclamation"></i> {{ errorMessage() }}
          </div>
        }

        <form (ngSubmit)="handleLogin()">
          <div class="form-group">
            <label for="adminEmail">Firebase Admin Email</label>
            <div class="input-wrapper">
              <i class="fa-solid fa-envelope input-icon"></i>
              <input 
                type="email" 
                id="adminEmail" 
                name="adminEmail" 
                [(ngModel)]="email" 
                required 
                placeholder="lomeshyadav101@gmail.com" 
                class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label for="adminPass">Firebase Password</label>
            <div class="input-wrapper">
              <i class="fa-solid fa-lock input-icon"></i>
              <input 
                type="password" 
                id="adminPass" 
                name="adminPass" 
                [(ngModel)]="password" 
                required 
                placeholder="Enter password (e.g. admin123)" 
                class="form-input" />
            </div>
          </div>

          <button type="submit" [disabled]="loading()" class="btn btn-angular full-width">
            @if (loading()) {
              <i class="fa-solid fa-spinner fa-spin"></i> Authenticating...
            } @else {
              <i class="fa-solid fa-right-to-bracket"></i> Login with Firebase Auth
            }
          </button>
        </form>

        <div class="card-footer">
          <a [routerLink]="['/']" class="back-link">
            <i class="fa-solid fa-arrow-left"></i> Return to Live Portfolio
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      position: relative;
    }

    .login-card {
      width: 100%;
      max-width: 440px;
      padding: 2.5rem;
      border: 1px solid var(--border-glow);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
      position: relative;
      z-index: 10;

      .card-header {
        text-align: center;
        margin-bottom: 2rem;

        .shield-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--accent-gradient-angular);
          color: #ffca28;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 1rem;
          box-shadow: 0 0 25px rgba(221, 0, 49, 0.5);
        }

        h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }

        p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          strong { color: var(--cyber-cyan); }
        }
      }

      .error-badge {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid #ef4444;
        color: #fca5a5;
        padding: 0.75rem 1rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .form-group {
        margin-bottom: 1.3rem;

        label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;

          .input-icon {
            position: absolute;
            left: 1rem;
            color: var(--cyber-purple);
            font-size: 1.1rem;
          }

          .form-input {
            width: 100%;
            padding: 0.85rem 1rem 0.85rem 2.8rem;
            background: rgba(10, 13, 20, 0.7);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            color: white;
            font-size: 0.95rem;
            outline: none;
            transition: all 0.2s ease;

            &:focus {
              border-color: var(--cyber-purple);
              box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
            }
          }
        }
      }

      .full-width {
        width: 100%;
        margin-top: 0.5rem;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .card-footer {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
        text-align: center;

        .back-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          transition: color 0.2s ease;

          &:hover {
            color: var(--cyber-cyan);
          }
        }
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = 'lomeshyadav101@gmail.com';
  password = '';
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  async handleLogin() {
    this.errorMessage.set(null);

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage.set('Please enter both email and password.');
      return;
    }

    this.loading.set(true);

    const res = await this.authService.loginWithFirebase(this.email, this.password);
    this.loading.set(false);

    if (res.success) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage.set(res.error || 'Authentication failed.');
    }
  }
}
