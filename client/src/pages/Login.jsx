import { useAuth } from "../store/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      // ✅ get real JWT + user from backend
      const { token, user } = res.data;

      // store securely
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setAuth({ user, accessToken: token });
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="container py-10">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-bold mb-2">Login</h2>
        <form onSubmit={handleLogin} className="grid gap-3">
          <input name="email" placeholder="Email" required />
          <input name="password" placeholder="Password" type="password" required />
          <button className="btn btn-primary">Continue</button>
          <p className="text-sm opacity-70">
            Forgot password?{" "}
            <a href="/forgot" className="text-blue-600 underline">
              Click here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
