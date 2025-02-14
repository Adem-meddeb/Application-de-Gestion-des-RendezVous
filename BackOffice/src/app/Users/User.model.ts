// User.model.ts
export interface Education {
    diplomaName: string;
    institution: string;
    year: number;
  }
  
  export interface Experience {
    Poste: string;
    institution: string;
    year: number;
  }
  
  export interface Times {
    singleStart?: string;
    singleEnd?: string;
    firstStart?: string;
    firstEnd?: string;
    secondStart?: string;
    secondEnd?: string;
  }
  
  export interface DaySchedule {
    sessionType: string;
    times: Times;
  }
  
  export interface ScheduleConfig {
    languages: string[];
    paymentMethods: string[];
    consultationDuration: number;
  }
  
  export interface Cabinet {
    address: string;
    governorate: string;
    latitude: number;
    longitude: number;
  }
  
  export interface Schedule {
    config: ScheduleConfig;
    days: {
      [key: string]: DaySchedule;
      lundi: DaySchedule;
      mardi: DaySchedule;
      mercredi: DaySchedule;
      jeudi: DaySchedule;
      vendredi: DaySchedule;
      samedi: DaySchedule;
      dimanche: DaySchedule;
    };
  }
  
  export interface Aptitude {
    photoUrl: string;
    verified: boolean;
    verificationDate?: Date;
  }
  
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    cin: string;
    gender: string;
    phone: string;
    address: string;
    password: string;
    specialty: string;
    education: Education;
    experience: Experience;
    formations: string;
    availability: string;
    profilePhoto?: string;
    email: string;
    Status: string;
    role: string;
    age: number;
    professionalAptitudePhoto: string;
    aptitude: Aptitude;
    cabinet: Cabinet;
    schedule: Schedule;
  }