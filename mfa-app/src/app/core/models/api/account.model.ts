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

export interface IAuthRefreshTokenResponse {
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

export interface IAuthSigninWithTokenResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date | null;
  isVerified: boolean;
}

export interface IAuthForgotPasswordRequest {
  email: string;
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

    static fromResponse(response: IAuthSigninWithTokenResponse | IAuthLoginResponse | IAuthRefreshTokenResponse): AuthUser {
      return new AuthUser(
        response.firstName,
        response.lastName,
        response.email,
        response.role,
        response.created,
        response.updated,
        response.isVerified
      )
    }
}