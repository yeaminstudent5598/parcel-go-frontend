

  export interface ILoginRequest {
    email: string;
    password: string;
  }

export interface ILoginData {
  user: {
    id: string;
    role: string;
    email: string;
    phoneNumber: string; 
  };
  accessToken: string;
  refreshToken: string;
}


// Full API response
export interface ILoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ILoginData; // এখানে data আছে
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
