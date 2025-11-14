import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Clock, CheckCircle2, AlertTriangle, Search, User } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import toast from "react-hot-toast";
import api from "../api"; // adjust if your axios instance path differs
import AiAssistant from "../components/AiAssistant"; // keep your existing AI component
import Skeleton from "../components/Skeleton";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import { Link } from "react-router-dom";

/* -------------------------
   Small reusable components
   ------------------------- */

function KpiCard({ icon, label, value, color = "text-sky-500" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-soft backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
          <div className="text-3xl font-extrabold mt-1">{value}</div>
        </div>
        <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-inner ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function TasksMiniList({ tasks = [] }) {
  if (!tasks.length) {
    return <div className="text-sm text-gray-500 dark:text-gray-400">No recent tasks.</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.slice(0, 6).map((t) => (
        <motion.div
          key={t._id}
          whileHover={{ scale: 1.02 }}
          className="p-4 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{t.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.description || "No description"}</div>
          </div>
          <div className="text-sm">
            {t.status === "done" ? (
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            ) : (
              <Clock className="text-yellow-500 w-5 h-5" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WeeklyBar({ data = [] }) {
  const chartData = data.length ? data : [
    { name: "Mon", tasks: 3 },
    { name: "Tue", tasks: 5 },
    { name: "Wed", tasks: 2 },
    { name: "Thu", tasks: 6 },
    { name: "Fri", tasks: 4 },
  ];

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Weekly Activity</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* -------------------------
   Main premium dashboard
   ------------------------- */

export default function PremiumDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", priority: "", q: "" });

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/tasks", { params: filters });
      // flexible response normalization
      const data = res?.data;
      const arr = Array.isArray(data) ? data : (Array.isArray(data.tasks) ? data.tasks : (Array.isArray(data.data) ? data.data : []));
      setTasks(arr);
    } catch (err) {
      console.error("Failed to load tasks", err);
      toast.error(err?.response?.data?.message || "Failed to load tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filters.status, filters.priority, filters.q]);

  // stats
  const stats = useMemo(() => {
    const done = tasks.filter(t => t.status === "done" || t.status === "done").length;
    const inProgress = tasks.filter(t => t.status === "in-progress" || t.status === "progress").length;
    const overdue = tasks.filter(t => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < new Date() && t.status !== "done";
    }).length;
    return { total: tasks.length, done, inProgress, overdue };
  }, [tasks]);

  const pieData = useMemo(() => {
    const todo = tasks.filter(t => t.status === "todo" || t.status === "to-do").length;
    const inProgress = tasks.filter(t => t.status === "in-progress").length;
    const done = tasks.filter(t => t.status === "done").length;
    return [
      { name: "To Do", value: todo },
      { name: "In Progress", value: inProgress },
      { name: "Done", value: done },
    ];
  }, [tasks]);

  // CRUD helpers (simple optimistic updates)
  const addTask = async (payload) => {
    try {
      const { data } = await api.post("/api/tasks", payload);
      const newTask = data.task ?? data;
      if (newTask) setTasks(prev => [newTask, ...prev]);
      toast.success("Task added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add task");
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const { data } = await api.put(`/api/tasks/${id}`, updates);
      const updated = data.task ?? data;
      if (updated) setTasks(prev => prev.map(t => t._id === id ? updated : t));
      toast.success("Task updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  /* ---------- Loading UI ---------- */
  if (loading) {
    return (
      <div className="container py-8 space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          {[1,2,3,4].map(n => <Skeleton key={n} className="h-28" />)}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-2 card p-6 min-h-[280px]">Loading dashboard...</div>
          <div className="card p-6 min-h-[280px]">Loading widgets...</div>
        </div>
      </div>
    );
  }

  /* ---------- Main dashboard ---------- */
  return (
    <main className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Hello — manage your day</h1>
          <p className="text-sm text-gray-500">Overview of tasks, progress and AI suggestions</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search tasks..."
              value={filters.q}
              onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
              className="pl-10 pr-3 py-2 rounded-lg border bg-white/60 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <Link to="/app/calendar" className="btn btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Calendar
          </Link>

          <div className="p-2 rounded-lg bg-white/60 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid md:grid-cols-4 gap-4">
        <KpiCard icon={<Clock />} label="In Progress" value={stats.inProgress} color="text-sky-500" />
        <KpiCard icon={<CheckCircle2 />} label="Completed" value={stats.done} color="text-emerald-500" />
        <KpiCard icon={<AlertTriangle />} label="Overdue" value={stats.overdue} color="text-rose-500" />
        <KpiCard icon={<Plus />} label="Total" value={stats.total} color="text-indigo-500" />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Task area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-4">
            <TaskForm onAdd={addTask} />
            <div className="mt-4">
              <TaskFilters
                status={filters.status}
                priority={filters.priority}
                q={filters.q}
                onChange={(patch) => setFilters(prev => ({ ...prev, ...patch }))}
              />
            </div>
            <div className="mt-4">
              <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
            </div>
          </div>
        </div>

        {/* Right: Sidebar widgets */}
        <aside className="space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-500">Progress</div>
                <div className="font-bold text-xl">{Math.round((stats.done / Math.max(1, stats.total)) * 100)}%</div>
              </div>
              <div className="w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" innerRadius={30} outerRadius={45} fill="#8884d8" label>
                      {pieData.map((entry, i) => <Cell key={i} fill={["#60A5FA", "#F59E0B", "#10B981"][i % 3]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 mb-2">Recent</h4>
              <TasksMiniList tasks={tasks} />
            </div>
          </div>

          <WeeklyBar data={[]} />

          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">AI Assistant</h4>
              <div className="text-xs text-gray-500">Quick actions</div>
            </div>
            <AiAssistant />
          </div>
        </aside>
      </div>
    </main>
  );
}
