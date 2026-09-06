import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section id="contact" class="section-padding contact-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">
            <i class="fa-solid fa-paper-plane"></i> Get In Touch
          </span>
          <h2 class="section-title">
            Let's Build Extraordinary <span class="angular-gradient-text">Angular</span> Products
          </h2>
          <p class="section-subtitle">
            Currently {{ portfolio.personal.availability }}. Drop a message or reach out directly!
          </p>
        </div>

        <div class="contact-grid">
          <!-- Left Info Column -->
          <div class="contact-info-col">
            <div class="info-card glass-card">
              <div class="info-icon">
                <i class="fa-solid fa-envelope-open-text"></i>
              </div>
              <div class="info-details">
                <span class="info-label">Email Address</span>
                <a [href]="'mailto:' + portfolio.personal.email" class="info-val">{{ portfolio.personal.email }}</a>
              </div>
            </div>

            <div class="info-card glass-card">
              <div class="info-icon">
                <i class="fa-solid fa-phone-volume"></i>
              </div>
              <div class="info-details">
                <span class="info-label">Direct Contact</span>
                <span class="info-val">{{ portfolio.personal.phone }}</span>
              </div>
            </div>

            <div class="info-card glass-card">
              <div class="info-icon">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <div class="info-details">
                <span class="info-label">Location</span>
                <span class="info-val">{{ portfolio.personal.location }}</span>
              </div>
            </div>

            <div class="info-card glass-card status-card">
              <div class="info-icon open-icon">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <div class="info-details">
                <span class="info-label">Hiring Status</span>
                <span class="info-val open-val">{{ portfolio.personal.availability }}</span>
              </div>
            </div>

            <!-- Social Links -->
            <div class="social-row">
              <a [href]="portfolio.personal.github" target="_blank" rel="noopener noreferrer" class="social-btn glass-card">
                <i class="fa-brands fa-github"></i>
              </a>
              <a [href]="portfolio.personal.linkedin" target="_blank" rel="noopener noreferrer" class="social-btn glass-card">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a [href]="'mailto:' + portfolio.personal.email" class="social-btn glass-card">
                <i class="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <!-- Right Form Column -->
          <div class="contact-form-col glass-card">
            <h3 class="form-title">
              <i class="fa-solid fa-message"></i> Send Me a Message
            </h3>

            @if (submitted()) {
              <div class="success-message">
                <i class="fa-solid fa-circle-check"></i>
                <div class="msg-text">
                  <h4>Message Sent to {{ portfolio.personal.email }}!</h4>
                  <p>Thank you, {{ formData.name }}. Your message has been sent directly to my email.</p>
                </div>
              </div>
            } @else {
              <form (ngSubmit)="handleSubmit()" #contactForm="ngForm">
                <div class="form-group">
                  <label for="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    [(ngModel)]="formData.name" 
                    required 
                    placeholder="e.g. Sarah Jenkins (Recruiter / Hiring Manager)" 
                    class="form-input" />
                </div>

                <div class="form-group">
                  <label for="email">Work Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    [(ngModel)]="formData.email" 
                    required 
                    placeholder="sarah@company.com" 
                    class="form-input" />
                </div>

                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    [(ngModel)]="formData.subject" 
                    required 
                    placeholder="Job Opportunity / Senior Angular Developer Role" 
                    class="form-input" />
                </div>

                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    [(ngModel)]="formData.message" 
                    required 
                    placeholder="Tell me about the role or project requirements..." 
                    class="form-input"></textarea>
                </div>

                <button type="submit" [disabled]="!contactForm.valid || sending()" class="btn btn-angular full-width">
                  @if (sending()) {
                    <i class="fa-solid fa-spinner fa-spin"></i> Sending Email...
                  } @else {
                    <i class="fa-solid fa-paper-plane"></i> Send Message to Email
                  }
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      position: relative;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 2.5rem;
    }

    .contact-info-col {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;

      .info-card {
        padding: 1.2rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.2rem;

        .info-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.12);
          color: var(--cyber-purple);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;

          &.open-icon {
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
          }
        }

        .info-details {
          display: flex;
          flex-direction: column;

          .info-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .info-val {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-primary);
            text-decoration: none;

            &.open-val {
              color: #10b981;
            }
          }
        }
      }

      .social-row {
        display: flex;
        gap: 1rem;
        margin-top: 0.5rem;

        .social-btn {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: var(--text-primary);
          text-decoration: none;

          &:hover {
            color: var(--cyber-cyan);
            border-color: var(--border-glow);
          }
        }
      }
    }

    .contact-form-col {
      padding: 2.5rem;

      .form-title {
        font-size: 1.25rem;
        font-weight: 800;
        margin-bottom: 1.8rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;

        i {
          color: #dd0031;
        }
      }

      .form-group {
        margin-bottom: 1.3rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-input {
          background: rgba(10, 13, 20, 0.6);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.8rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;

          &:focus {
            border-color: var(--cyber-purple);
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
          }
        }
      }

      .full-width {
        width: 100%;
        margin-top: 1rem;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .success-message {
        background: rgba(16, 185, 129, 0.12);
        border: 1px solid rgba(16, 185, 129, 0.3);
        padding: 2rem;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 1.2rem;
        color: #10b981;

        i {
          font-size: 2.5rem;
        }

        h4 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
        }

        p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      }
    }

    @media (max-width: 868px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  private portfolioService = inject(PortfolioService);
  private emailService = inject(EmailService);

  protected get portfolio() { return this.portfolioService.portfolioData(); }

  protected submitted = signal(false);
  protected sending = signal(false);

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  async handleSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.sending.set(true);

    await this.emailService.sendMessage({
      name: this.formData.name,
      email: this.formData.email,
      subject: this.formData.subject || 'Portfolio Inquiry',
      message: this.formData.message
    });

    this.sending.set(false);
    this.submitted.set(true);
  }
}
