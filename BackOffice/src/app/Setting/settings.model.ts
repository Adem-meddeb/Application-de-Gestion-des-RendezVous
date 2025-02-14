// settings.model.ts
export interface AppSettings {
    general: {
      appName: string;
      timezone: string;
      dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY';
    };
    security: {
      passwordPolicy: {
        minLength: number;
        requireSpecialChar: boolean;
      };
      twoFactorEnabled: boolean;
    };
    notifications: {
      email: {
        smtpHost: string;
        smtpPort: number;
        senderEmail: string;
      };
    };
  }