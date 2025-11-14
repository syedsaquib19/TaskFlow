import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, KanbanSquare, Settings } from "lucide-react";

export default function AppSidebar(){
  const Item = ({ to, icon: Icon, label }) => (
    <NavLink to={to} className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-semibold' : ''}`}>
      <Icon size={18} />
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  );

  return (
    <aside className="w-20 md:w-64 border-r border-white/10 bg-white/50 dark:bg-gray-900/40">
      {/* ...existing code... */}
      <div className="p-4 font-extrabold text-lg">
        TF
        <p className="text-xs opacity-70 mt-1">Smart Task Manager</p>
      </div>
      <nav className="px-2 py-2 space-y-1">
        <Item to="/app/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <Item to="/app/board" icon={KanbanSquare} label="Board" />
        <Item to="/app/calendar" icon={Calendar} label="Calendar" />
        <Item to="/app/settings" icon={Settings} label="Settings" />
      </nav>
    </aside>
  );
}