import { useState } from "react";
import { Search, Bell, User, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider"; // your existing ThemeProvider
import { useAuth } from "../store/auth";
import classNames from "classnames";

export default function Topbar(){
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white/60 dark:bg-gray-900/60 backdrop-blur border-b border-white/8">
      <div className="container flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-4">
          <div className="text-lg font-extrabold">TaskFlow</div>
          <div className="hidden md:flex items-center bg-white/80 dark:bg-gray-800/50 rounded-full px-3 py-1 shadow-sm">
            <Search size={16} className="text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tasks, tags..."
              className="bg-transparent outline-none px-3 py-1 w-64"
              aria-label="Search tasks"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <User size={16} />
            <span className="hidden sm:inline-block text-sm">{user?.name || "Guest"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
