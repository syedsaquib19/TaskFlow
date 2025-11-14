import { Trash2, Edit2 } from "lucide-react";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div
          key={t._id}
          className="card p-4 flex justify-between items-center hover:shadow-md transition"
        >
          <div>
            <h4 className="font-semibold">{t.title}</h4>
            <p className="text-sm opacity-80">{t.description}</p>
            <p className="text-xs mt-1">Priority: <b className="capitalize">{t.priority}</b></p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onUpdate(t._id, { status: t.status === "done" ? "backlog" : "done" })
              }
              className="btn btn-ghost text-green-600"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(t._id)}
              className="btn btn-ghost text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
