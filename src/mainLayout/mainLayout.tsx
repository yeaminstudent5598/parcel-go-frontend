// mainLayout.ts
import GuidedTour from "@/components/GuidedTour";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      {/* Tour এখানে */}
      <GuidedTour />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
