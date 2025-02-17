// models/appointment.model.ts
export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    profilePhoto?: string;
    age: number;
    birthDate?: string; // Déjà correct avec le '?'

  }
  
  export interface Appointment {
    id: number;
    patient: Patient;
    date: string;
    time: string;
    type: string;
    status: string;
    cancellationReason?: string; // Rendue optionnelle avec '?'
    medicalHistory?: Partial<{
      diagnosis: string;
      treatment: string;
      notes: string;
    }>;
  }