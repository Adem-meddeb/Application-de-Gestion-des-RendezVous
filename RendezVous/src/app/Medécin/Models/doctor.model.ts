// doctor.model.ts
export interface Doctor {
    id?: string;
    personalInfo: {
      firstName: string;
      lastName: string;
      cin: string;
      gender: 'male' | 'female';
      age: number;
      phone: string;
      address: string;
      email: string;
      profilePhoto?: string;
    };
    education?: {
      degrees: Education[];
      specialties: { name: string; aptitude: string }[];
    };
    experience?: {
      positions: Experience[];
      certification?: {
        file: string;
        fileName: string;
        fileSize: number;
      };
    };
    cabinet: Cabinet;
    practiceInfo: {
      languages: string[];
      paymentMethods: string[];
      consultationDuration: number;
      schedule: {
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
      };
    };
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
  
  export interface Cabinet {
    address: string;
    governorate: string;
    latitude?: number;
    longitude?: number;
  }