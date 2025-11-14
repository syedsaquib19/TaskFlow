import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function ForgotPassword(){
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/forgot", { email });
      toast.success("If the email exists, a reset link has been sent.");
      setSent(true);
    } catch (err) {
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-bold mb-4">Reset password</h2>
        {!sent ? (
          <form onSubmit={submit} className="grid gap-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" type="email" className="px-3 py-2 rounded-lg" required/>
            <button className="btn btn-primary">Send reset link</button>
          </form>
        ) : (
          <p>Check your email for a reset link (if the address exists).</p>
        )}
      </div>
    </div>
  );
}
