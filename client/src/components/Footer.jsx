import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-400 text-white py-16">
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
        <h2 className="text-2xl font-bold">Ready to boost your productivity?</h2>
        <p className="opacity-80">
          Join thousands of creators, students, and teams using TaskFlow daily.
        </p>

        <Link
          to="/register"
          className="inline-block px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-10 text-sm font-medium">
          {["Features", "Pricing", "About", "Contact"].map((page) => (
            <Link key={page} to={`/${page.toLowerCase()}`} className="hover:underline">
              {page}
            </Link>
          ))}
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-5 mt-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github size={20} className="hover:scale-110 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} className="hover:scale-110 transition" />
          </a>
          <a href="mailto:contact@taskflow.com">
            <Mail size={20} className="hover:scale-110 transition" />
          </a>
        </div>

        <p className="mt-8 text-sm opacity-80">
          © {new Date().getFullYear()} TaskFlow. Designed with 💙 by SIRT Team.
        </p>
      </div>
    </footer>
  );
}
