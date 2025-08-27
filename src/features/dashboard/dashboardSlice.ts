// src/features/dashboard/dashboardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
  totalParcels: number;
  deliveredParcels: number;
  inTransitParcels: number;
  cancelledParcels: number;
  trends: Record<string, number>; // example: { "Monday": 10, "Tuesday": 12 }
  statusDistribution: Record<string, number>; // example: { pending: 5, delivered: 20 }
}

const initialState: DashboardState = {
  totalParcels: 0,
  deliveredParcels: 0,
  inTransitParcels: 0,
  cancelledParcels: 0,
  trends: {},
  statusDistribution: {},
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardStats: (state, action: PayloadAction<Partial<DashboardState>>) => {
      Object.assign(state, action.payload);
    },
    resetDashboardStats: (state) => {
      state.totalParcels = 0;
      state.deliveredParcels = 0;
      state.inTransitParcels = 0;
      state.cancelledParcels = 0;
      state.trends = {};
      state.statusDistribution = {};
    },
  },
});

export const { setDashboardStats, resetDashboardStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;
