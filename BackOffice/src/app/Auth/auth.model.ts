export interface AuthRequest{
    fullname:string;
    email:string;
    password: string;
}

export enum Role {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_DOCTOR = 'ROLE_DOCTOR',
    ROLE_PATIENT = 'ROLE_PATIENT'
  }

export interface UserResponse {
    id: number;
    fullname: string;
    email: string;
    role: Role;
    token: string;
  }