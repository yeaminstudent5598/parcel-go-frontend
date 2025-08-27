import type { IUser } from "./user";

// ব্যাকএন্ডের ParcelStatus টাইপের সাথে মিল রেখে
export type ParcelStatus =
  | 'REQUESTED'
  | 'APPROVED'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED'
  | 'BLOCKED';

// ব্যাকএন্ডের IParcelStatusLog-এর সাথে মিল রেখে
export interface IStatusLog {
  status: ParcelStatus;
  updatedAt: string; // JSON-এ Date স্ট্রিং হয়ে যায়
  updatedBy: string; // আইডি স্ট্রিং
  note?: string;
}

// ব্যাকএন্ডের IParcel-এর সাথে মিল রেখে আপডেট করা হয়েছে
export interface IParcel {
  _id: string; // .id এর পরিবর্তে ._id
  sender: IUser | string;    // populated হলে IUser, নাহলে string
  receiver: IUser | string;  // populated হলে IUser, নাহলে string
  deliveryAddress: string;
  pickupAddress?: string;
  weight: number;
  price: number;
  trackingId: string; // trackingNumber এর পরিবর্তে trackingId
  status: ParcelStatus;
  statusLogs: IStatusLog[];
  isBlocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

// পার্সেল তৈরির রিকোয়েস্টের জন্য টাইপ
export interface IParcelCreateRequest {
  receiverId: string;
  deliveryAddress: string;
  pickupAddress?: string;
  weight: number;
  price: number;

}

// পার্সেল আপডেটের রিকোয়েস্টের জন্য টাইপ (সাধারণত অ্যাডমিন ব্যবহার করবে)
export interface IParcelUpdateRequest {
  id: string; // কোন পার্সেলটি আপডেট হবে
  deliveryAddress?: string;
  pickupAddress?: string;
  status?: ParcelStatus;
}

export interface IMeta {
  total: number;
  page: number;
  limit: number;
}
// API রেসপন্সের জন্য একটি সাধারণ টাইপ
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: data;
}