import RoleProtected from "@/components/roleProtection/RoleProtected";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import mainLayout from "@/mainLayout/mainLayout";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import ReceiverDashboard from "@/pages/Dashboard/ReceiverDashboard";
import SenderDashboard from "@/pages/Dashboard/SenderDashboard";
import CreateParcelForm from "@/features/parcels/CreateParcelForm"; // <-- import
import About from "@/pages/Landing/About";
import Contact from "@/pages/Landing/Contact";
import Home from "@/pages/Landing/Home";
import { createBrowserRouter } from "react-router-dom";
import { DashboardRedirect } from "@/components/roleProtection/DashboardRedirect";

export const router = createBrowserRouter([
  {
    Component: mainLayout,
    path: "/",
    children: [
      { Component: Home, path: "/" },
      { Component: About, path: "about" },
      { Component: Contact, path: "contact" },
      { Component: Register, path: "register" },
      { Component: Login, path: "login" },

      {
        path: "dashboard",
        children: [
          {
            Component: () => (
              <RoleProtected allowedRoles={["SENDER"]}>
                <SenderDashboard />
              </RoleProtected>
            ),
            path: "sender",
          },
          {
            Component: () => (
              <RoleProtected allowedRoles={["RECEIVER"]}>
                <ReceiverDashboard />
              </RoleProtected>
            ),
            path: "receiver",
          },
          {
            Component: () => (
              <RoleProtected allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </RoleProtected>
            ),
            path: "admin",
          },
          {
            Component: DashboardRedirect,
            index: true,
          },
        ],
      },

      // Create Parcel route (sender only)
      {
        path: "dashboard/sender/create",
        Component: () => (
          <RoleProtected allowedRoles={["SENDER"]}>
            <CreateParcelForm />
          </RoleProtected>
        ),
      },
    ],
  },
]);
