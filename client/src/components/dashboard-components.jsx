import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ✨ Modern KPI Card
export function CardKpi({ title, value, icon: Icon, color = "text-blue-500" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="p-5 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 
      dark:border-gray-800 flex items-center justify-between"
    >
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      {Icon && <Icon className={`w-8 h-8 ${color}`} />}
    </motion.div>
  );
}

// ✨ Modern Task Mini List
export function TasksMiniList({ tasks = [] }) {
  if (!tasks.length)
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No recent tasks.
      </p>
    );

  return (
    <div className="space-y-3">
      {tasks.slice(0, 5).map((t) => (
        <motion.div
          key={t._id}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(59,130,246,0.08)" }}
          className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 
          dark:border-gray-800 flex items-center justify-between cursor-pointer transition"
        >
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{t.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{t.status}</p>
          </div>

          {t.status === "done" ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : (
            <Clock className="text-yellow-500 w-5 h-5" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ✨ Premium Weekly Chart (Rounded, Smooth)
export function WeeklyChart({ data = [] }) {
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Mon", tasks: 3 },
          { name: "Tue", tasks: 5 },
          { name: "Wed", tasks: 2 },
          { name: "Thu", tasks: 6 },
          { name: "Fri", tasks: 4 },
        ];

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Weekly Productivity
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ borderRadius: 12 }} />
          <Bar dataKey="tasks" fill="#3b82f6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
