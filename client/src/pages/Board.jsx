import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import io from "socket.io-client";
import api from "../lib/axios";
import toast from "react-hot-toast";

const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:4000", {
  withCredentials: true,
});

const columnsOrder = ["backlog", "in-progress", "review", "done"];
const columnsNames = {
  backlog: "Backlog",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const { data } = await api.get("/api/tasks");
      // handle case: backend returns { total, tasks } or just array
      setTasks(data.tasks || data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();

    // Socket listeners for real-time updates
    socket.on("task:create", (t) => setTasks((prev) => [t, ...prev]));
    socket.on("task:update", (t) =>
      setTasks((prev) => prev.map((x) => (x._id === t._id ? t : x)))
    );
    socket.on("task:delete", (id) =>
      setTasks((prev) => prev.filter((x) => x._id !== id))
    );

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
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
      toast.success(`Moved to ${columnsNames[newStatus]}`);
    } catch {
      toast.error("Failed to move task");
    }
  };

  if (loading) return <p className="text-center py-10">Loading board...</p>;

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

                  {tasks
                    .filter((t) => t.status === col)
                    .map((t, idx) => (
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
