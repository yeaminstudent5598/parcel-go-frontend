import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* বাম পাশে ফিক্সড সাইডবার */}
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;