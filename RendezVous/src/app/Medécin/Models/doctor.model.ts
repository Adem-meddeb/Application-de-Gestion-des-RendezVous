// doctor.model.ts
export interface Doctor {
  id?: string;
  firstName: string;
  lastName: string;
  cin: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  phoneNumber: string;
  email: string;
  billingAddress: string;
  password: string;
  office: Office;
  specializationIds: number[];
  languages: string[];
  paymentMethods: ('CASH' | 'CREDIT_CARD' | 'CHEQUE' | 'INSURANCE' | 'BANK_TRANSFER')[];
  education: Education[];
  experience: Experience[];
  profilePhotoUrl?: string;
  aptitudeCertificateUrl?: string;
}

export interface Office {
  address: string;
  governorate: string;
  longitude: number;
  latitude: number;
}

export interface Education {
  name: string;
  establishment: string;
  year: number;
}

export interface Experience {
  name: string;
  establishment: string;
  duration: string;
}

/* schedule: {
  [day: string]: {
    sessionType: string;
    times: {
      singleStart?: string;
      singleEnd?: string;
      firstStart?: string;
      firstEnd?: string;
      secondStart?: string;
      secondEnd?: string;
    };
  };
}; */