// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/authSlice';
import dashboardSlice from '@/features/dashboard/dashboardSlice';
import parcelsSlice from '@/features/parcels/parcelSlice';
import usersSlice from '@/features/users/userSlice';

import { baseApi } from '@/redux/baseApi';

export const rootReducer = combineReducers({
  auth: authSlice,
  dashboard: dashboardSlice,
  parcels: parcelsSlice,
  users: usersSlice,
  [baseApi.reducerPath]: baseApi.reducer, // RTK Query API reducer
}); 

export type RootState = ReturnType<typeof rootReducer>;
