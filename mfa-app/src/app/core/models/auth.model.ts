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

export class AuthUser {
  constructor(public firstName: string) { }
}