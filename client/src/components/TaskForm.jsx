import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const submit = (e) => {
    e.preventDefault();
    onAdd({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form onSubmit={submit} className="card p-4 grid md:grid-cols-3 gap-3 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className="btn btn-primary">Add Task</button>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="md:col-span-3 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50"
      />
    </form>
  );
}
