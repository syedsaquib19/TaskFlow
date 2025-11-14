// client/src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken"); // ✅ match AuthLogin
  if (!token) return <Navigate to="/login" replace />;
  return children ? children : <Outlet />;
}
