// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/parcels", label: "Parcels", icon: <Package size={18} /> },
    { to: "/dashboard/users", label: "Users", icon: <Users size={18} /> },
    { to: "/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="h-screen w-60 bg-gray-100 border-r flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">ParcelGo</h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
