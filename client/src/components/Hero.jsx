import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-10 items-center py-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Organize Smarter. <span className="text-blue-600">Work Better.</span>
          </h1>
          <section className="py-16 bg-white dark:bg-gray-950 text-center">
  <h2 className="text-3xl font-bold mb-10">Why Choose TaskFlow?</h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
    <div className="card p-6 shadow">
      <h3 className="font-semibold text-lg mb-2">🧠 Smart Tasking</h3>
      <p className="text-sm opacity-70">AI-assisted task creation & auto-prioritization.</p>
    </div>
    <div className="card p-6 shadow">
      <h3 className="font-semibold text-lg mb-2">📅 Calendar Sync</h3>
      <p className="text-sm opacity-70">Keep deadlines aligned with your daily schedule.</p>
    </div>
    <div className="card p-6 shadow">
      <h3 className="font-semibold text-lg mb-2">📊 Real-Time Insights</h3>
      <p className="text-sm opacity-70">Visual analytics to track progress instantly.</p>
    </div>
  </div>
</section>

          <p className="mt-4 text-lg opacity-80">
            TaskFlow helps you plan, track, and complete tasks with a beautiful, fast, and modern workflow.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-outline">Login</Link>
          </div>
          <ul className="mt-6 grid gap-2 text-sm opacity-90">
            <li className="flex items-center gap-2"><CheckCircle2 className="text-blue-600" size={18}/> Fast & lightweight</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-blue-600" size={18}/> Responsive & accessible</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-blue-600" size={18}/> Analytics & insights</li>
          </ul>
        </div>
        <div className="card p-6">
          <img src="https://picsum.photos/seed/taskflow/900/500" alt="TaskFlow preview" className="rounded-xl w-full" />
        </div>
      </div>
    </section>
  );
}
