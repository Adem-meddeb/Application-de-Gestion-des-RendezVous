export interface DoctorRequestDTO {
    firstName: string;
    lastName: string;
    cin: string;
    gender: 'MALE' | 'FEMALE';
    age: number;
    phoneNumber: string;
    email: string;
    billingAddress: string;
    office: OfficeDTO;
    specializationIds: number[];
    languages: string[];
    paymentMethods: Array<'CASH' | 'CREDIT_CARD' | 'CHEQUE' | 'INSURANCE' | 'BANK_TRANSFER'>;
    education: EducationDTO[];
    experience: ExperienceDTO[];
    profilePhotoBytes?: Uint8Array | null;
    aptitudeCertificateBytes?: Uint8Array | null;
    password?: string; // Si nécessaire pour les updates
    consultationDuration?: number; // Ajouter cette ligne

  }
  
  export interface OfficeDTO {
    address: string;
    governorate: string;
    latitude: number;
    longitude: number;
  }
  
  export interface EducationDTO {
    degreeName: string;
    institution: string;
    year: number;
  }
  
  export interface ExperienceDTO {
    position: string;
    hospital: string;
    duration: number;
  }