
import { useState, useEffect } from "react";

export default function FocusMode() {
  const [seconds, setSeconds] = useState(1500); // 25 min Pomodoro
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      if (!isBreak) {
        setIsBreak(true);
        setSeconds(300); // 5 min break
      } else {
        setIsBreak(false);
        setSeconds(1500);
      }
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, seconds, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setSeconds(isBreak ? 300 : 1500);
    setIsActive(false);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="p-6 card bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2 text-blue-600">
        🎯 {isBreak ? "Break Time" : "Focus Mode"}
      </h2>

      <p className="text-5xl font-mono mb-4">
        {minutes}:{secs.toString().padStart(2, "0")}
      </p>

      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className="btn btn-primary px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="btn btn-secondary px-5 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
