import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function TaskModal({ open = false, onClose, initial = null }) {
  const [form, setForm] = useState({ title:'', description:'', priority:'medium', dueDate:'' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({ title:'', description:'', priority:'medium', dueDate:'' });
  }, [initial, open]);

  const submit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      if (initial && initial._id) {
        await api.put(`/api/tasks/${initial._id}`, form);
        toast.success("Task updated");
      } else {
        await api.post("/api/tasks", form);
        toast.success("Task created");
      }
      onClose?.();
    } catch (err) {
      toast.error("Save failed");
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.form initial={{ y:20, scale:0.98 }} animate={{ y:0, scale:1 }} exit={{ y:20, scale:0.98 }} onSubmit={submit}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl z-10">
            <h3 className="text-lg font-bold mb-3">{initial ? 'Edit task' : 'Add task'}</h3>
            <div className="grid gap-3">
  <input
    value={form.title}
    onChange={(e) => setForm({ ...form, title: e.target.value })}
    placeholder="Task title"
    required
    className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
  />
  <textarea
    value={form.description}
    onChange={(e) => setForm({ ...form, description: e.target.value })}
    placeholder="Description"
    className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
  />

  <div className="grid grid-cols-2 gap-2">
    <select
      value={form.priority}
      onChange={(e) => setForm({ ...form, priority: e.target.value })}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <input
      type="date"
      value={form.dueDate?.slice(0, 10) || ""}
      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    />
  </div>

  <div className="grid grid-cols-2 gap-2">
    <select
      value={form.recurrence || "none"}
      onChange={(e) => setForm({ ...form, recurrence: e.target.value })}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      <option value="none">No Recurrence</option>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>

    <input
      type="datetime-local"
      value={form.reminderTime ? new Date(form.reminderTime).toISOString().slice(0, 16) : ""}
      onChange={(e) => setForm({ ...form, reminderTime: e.target.value })}
      className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    />
  </div>
  <div>
    <Attachments task={initial} onUpdate={onUpdate} />
  </div>
</div>


            <div className="mt-4 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
              <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
