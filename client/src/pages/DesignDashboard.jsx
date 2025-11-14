import React, { useEffect, useMemo, useState } from "react";
import AppShell from "../components/Appshell";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Plus, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import TaskModal from "../components/TaskModal";
import Skeleton from "../components/Skeleton";

export default function DesignDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get("/api/tasks");
      setTasks(data.tasks || []);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const stats = useMemo(() => {
    const done = tasks.filter(t => t.status === "done").length;
    const inProgress = tasks.filter(t => t.status === "in-progress").length;
    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length;
    return { total: tasks.length, done, inProgress, overdue };
  }, [tasks]);

  return (
    <AppShell>
      <div className="container space-y-8">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-brand text-white p-6 rounded-2xl shadow-soft"
        >
          <h1 className="text-3xl font-extrabold mb-1">Good Day 👋</h1>
          <p className="text-white/80 text-sm">
            Stay productive — organize, track, and complete your tasks efficiently.
          </p>
        </motion.div>

        {/* KPI CARDS */}
        {loading ? (
          <div className="grid md:grid-cols-4 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-4">
            <KpiCard icon={<Clock />} label="In Progress" value={stats.inProgress} color="text-blue-600" />
            <KpiCard icon={<CheckCircle2 />} label="Completed" value={stats.done} color="text-green-600" />
            <KpiCard icon={<AlertTriangle />} label="Overdue" value={stats.overdue} color="text-red-600" />
            <KpiCard icon={<Plus />} label="Total Tasks" value={stats.total} color="text-indigo-600" />
          </div>
        )}

        {/* TASK OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={16} /> Add Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {tasks.slice(0, 6).map((t) => (
                <motion.div
                  key={t._id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-white/20 shadow-sm"
                >
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm opacity-80">{t.description || "No description."}</p>
                  <div className="text-xs mt-2 text-muted">
                    {t.dueDate ? `Due: ${new Date(t.dueDate).toLocaleDateString()}` : "No due date"}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <TaskModal open={modalOpen} onClose={() => { setModalOpen(false); load(); }} />
    </AppShell>
  );
}

function KpiCard({ icon, label, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="card p-4 flex items-center gap-4 bg-white dark:bg-gray-900/60"
    >
      <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-sm opacity-70">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="text-center p-10 text-muted">
      <p className="text-lg font-medium mb-2">You have no tasks yet.</p>
      <p className="text-sm mb-4 opacity-80">Click the button above to add your first task.</p>
      <img
        src="https://illustrations.popsy.co/white/launch.svg"
        alt="empty illustration"
        className="w-40 mx-auto opacity-80"
      />
    </div>
  );
}
