export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date | null;
  isVerified: boolean;
  jwtToken: string; 
}

export interface IAuthUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date | null;
  isVerified: boolean;
}

export class AuthUser {

  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: string,
    public created: Date,
    public updated: Date | null,
    public isVerified: boolean) {}  
}