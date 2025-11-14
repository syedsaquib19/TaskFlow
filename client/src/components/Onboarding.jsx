import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Onboarding() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    gsap.fromTo(el.children, { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-600 to-cyan-400 text-white space-y-6">
      <h1 className="text-5xl font-extrabold">Welcome to TaskFlow</h1>
      <p className="max-w-md opacity-90">Your all-in-one productivity suite for smarter work.</p>
      <Link to="/login" className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100">
        Get Started
      </Link>
    </div>
  );
}
