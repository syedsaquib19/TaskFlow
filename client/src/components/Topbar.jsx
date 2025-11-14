import { useUI } from "../store/ui";
import { useTheme } from "./ThemeProvider";
import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { useAuth } from "../store/auth";
import toast from "react-hot-toast";

export default function Topbar(){
  const { toggleSidebar } = useUI();
  const { theme, toggle } = useTheme();
  const { user, clearAuth } = useAuth();

  const logout = () => { clearAuth(); toast.success("Logged out"); };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-gray-900/50 border-b border-white/20">
      <div className="container flex items-center justify-between h-14">
        <button onClick={toggleSidebar} className="btn-ghost" aria-label="Toggle sidebar"><Menu size={20} /></button>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="btn-ghost" aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
          </button>
          {user && (
            <button onClick={logout} className="btn-ghost" aria-label="Logout"><LogOut size={18}/></button>
          )}
        </div>
      </div>
    </header>
  );
}
