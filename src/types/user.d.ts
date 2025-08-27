

export interface  IUser {
  _id: string;            
  email: string;
  name?: string;
  phoneNumber: string;
  password?: string;       
  role: 'ADMIN' | 'SENDER' | 'RECEIVER';
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserUpdateRequest {
  id: string;
  name?: string;
  email?: string;
  role?: "ADMIN" | "SENDER" | "RECEIVER";
  isBlocked?: boolean;
}
