import api from "./axios";
import { useAuth } from "../store/auth";

export const logout = async () => {
  try {
    await api.post("/api/auth/logout");
  } catch (err) { /* ignore */ }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  // reload or redirect to login
  window.location.href = "/login";
};
