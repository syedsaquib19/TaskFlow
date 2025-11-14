import { useState } from "react";
import SEO from "../components/SEO";
import api from "../api";
import toast from "react-hot-toast";

// ...existing code...
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setOk(false);
    try {
      await api.post("/api/contact", form);
      toast.success("Message sent!");
      setOk(true);
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      toast.error("Failed to send message");
      setErr("Failed to send");
    }
  }; // <-- added missing closing brace and semicolon

  return (
    <main className="container py-10">
      <SEO title="Contact • TaskFlow" description="Get in touch with the TaskFlow team." />
      <div className="max-w-xl mx-auto card p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={submit} className="grid gap-3">
          <input className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
          <input className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
          <textarea className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50" rows="5" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required/>
          <button className="btn btn-primary">Send</button>
          {ok && <p className="text-green-600">Thanks! We will get back to you.</p>}
          {err && <p className="text-red-600">{err}</p>}
        </form>
      </div>
    </main>
  );
}
// ...existing code...