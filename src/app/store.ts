// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { baseApi } from '@/redux/baseApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production',
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
