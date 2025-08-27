// src/redux/baseApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      // 'accessToken' এর পরিবর্তে 'token' হবে, কারণ আপনি 'token' নামেই সেভ করেছেন
      const token = localStorage.getItem('token'); 
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include', // cookies use হলে
  }),
  tagTypes: ['User', 'Parcel', 'Auth'],
  endpoints: () => ({}),
});