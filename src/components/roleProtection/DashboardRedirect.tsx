// src/pages/DashboardRedirect.tsx
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import { clearAuth } from "@/features/auth/authSlice";

export function DashboardRedirect() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  if (!user?.role) {
    dispatch(clearAuth())
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    // যদি ইউজার লগইন করা না থাকে বা role না থাকে, তাকে লগইন পেজে পাঠান
    return <Navigate to="/login" replace />;
  }

  // Role অনুযায়ী সঠিক পাথে redirect করুন
  const dashboardPath = `/dashboard/${user.role.toLowerCase()}`;
  
  return <Navigate to={dashboardPath} replace />;
}