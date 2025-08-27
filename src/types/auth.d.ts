export interface ILoginRequest {
  email: string;
  password: string;
}

// src/api/authApi.ts - সঠিক টাইপ
export interface ILoginResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
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
