export interface DirectorMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export class EmailService {
  private static readonly DIRECTOR_EMAIL = 'smo@csmed.kz';
  private static readonly USE_API = false; // Set to true to use backend API instead of mailto
  private static readonly API_BASE_URL = 'http://localhost:3001'; // Update with your backend URL

  /**
   * Send a message to the director
   * Uses API if configured, otherwise falls back to mailto link
   */
  static async sendToDirector(message: DirectorMessage): Promise<boolean> {
    if (this.USE_API) {
      return await this.sendToDirectorAPI(message);
    } else {
      this.sendToDirectorMailto(message);
      return true;
    }
  }

  /**
   * Send a message to the director using mailto link
   * This is a client-side solution that opens the user's email client
   */
  static sendToDirectorMailto(message: DirectorMessage): void {
    const subject = encodeURIComponent(`Обращение к директору: ${message.subject}`);
    const body = encodeURIComponent(`
Имя: ${message.name}
Email: ${message.email}
Телефон: ${message.phone}
Тема: ${message.subject}

Сообщение:
${message.message}

---
Это сообщение отправлено с сайта ГККП "СПОРТИВНЫЙ МЕДИЦИНСКИЙ ЦЕНТР ГОРОДА АСТАНЫ"
    `);
    
    const mailtoLink = `mailto:${this.DIRECTOR_EMAIL}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
  }

  /**
   * Send a message to the director using a backend API
   * This method can be used when a backend service is available
   */
  static async sendToDirectorAPI(message: DirectorMessage): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/api/contact/director`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
          recipient: this.DIRECTOR_EMAIL,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error sending email via API:', error);
      // Fallback to mailto link
      this.sendToDirectorMailto(message);
      return false;
    }
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone format (basic validation for Kazakhstan numbers)
   */
  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Validate message data
   */
  static validateMessage(message: DirectorMessage): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!message.name.trim()) {
      errors.push('Имя обязательно для заполнения');
    }

    if (!message.email.trim()) {
      errors.push('Email обязателен для заполнения');
    } else if (!this.validateEmail(message.email)) {
      errors.push('Неверный формат email');
    }

    if (!message.phone.trim()) {
      errors.push('Телефон обязателен для заполнения');
    } else if (!this.validatePhone(message.phone)) {
      errors.push('Неверный формат телефона');
    }

    if (!message.subject.trim()) {
      errors.push('Тема обязательна для заполнения');
    }

    if (!message.message.trim()) {
      errors.push('Сообщение обязательно для заполнения');
    } else if (message.message.length < 10) {
      errors.push('Сообщение должно содержать минимум 10 символов');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get the current email sending method
   */
  static getEmailMethod(): 'mailto' | 'api' {
    return this.USE_API ? 'api' : 'mailto';
  }

  /**
   * Update API configuration
   */
  static updateAPIConfig(useAPI: boolean, baseURL?: string): void {
    (this as any).USE_API = useAPI;
    if (baseURL) {
      (this as any).API_BASE_URL = baseURL;
    }
  }
} 