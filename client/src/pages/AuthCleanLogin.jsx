import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "../store/auth";

export default function AuthCleanLogin(){
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuth({ user: data.user, accessToken: data.accessToken });
      toast.success("Welcome back");
      window.location.href = "/app/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md card p-6">
        <h2 className="text-2xl font-bold mb-2">Sign in to TaskFlow</h2>
        <p className="text-sm opacity-80 mb-4">Organize smarter — manage tasks with ease.</p>
        <form onSubmit={submit} className="grid gap-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required />
          <button className="btn btn-primary">Sign in</button>
        </form>
        <div className="mt-4 text-sm opacity-80">
          <a href="/register" className="text-brand">Create an account</a> • <a href="/forgot" className="text-muted">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}
