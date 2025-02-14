// models/appointment.model.ts
export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    profilePhoto?: string;
    age: number;
  }
  
  export interface Appointment {
    id: number;
    patient: Patient;
    date: string;
    time: string;
    type: string;
    status: string;
  }