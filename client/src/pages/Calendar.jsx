// client/src/pages/Calendar.jsx
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../lib/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";
import "../styles/fullcalendar-overrides.css"; // optional small overrides

// Create or reuse socket instance (matches Kanban usage)
const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:4000", {
  withCredentials: true,
});

function mapTasksToEvents(tasks) {
  return tasks
    .filter(t => t.dueDate) // only tasks with a dueDate
    .map(t => ({
      id: t._id,
      title: t.title,
      start: t.dueDate,
      allDay: true,
      extendedProps: {
        priority: t.priority,
        status: t.status,
        description: t.description
      }
    }));
}

export default function CalendarPage() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load events for a given date range
  const fetchRange = async (startStr, endStr) => {
    try {
      // request tasks in the visible range
      const params = { start: startStr, end: endStr, limit: 1000 };
      const { data } = await api.get("/api/tasks", { params });
      const ev = mapTasksToEvents(data.tasks);
      setEvents(ev);
    } catch (err) {
      toast.error("Failed to load calendar tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial fetch: current month
    const calApi = calendarRef.current?.getApi();
    if (calApi) {
      const view = calApi.view;
      fetchRange(view.activeStart.toISOString(), view.activeEnd.toISOString());
    } else {
      // fallback: fetch month around today
      const d = new Date();
      const start = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
      const end = new Date(d.getFullYear(), d.getMonth()+1, 0).toISOString();
      fetchRange(start, end);
    }

    // socket listeners
    socket.on("task:create", (t) => {
      if (t.dueDate) setEvents(prev => [...prev, {
        id: t._id, title: t.title, start: t.dueDate, allDay: true, extendedProps: { priority: t.priority, status: t.status }
      }]);
    });
    socket.on("task:update", (t) => {
      setEvents(prev => prev.map(e => e.id === t._id ? { id: t._id, title: t.title, start: t.dueDate, allDay: true, extendedProps: { priority: t.priority, status: t.status } } : e));
    });
    socket.on("task:delete", (id) => {
      setEvents(prev => prev.filter(e => e.id !== id));
    });

    return () => {
      socket.off("task:create");
      socket.off("task:update");
      socket.off("task:delete");
      // do not disconnect socket here to keep consistent with other pages
    };
  }, []);

  // When the calendar view changes, fetch events for the new range
  const handleDatesSet = (arg) => {
    const start = arg.start.toISOString();
    const end = arg.end.toISOString();
    fetchRange(start, end);
  };

  // User drags an event -> update dueDate in backend
  const handleEventDrop = async (dropInfo) => {
    const event = dropInfo.event;
    const newDate = event.start; // Date object
    try {
      const iso = newDate.toISOString();
      const { data } = await api.put(`/api/tasks/${event.id}`, { dueDate: iso });
      toast.success("Task rescheduled");
      // the socket will update other clients; update local event too:
      setEvents(prev => prev.map(e => e.id === data._id ? { id: data._id, title: data.title, start: data.dueDate, allDay: true, extendedProps: { priority: data.priority, status: data.status } } : e));
    } catch (err) {
      toast.error("Failed to reschedule");
      dropInfo.revert();
    }
  };

  // User selects a slot -> quick create a task
  const handleSelect = async (selectInfo) => {
    const title = window.prompt("Quick create task title:");
    if (!title) return;
    const date = selectInfo.start; // Date object
    try {
      const { data } = await api.post("/api/tasks", { title, dueDate: date.toISOString() });
      toast.success("Task created");
      // socket will broadcast; additionally add locally:
      setEvents(prev => [...prev, { id: data._id, title: data.title, start: data.dueDate, allDay: true, extendedProps: { priority: data.priority, status: data.status } }]);
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  return (
    <main className="container py-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <div className="card p-4">
        {loading && <p className="opacity-70">Loading calendar...</p>}
        <FullCalendar
          ref={calendarRef}
          initialView="dayGridMonth"
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          editable={true}
          events={events}
          datesSet={handleDatesSet}
          eventDrop={handleEventDrop}
          select={handleSelect}
          eventDisplay="block"
          height="auto"
        />
      </div>
    </main>
  );
}
