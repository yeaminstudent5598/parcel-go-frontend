import { createBrowserRouter } from "react-router-dom";
import RoleProtected from "@/components/roleProtection/RoleProtected";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import MainLayout from "@/mainLayout/mainLayout";
import DashboardLayout from "@/mainLayout/DashboardLayout"; // নতুন লেআউট
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ReceiverDashboard from "@/pages/Dashboard/ReceiverDashboard";
import SenderDashboard from "@/pages/Dashboard/SenderDashboard";
import CreateParcelForm from "@/features/parcels/CreateParcelForm";
import About from "@/pages/Landing/About";
import Contact from "@/pages/Landing/Contact";
import Home from "@/pages/Landing/Home";
import ProfilePage from "@/pages/ProfilePage";
import FeaturesPage from "@/pages/Landing/Features";
import FAQPage from "@/pages/Landing/FAQ";
import CouponManagement from "@/pages/Dashboard/Admin/CouponManagement";
import { DashboardRedirect } from "@/components/roleProtection/DashboardRedirect";
import TrackingPage from "@/pages/Landing/TrackingPage";
import AdminTrackingMap from "@/pages/Dashboard/Admin/AdminTrackingMap";
import StandardDelivery from "@/pages/Services/StandardDelivery";
import ExpressPlus from "@/pages/Services/ExpressPlus";
import GlobalShipping from "@/pages/Services/GlobalShipping";
import DistrictsPage from "@/pages/Landing/DistrictsPage";
import AllServices from "@/pages/Landing/AllServices";
import Terms from "@/pages/Landing/Terms";
import Privacy from "@/pages/Landing/Privacy";
import CalculateRate from "@/pages/Landing/CalculateRate";
import GlobalShippingPolicy from "@/pages/Landing/GlobalShippingPolicy";
import CompanyOverview from "@/pages/Landing/CompanyOverview";
import ManageUsers from "@/pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  // ১. পাবলিক ল্যান্ডিং পেজ (Navbar + Footer থাকবে)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "features", element: <FeaturesPage /> },
      { path: "faq", element: <FAQPage /> },
      { path: "track", element: <TrackingPage /> }, // ✅ তোমার ট্র্যাকিং পেজ
      { path: "services/standard", element: <StandardDelivery /> },
      { path: "services/express", element: <ExpressPlus /> },
      { path: "services/global", element: <GlobalShipping /> },
      { path: "districts", element: <DistrictsPage /> },
      {
        path: "services",
        element: <AllServices />,
      },
      { path: "terms", element: <Terms /> }, // ✅ Terms রাউট যোগ হলো
      { path: "privacy", element: <Privacy /> },
      {
          path: "calculate-rate",
          element: <CalculateRate />,
       },
       {
          path: "global-policy",
          element: <GlobalShippingPolicy />,
        },
        {
          path: "company",
          element: <CompanyOverview />,
        },
    ],
  },

  // ২. প্রোটেক্টেড ড্যাশবোর্ড পেজ (Sidebar থাকবে, Footer থাকবে না)
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // Admin Routes
      {
        path: "admin",
        element: (
          <RoleProtected allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </RoleProtected>
        ),
      },
      {
        path: "admin/coupons",
        element: (
          <RoleProtected allowedRoles={["ADMIN"]}>
            <CouponManagement />
          </RoleProtected>
        ),
      },
      {
       path: "admin/fleet",
        element: (
          <RoleProtected allowedRoles={["ADMIN"]}>
            <AdminTrackingMap />
          </RoleProtected>
        ),
      },
     {
          path: "admin/users", // এটি মূলত ড্যাশবোর্ড পাথের চাইল্ড
          element:  (
          <RoleProtected allowedRoles={["ADMIN"]}>
            <ManageUsers />
          </RoleProtected>
        ),
        },

      // Sender Routes
      {
        path: "sender",
        element: (
          <RoleProtected allowedRoles={["SENDER"]}>
            <SenderDashboard />
          </RoleProtected>
        ),
      },
      {
        path: "sender/create",
        element: (
          <RoleProtected allowedRoles={["SENDER"]}>
            <CreateParcelForm />
          </RoleProtected>
        ),
      },

      // Receiver Routes
      {
        path: "receiver",
        element: (
          <RoleProtected allowedRoles={["RECEIVER"]}>
            <ReceiverDashboard />
          </RoleProtected>
        ),
      },

      // Dashboard Root Redirect
      {
        index: true,
        element: <DashboardRedirect />,
      },
    ],
  },
]);