import { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../store/auth";
import toast from "react-hot-toast";

export default function Settings(){
  const { user, setAuth } = useAuth();
  const [form, setForm] = useState({ name: '', avatar: '', theme: 'light' });

  useEffect(()=>{ if (user) setForm({ name: user.name || '', avatar: user.avatar || '', theme: user.theme || 'light' }); }, [user]);

  const save = async () => {
    try {
      const { data } = await api.put("/api/profile", form);
      setAuth({ user: data, accessToken: localStorage.getItem("accessToken") });
      toast.success("Saved");
    } catch { toast.error("Save failed"); }
  };

  return (
    <div className="container py-6">
      <div className="max-w-2xl card p-6">
        <h3 className="font-semibold mb-3">Profile</h3>
        <div className="grid gap-3">
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="px-3 py-2 rounded-lg" placeholder="Full name" />
          <input value={form.avatar} onChange={e=>setForm({...form,avatar:e.target.value})} className="px-3 py-2 rounded-lg" placeholder="Avatar URL" />
          <select value={form.theme} onChange={e=>setForm({...form,theme:e.target.value})} className="px-3 py-2 rounded-lg">
            <option value="light">Light</option><option value="dark">Dark</option>
          </select>
          <div className="flex gap-2 justify-end">
            <button onClick={save} className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
