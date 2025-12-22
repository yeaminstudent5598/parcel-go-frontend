/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  LayoutDashboard, Package, Users, Ticket, 
  PlusCircle, LogOut, Menu, HomeIcon, Map // ✅ Map আইকন যুক্ত করা হয়েছে
} from "lucide-react";
import { type RootState } from "@/app/store";
import { clearAuth } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

const DashboardSidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.success("Logged out from dashboard");
  };

  // --- Role Based Menu Items ---
  const menuItems: any = {
    ADMIN: [
      { to: "/dashboard/admin", label: "Overview", icon: <LayoutDashboard size={20} /> },
      { to: "/dashboard/admin/fleet", label: "Fleet Monitor", icon: <Map size={20} /> }, // ✅ নতুন লিঙ্ক
      { to: "/dashboard/admin/coupons", label: "Coupons", icon: <Ticket size={20} /> },
      { to: "/dashboard/admin/users", label: "Manage Users", icon: <Users size={20} /> },
    ],
    SENDER: [
      { to: "/dashboard/sender", label: "My Shipments", icon: <Package size={20} /> },
      { to: "/dashboard/sender/create", label: "Book Parcel", icon: <PlusCircle size={20} /> },
    ],
    RECEIVER: [
      { to: "/dashboard/receiver", label: "Incoming", icon: <Package size={20} /> },
    ],
  };

  const activeMenu = menuItems[user?.role || "SENDER"];

  const NavLinks = () => (
    <nav className="flex flex-col gap-2 mt-6">
      {activeMenu.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none" 
                : "text-slate-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-800"
            }`
          }
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </NavLink>
      ))}
      
      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
        <NavLink 
          to="/" 
          className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-600 transition-colors dark:text-slate-300 dark:hover:text-blue-400"
        >
          <HomeIcon size={20} /> 
          <span className="font-medium">Back to Home</span>
        </NavLink>
        <Button 
          variant="ghost" 
          className="w-full flex justify-start gap-3 px-4 py-6 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
          onClick={handleLogout}
        >
          <LogOut size={20} /> 
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r p-6">
        <div className="flex items-center gap-3 px-2 mb-8">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200 dark:shadow-none">
             P
           </div>
           <div>
             <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">
               Parcel<span className="text-blue-600">Go</span>
             </h1>
             <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Dashboard</p>
           </div>
        </div>
        <NavLinks />
      </aside>

      {/* Mobile Drawer */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white shadow-md border-slate-200">
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
                <h1 className="text-xl font-black text-blue-600">ParcelGo</h1>
              </div>
              <NavLinks />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default DashboardSidebar;