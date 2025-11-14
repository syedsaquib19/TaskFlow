import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true, // needed for refresh cookie
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("token", data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original); // retry request
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
