// D:\yeamin student\Programming hero level 2\Assignment6\ParcelGo\src\pages\Dashboard\AdminDashboard.tsx

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetAllParcelsQuery,
  useBlockParcelMutation,
  useUnblockParcelMutation,
  useUpdateParcelStatusMutation,
} from "@/api/parcelApi";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/api/userApi";
import {
  useGetAdminStatsQuery,
  useGetAdminMonthlyTrendsQuery,
} from "@/api/dashboardApi"; // ✅ monthly trends API এখানে
import OverviewCards from "@/components/dashboard/OverviewCards";
import { ParcelTable } from "@/components/dashboard/ParcelTable";
import { UserTable } from "@/components/dashboard/UserTable";
import AdminBarChart from "@/components/dashboard/charts/AdminBarChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { ParcelStatus } from "@/types/parcel";

const AdminDashboard: React.FC = () => {
  // States for Parcel Table
  const [parcelPage, setParcelPage] = useState(1);
  const [parcelSearchTerm, setParcelSearchTerm] = useState("");
  const [parcelStatusFilter, setParcelStatusFilter] = useState("");

  // States for User Table
  const [userPage, setUserPage] = useState(1);
  const [userSearchTerm, setUserSearchTerm] = useState("");

  // API Hooks
  const { data: parcelsResponse, isLoading: parcelsLoading } =
    useGetAllParcelsQuery({
      page: parcelPage,
      limit: 5,
      searchTerm: parcelSearchTerm,
      status: parcelStatusFilter,
    });

  const { data: usersResponse, isLoading: usersLoading } =
    useGetUsersQuery({
      page: userPage,
      limit: 5,
      searchTerm: userSearchTerm,
    });

  const { data: statsResponse, isLoading: statsLoading } =
    useGetAdminStatsQuery();

  const { data: trendsResponse, isLoading: trendsLoading } =
    useGetAdminMonthlyTrendsQuery();

  const [updateParcelStatus] = useUpdateParcelStatusMutation();
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();
  const [updateUser] = useUpdateUserMutation();

  // Handler Functions
  const handleUpdateStatus = (id: string, newStatus: ParcelStatus) => {
    updateParcelStatus({ id, status: newStatus })
      .unwrap()
      .then(() => toast.success(`Status updated to ${newStatus}`))
      .catch((err) =>
        toast.error(err.data?.message || "Failed to update status")
      );
  };

  const handleBlockParcel = (id: string, shouldBlock: boolean) => {
    (shouldBlock ? blockParcel(id) : unblockParcel(id))
      .unwrap()
      .then(() =>
        toast.success(`Parcel ${shouldBlock ? "blocked" : "unblocked"}`)
      )
      .catch((err) => toast.error(err.data?.message || "Action failed"));
  };

  const handleBlockUser = (id: string, isBlocked: boolean) => {
    updateUser({ id, isBlocked })
      .unwrap()
      .then(() =>
        toast.success(`User ${isBlocked ? "blocked" : "unblocked"}`)
      )
      .catch((err) => toast.error(err.data?.message || "Action failed"));
  };

  // Memoized Data
  const allParcels = parcelsResponse?.data || [];
  const parcelMeta = parcelsResponse?.meta;
  const allUsers = usersResponse?.data || [];
  const userMeta = usersResponse?.meta;

  const cardStats = useMemo(() => {
    if (!statsResponse?.data) return [];
    const { totalParcels, delivered, inTransit, requested, cancelled } =
      statsResponse.data;
    return [
      { title: "Total Parcels", value: totalParcels || 0 },
      { title: "Delivered", value: delivered || 0 },
      { title: "In Transit", value: inTransit || 0 },
      { title: "Requested", value: requested || 0 },
      { title: "Cancelled", value: cancelled || 0 },
    ];
  }, [statsResponse]);

  const monthlyTrendsData = trendsResponse?.data || [];

  const isLoading =
    parcelsLoading || usersLoading || statsLoading || trendsLoading;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="">
        <OverviewCards stats={cardStats} isLoading={isLoading} />
      </div>

      {/* Monthly Trends Chart */}
      <div className="grid gap-6">
        <AdminBarChart data={monthlyTrendsData} />
      </div>

      {/* Tabs: Parcels & Users */}
      <Tabs defaultValue="parcels" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parcels">Manage Parcels</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
        </TabsList>

        {/* Parcels Tab */}
        <TabsContent value="parcels">
          <Card>
            <CardHeader>
              <CardTitle>All Parcels</CardTitle>
              <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4">
                <Input
                  placeholder="Search parcels..."
                  value={parcelSearchTerm}
                  onChange={(e) => setParcelSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
                <Select
                  value={parcelStatusFilter}
                  onValueChange={(value) =>
                    setParcelStatusFilter(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="REQUESTED">Requested</SelectItem>
                    <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ParcelTable
                parcels={allParcels}
                onUpdateStatus={handleUpdateStatus}
                onBlock={handleBlockParcel}
              />
            </CardContent>
            <CardFooter className="flex justify-end items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setParcelPage((p) => p - 1)}
                disabled={!parcelMeta || parcelMeta.page <= 1}
              >
                Previous
              </Button>
              <span>
                Page {parcelMeta?.page || 1} of{" "}
                {parcelMeta
                  ? Math.ceil(parcelMeta.total / parcelMeta.limit)
                  : 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setParcelPage((p) => p + 1)}
                disabled={
                  !parcelMeta ||
                  parcelMeta.page * parcelMeta.limit >= parcelMeta.total
                }
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <div className="flex items-center gap-4 pt-4">
                <Input
                  placeholder="Search users..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            </CardHeader>
            <CardContent>
              <UserTable users={allUsers} onBlock={handleBlockUser} />
            </CardContent>
            <CardFooter className="flex justify-end items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserPage((p) => p - 1)}
                disabled={!userMeta || userMeta.page <= 1}
              >
                Previous
              </Button>
              <span>
                Page {userMeta?.page || 1} of{" "}
                {userMeta
                  ? Math.ceil(userMeta.total / userMeta.limit)
                  : 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUserPage((p) => p + 1)}
                disabled={
                  !userMeta ||
                  userMeta.page * userMeta.limit >= userMeta.total
                }
              >
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
