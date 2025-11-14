import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function ResetPassword(){
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/api/auth/reset/${token}`, { password });
      toast.success("Password reset. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-bold mb-4">Set new password</h2>
        <form onSubmit={submit} className="grid gap-3">
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" type="password" className="px-3 py-2 rounded-lg" required />
          <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save password"}</button>
        </form>
      </div>
    </div>
  );
}
