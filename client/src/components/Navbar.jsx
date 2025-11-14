import { motion, useScroll } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 10));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-md border-b border-gray-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* 🔹 Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          {/* AI Bot Logo */}
          <motion.img
            src="/ai-bot.svg"
            alt="AI Bot Logo"
            className="w-9 h-9 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(59,130,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Text Logo */}
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
              TaskFlow
            </span>
            <p className="text-xs font-light opacity-70 -mt-1">Smart Task Manager</p>
          </div>
        </Link>

        {/* 🔹 Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "Pricing", path: "/pricing" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative group ${
                location.pathname === link.path
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* 🔹 Right Side Buttons */}
        <div className="flex gap-3 items-center">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-gray-200/60 dark:bg-gray-800/70 hover:scale-105 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Login & Signup */}
          <Link
            to="/login"
            className="hidden sm:block px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hidden sm:block px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-full shadow hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
