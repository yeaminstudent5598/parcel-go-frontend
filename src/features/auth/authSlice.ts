// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoginResponse } from "@/types/auth";

interface AuthState {
  user: ILoginResponse["user"] | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token || "");
      localStorage.setItem("refreshToken", state.refreshToken || "");
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (user && token && refreshToken) {
        state.user = JSON.parse(user);
        state.token = token;
        state.refreshToken = refreshToken;
        state.isAuthenticated = true;
      }
    },
    clearAuth: (state) => {
      // Clear state
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // Clear all cookies
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    },
  },
});

export const { setCredentials, logout, loadUserFromStorage, clearAuth } = authSlice.actions;
export default authSlice.reducer;
