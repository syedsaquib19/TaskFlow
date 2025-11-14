import { create } from "zustand";

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  accessToken: localStorage.getItem("accessToken") || null,
  setAuth: ({ user, accessToken }) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    set({ user, accessToken });
  },
  clearAuth: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
  },
}));
