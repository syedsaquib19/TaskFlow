import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function AuthRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", { name, email, password });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-2xl font-bold mb-4">Create account</h2>
        <form onSubmit={submit} className="grid gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" required/>
          <button className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
        </form>
      </div>
    </div>
  );
}
