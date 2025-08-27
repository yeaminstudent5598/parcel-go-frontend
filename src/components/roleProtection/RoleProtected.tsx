import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import { clearAuth } from "@/features/auth/authSlice";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleProtected = ({  children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  // No user → just redirect
  if (!user) {
    dispatch(clearAuth())
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return <Navigate to="/login" replace />;
  }

  // Authorized → render children
  return <>{children}</>;
};

export default RoleProtected;
