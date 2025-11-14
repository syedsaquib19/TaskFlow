import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, KanbanSquare, Home } from "lucide-react";
import { useUI } from "../store/ui";
import classNames from "classnames";

export default function Sidebar(){
  const { sidebarOpen } = useUI();
  return (
    <aside className={classNames(
      "transition-all border-r border-white/20 bg-white/50 dark:bg-gray-900/40 backdrop-blur",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4 font-extrabold text-lg">TF</div>
      <nav className="px-2 space-y-1">
        <Item to="/" icon={<Home size={18}/>} label="Home" compact={!sidebarOpen}/>
        <Item to="/dashboard" icon={<LayoutDashboard size={18}/>} label="Dashboard" compact={!sidebarOpen}/>
        <Item to="/app/board" icon={<KanbanSquare size={18}/>} label="Board" compact={!sidebarOpen}/>
        <Item to="/app/calendar" icon={<Calendar size={18}/>} label="Calendar" compact={!sidebarOpen}/>
      </nav>
    </aside>
  );
}

function Item({ to, icon, label, compact }){
  return (
    <NavLink to={to}
      className={({isActive}) => classNames(
        "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && "bg-gray-100 dark:bg-gray-800 font-semibold"
      )}>
      <span>{icon}</span>
      {!compact && <span>{label}</span>}
    </NavLink>
  );
}
