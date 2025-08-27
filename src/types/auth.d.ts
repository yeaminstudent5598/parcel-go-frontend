import type { IUserRegister } from "./user";

  export interface ILoginRequest {
    email: string;
    password: string;
  }

  export interface ILoginData {
  user: IUserRegister;
  token: string;
  refreshToken: string;
}

  // src/api/authApi.ts - সঠিক টাইপ
  export interface ILoginResponse {
    statusCode: number;
    success: boolean;
    message: string;
    user: string;
   token: string;
    refreshToken: string;

  }

  export interface IRegisterRequest {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role?: "SENDER" | "RECEIVER";
  }

  export interface IRefreshTokenResponse {
    token: string;
    refreshToken: string;
  }
