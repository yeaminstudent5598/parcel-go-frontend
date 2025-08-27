import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/rootReducer";
import type { IParcel } from "@/types/parcel";   // ✅ এক জায়গা থেকে import করো

interface ParcelState {
  parcels: IParcel[];
  loading: boolean;
  error: string | null;
}

const initialState: ParcelState = {
  parcels: [],
  loading: false,
  error: null,
};

const parcelSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {
    setParcels: (state, action: PayloadAction<IParcel[]>) => {
      state.parcels = action.payload;
    },
    addParcel: (state, action: PayloadAction<IParcel>) => {
      state.parcels.push(action.payload);
    },
    updateParcel: (state, action: PayloadAction<IParcel>) => {
      const index = state.parcels.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.parcels[index] = action.payload;
    },
    removeParcel: (state, action: PayloadAction<string>) => {
      state.parcels = state.parcels.filter(p => p.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setParcels,
  addParcel,
  updateParcel,
  removeParcel,
  setLoading,
  setError,
} = parcelSlice.actions;

export const selectParcels = (state: RootState) => state.parcels;

export default parcelSlice.reducer;
