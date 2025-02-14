// src/app/models/notification.model.ts
export interface Notification {
    id: number;
    title: string;
    message: string;
    date: Date;
    read: boolean;
  }