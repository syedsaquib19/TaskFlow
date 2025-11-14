// client/src/pages/AiPage.jsx
import AiAssistant from "../components/AiAssistant";

export default function AiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
          🤖 TaskFlow AI Assistant
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Ask anything about productivity, planning, or your TaskFlow projects!
        </p>

        <AiAssistant />
      </div>
    </div>
  );
}
