import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import io from "socket.io-client";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:4000", {
  withCredentials: true,
});

const columnsOrder = ["backlog", "in-progress", "review", "done"];
const columnsNames = {
  "backlog": "Backlog",
  "in-progress": "In Progress",
  "review": "Review",
  "done": "Done",
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const { data } = await api.get("/api/tasks");
    setTasks(data.tasks);
  };

  useEffect(() => {
    loadTasks();

    socket.on("task:create", (t) => setTasks(prev => [t, ...prev]));
    socket.on("task:update", (t) => setTasks(prev => prev.map(x => x._id === t._id ? t : x)));
    socket.on("task:delete", (id) => setTasks(prev => prev.filter(x => x._id !== id)));

    return () => socket.disconnect();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    const taskId = result.draggableId;
    const newStatus = destination.droppableId;

    try {
      const { data } = await api.put(`/api/tasks/${taskId}`, { status: newStatus });
      setTasks(prev => prev.map(t => t._id === taskId ? data : t));
      toast.success(`Moved to ${columnsNames[newStatus]}`);
    } catch {
      toast.error("Failed to move task");
    }
  };

  return (
    <main className="p-6 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 min-w-[800px]">
          {columnsOrder.map((col) => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-w-[250px] card p-3"
                >
                  <h3 className="font-bold mb-2">{columnsNames[col]}</h3>
                  {tasks.filter(t => t.status === col).map((t, idx) => (
                    <Draggable key={t._id} draggableId={t._id} index={idx}>
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className="p-3 mb-2 rounded-lg bg-white/80 dark:bg-gray-800/60 shadow hover:shadow-md transition"
                        >
                          <p className="font-semibold">{t.title}</p>
                          <p className="text-xs opacity-70">{t.priority}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  // import avatar placeholder and motion
import { motion } from "framer-motion";

// inside Draggable render:
<Draggable key={t._id} draggableId={t._id} index={idx}>
  {(prov) => (
    <motion.div
      ref={prov.innerRef}
      {...prov.draggableProps}
      {...prov.dragHandleProps}
      layout
      initial={{ opacity: 0.98 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-3 mb-2 rounded-lg bg-white/80 dark:bg-gray-800/60 shadow hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{t.title}</p>
            <div className={`text-xs px-2 py-0.5 rounded-full ${t.priority === 'high' ? 'bg-red-100 text-red-600' : t.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
              {t.priority}
            </div>
          </div>
          <p className="text-xs opacity-70 mt-1">{t.description?.slice(0,80)}</p>
          <div className="flex items-center gap-2 mt-3">
            {t.assignees?.slice(0,3).map((a,i) => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-xs flex items-center justify-center">{a?.[0] || 'U'}</div>)}
            <div className="text-xs opacity-70 ml-auto">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : ''}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )}
</Draggable>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </main>
  );
}
