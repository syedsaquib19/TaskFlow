import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "../store/auth";

export default function AuthLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const { data } = await api.post("/api/auth/login", { email, password });
    console.log("🟢 Login response:", data); // <— Add this line

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success(`Welcome back, ${data.user.name}`);
    navigate("/dashboard");
  } catch (err) {
    console.error("💥 Login error:", err.response?.data || err);
    toast.error(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-3xl font-extrabold mb-2">Welcome Back</h2>
<p className="text-muted mb-4">
  Your productivity hub — manage everything in one place.
</p>
        <form onSubmit={submit} className="grid gap-3">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required/>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
          <div className="flex justify-between mt-2 text-sm">
            <a href="/forgot" className="text-blue-600">Forgot password?</a>
            <a href="/register" className="text-blue-600">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
