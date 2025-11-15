// client/src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 🌟 Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// 🌟 Pages
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import CalendarPage from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import KanbanBoard from "./pages/KanbanBoard";
import DesignDashboard from "./pages/DesignDashboard";

// 🌟 Auth Pages
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";
import AuthCleanLogin from "./pages/AuthCleanLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// 🌟 Extra Features
import AiAssistant from "./components/AiAssistant";
import ChatRoom from "./components/ChatRoom";
import FocusMode from "./components/FocusMode";
import Onboarding from "./components/Onboarding";
import AiPage from "./pages/AiPage";

export default function App() {
  // ✅ User state management
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  // ✅ Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    // future: refresh user/token check or load user data
  }, []);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        {/* 🌟 Global Navbar */}
        <Navbar user={user} onLogout={logout} />

        {/* 🌟 Page Content */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            {/* ---------- PUBLIC ROUTES ---------- */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* ---------- AUTH ROUTES ---------- */}
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/clean-login" element={<AuthCleanLogin />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* ---------- PROTECTED ROUTES ---------- */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/board"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />

            <Route
              path="/app/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/app/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/app/board"
              element={
                <ProtectedRoute>
                  <KanbanBoard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* ---------- EXTRA FEATURES ---------- */}
            <Route path="/design-dashboard" element={<DesignDashboard />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/focus" element={<FocusMode />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* ---------- AI PAGE (MAIN ONE) ---------- */}
            <Route path="/app/ai" element={<AiPage />} />

            {/* ---------- 404 FALLBACK ---------- */}
            <Route
              path="*"
              element={
                <div className="text-center text-2xl mt-10 text-gray-600 dark:text-gray-300">
                  404 - Page Not Found 🚧
                </div>
              }
            />
          </Routes>
        </main>

        {/* 🌟 Global Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
