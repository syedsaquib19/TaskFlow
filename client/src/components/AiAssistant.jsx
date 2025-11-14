import React, { useState } from "react";
import axios from "axios";

export default function AiAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a task or question.");
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/ai/generate",
        { prompt }
      );

      setResponse(res.data.result);
    } catch (error) {
      console.error("AI error:", error);
      setResponse("⚠️ Error connecting to AI service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 p-8">
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
        TaskFlow AI Assistant 🤖
      </h1>

      <img
        src="/ai-bot.svg"
        alt="AI Bot"
        className="w-32 h-32 mb-6 animate-bounce drop-shadow-lg"
      />

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me to generate tasks or plan your day..."
        className="w-full max-w-xl p-4 rounded-lg shadow-md text-gray-700 dark:text-gray-100 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Generate Tasks"}
        </button>

        <button
          onClick={() => {
            setPrompt("");
            setResponse("");
          }}
          className="px-6 py-3 bg-white text-blue-600 rounded-full shadow hover:bg-gray-100 transition"
        >
          Clear
        </button>
      </div>

      {response && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl text-left">
          <h2 className="font-semibold mb-2 text-blue-600">AI Response:</h2>
          <p className="whitespace-pre-line opacity-90">{response}</p>
        </div>
      )}
    </div>
  );
}
