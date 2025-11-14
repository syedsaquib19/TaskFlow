import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, Layout, BarChart3, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 50]);
  const y2 = useTransform(scrollY, [0, 400], [0, -50]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* 🌟 HERO SECTION */}
      <section className="container mx-auto px-6 pt-32 pb-20 text-center relative overflow-hidden">
        {/* Floating Background Glow */}
        <motion.div
          className="absolute top-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          style={{ y: y1 }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-20 w-96 h-96 bg-cyan-400/25 rounded-full blur-3xl"
          style={{ y: y2 }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Organize Smarter. Work Better.
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-80 mb-8">
            The modern productivity app to manage your goals, tasks, and deadlines visually.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-full shadow-md hover:opacity-90 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              Log In
            </Link>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.img
          src="/illustrations/101-gym-guy.svg"
          alt="TaskFlow Dashboard"
          className="mx-auto mt-14 w-full max-w-3xl rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1,
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </section>

      {/* ⚙️ FEATURES SECTION */}
      <section className="container mx-auto px-6 py-24" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskFlow?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Layout className="text-blue-500" size={36} />}
            title="Smart Task Board"
            text="Manage your tasks visually with a drag-and-drop Kanban system."
          />
          <FeatureCard
            icon={<Calendar className="text-cyan-500" size={36} />}
            title="Calendar View"
            text="Stay on top of deadlines and recurring schedules effortlessly."
          />
          <FeatureCard
            icon={<BarChart3 className="text-indigo-500" size={36} />}
            title="Analytics Dashboard"
            text="Track productivity, progress, and completion streaks easily."
          />
        </div>
      </section>

      {/* 🚀 PRODUCTIVITY SECTION */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center" data-aos="fade-up">
        <motion.img
          whileHover={{ scale: 1.02 }}
          src="https://illustrations.popsy.co/white/launch.svg"
          alt="launch productivity"
          className="w-full max-w-lg mx-auto"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Your Productivity. Supercharged.</h2>
          <p className="opacity-80 mb-6">
            With TaskFlow, you don’t just manage tasks — you manage progress.
            Create, plan, and achieve like never before.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500" /> Set daily goals & reminders
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500" /> Real-time sync across devices
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500" /> Custom categories & priorities
            </li>
          </ul>
        </div>
      </section>

      {/* 💬 TESTIMONIALS */}
      <section className="bg-gray-100 dark:bg-gray-900 py-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <Swiper spaceBetween={30} slidesPerView={1} loop autoplay={{ delay: 3000 }} className="max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-soft text-center"
              >
                <p className="text-lg italic mb-4 opacity-90">“{t.quote}”</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm opacity-70">{t.role}</div>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="container mx-auto px-6 py-24" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm cursor-pointer">
              <summary className="font-semibold">{faq.q}</summary>
              <p className="mt-2 opacity-80">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 🚪 CTA FOOTER */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-cyan-400 text-white">
        <h2 className="text-3xl font-bold mb-3">Get started with TaskFlow today!</h2>
        <p className="opacity-80 mb-6">It’s free to try — no credit card required.</p>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100"
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm opacity-70">
        © {new Date().getFullYear()} TaskFlow. Designed with 💙 by SIRT Team.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-soft text-center">
      <div className="mb-3 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-80">{text}</p>
    </motion.div>
  );
}

const testimonials = [
  { name: "Aarav Sharma", role: "Startup Founder", quote: "TaskFlow helped our team cut chaos in half — it’s our daily HQ." },
  { name: "Sanya Mehta", role: "UI/UX Designer", quote: "The clean design and calendar view changed how I work daily." },
  { name: "Aditya Rao", role: "Engineering Student, SIRT", quote: "Perfect for managing projects and college assignments." },
];

const faqs = [
  { q: "Is TaskFlow free to use?", a: "Yes! Our free plan includes all basic features for individuals." },
  { q: "Can I collaborate with others?", a: "Absolutely! You can invite team members and assign tasks easily." },
  { q: "Does TaskFlow have dark mode?", a: "Yes! TaskFlow automatically matches your system theme." },
];
