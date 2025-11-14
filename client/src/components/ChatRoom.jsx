
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit("chatMessage", input);
    setInput("");
  };

  return (
    <div className="p-6 card bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-3 text-blue-600">💬 Team Chat</h2>

      <div className="h-64 overflow-y-auto border rounded-lg p-3 mb-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((m, i) => (
          <div key={i} className="text-sm mb-2">
            {m}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-800"
        />
        <button
          type="submit"
          className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
