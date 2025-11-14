import { BarChart3, Bell, KanbanSquare, ListTodo } from "lucide-react";

const features = [
  { icon: ListTodo, title: "Tasks & Subtasks", desc: "Create, update, and track tasks with priorities & due dates." },
  { icon: KanbanSquare, title: "Workflow", desc: "Move work across statuses with a clean, kanban-like flow." },
  { icon: BarChart3, title: "Analytics", desc: "See progress trends, completion rates, and timelines." },
  { icon: Bell, title: "Reminders", desc: "Stay on top with notifications and due reminders." }
];

export default function FeatureGrid() {
  return (
    <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((f, i) => (
        <div key={i} className="card p-6 hover:shadow-xl transition">
          <f.icon className="text-blue-600 mb-3" />
          <h3 className="font-semibold text-lg">{f.title}</h3>
          <p className="opacity-80 mt-1 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
