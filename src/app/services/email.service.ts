import { Injectable } from '@angular/core';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly targetEmail = 'lomeshyadav101@gmail.com';

  /**
   * Send Contact Form Message directly to Lomesh's Email (Normal Email Service)
   */
  async sendMessage(msg: ContactMessage): Promise<{ success: boolean; error?: string }> {
    let emailSent = false;

    // 1. Try sending via free FormSubmit service directly to Lomesh's email
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${this.targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: msg.name,
          email: msg.email,
          _subject: `Portfolio Contact: ${msg.subject}`,
          _captcha: 'false',
          message: `Name: ${msg.name}\nSender Email: ${msg.email}\nSubject: ${msg.subject}\n\nMessage:\n${msg.message}`
        })
      });

      if (response.ok) {
        const resData = await response.json().catch(() => ({}));
        if (resData.success === 'true' || resData.success === true || response.status === 200) {
          emailSent = true;
        }
      }
    } catch (err) {
      console.warn('Direct email service warning, initiating mailto fallback:', err);
    }

    // 2. Direct Fallback: Trigger default Mail app (mailto link) if API is unactivated/blocked
    if (!emailSent && typeof window !== 'undefined') {
      const bodyText = `Name: ${msg.name}\nEmail: ${msg.email}\n\nMessage:\n${msg.message}`;
      const mailtoUrl = `mailto:${this.targetEmail}?subject=${encodeURIComponent(msg.subject || 'Portfolio Contact')}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailtoUrl;
      emailSent = true;
    }

    return { success: true };
  }
}
