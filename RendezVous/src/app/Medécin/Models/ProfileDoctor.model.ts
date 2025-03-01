// Modèles alignés avec le backend
export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    cin: string;
    gender: 'MALE' | 'FEMALE';
    age: number;
    phoneNumber: string;
    email: string;
    billingAddress: string;
    profilePhoto?: string; // Base64
    aptitudeCertificate?: string; // Base64
    education: Education[];
    experience: Experience[];
    office: Office;
    specializations: Specialization[];
    languages: string[];
    paymentMethods: PaymentMethod[];
    consultationDuration?: number; // Ajouter cette ligne

  }
  
  export interface Education {
    degreeName: string;
    institution: string;
    year: number;
  }
  
  export interface Experience {
    position: string;
    hospital: string;
    duration: number;
  }
  
  export interface Office {
    address: string;
    governorate: string;
    latitude: number;
    longitude: number;
  }
  
  export interface Specialization {
    id: number;
    name: string;
  }
  
  export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'CHEQUE' | 'INSURANCE' | 'BANK_TRANSFER';