import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../store/auth";
import toast from "react-hot-toast";

export default function Profile(){
  const { user, setAuth } = useAuth();
  const [form, setForm] = useState({ name: "", avatar: "", theme: "light" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || "", avatar: user.avatar || "", theme: user.theme || "light" });
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put("/api/profile", form);
      setAuth({ user: data, accessToken: localStorage.getItem("accessToken") });
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <form onSubmit={submit} className="grid gap-3">
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" className="px-3 py-2 rounded-lg" />
          <input value={form.avatar} onChange={e=>setForm({...form, avatar:e.target.value})} placeholder="Avatar URL" className="px-3 py-2 rounded-lg" />
          <select value={form.theme} onChange={e=>setForm({...form, theme:e.target.value})} className="px-3 py-2 rounded-lg">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save profile"}</button>
        </form>
      </div>
    </div>
  );
}
