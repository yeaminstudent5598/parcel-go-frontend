/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@/api/dashboardApi"; 
import OverviewCards from "@/components/dashboard/OverviewCards";
import { ParcelTable } from "@/components/dashboard/ParcelTable";
import { UserTable } from "@/components/dashboard/UserTable";
import AdminBarChart from "@/components/dashboard/charts/AdminBarChart";
import { TableSkeleton } from "@/components/shared/SkeletonLoader"; // ✅ Added Skeleton

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
import { Package, Users as UsersIcon, Search, Filter, Activity } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [parcelPage, setParcelPage] = useState(1);
  const [parcelSearchTerm, setParcelSearchTerm] = useState("");
  const [parcelStatusFilter, setParcelStatusFilter] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [userSearchTerm, setUserSearchTerm] = useState("");

  // API Queries
  const { data: parcelsResponse, isLoading: parcelsLoading, isFetching: parcelsFetching } =
    useGetAllParcelsQuery({
      page: parcelPage,
      limit: 5,
      searchTerm: parcelSearchTerm,
      status: parcelStatusFilter,
    });

  const { data: usersResponse, isLoading: usersLoading, isFetching: usersFetching } =
    useGetUsersQuery({
      page: userPage,
      limit: 5,
      searchTerm: userSearchTerm,
    });

  const { data: statsResponse, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: trendsResponse, isLoading: trendsLoading } = useGetAdminMonthlyTrendsQuery();

  // Mutations
  const [updateParcelStatus] = useUpdateParcelStatusMutation();
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleUpdateStatus = (id: string, newStatus: ParcelStatus) => {
    updateParcelStatus({ id, status: newStatus })
      .unwrap()
      .then(() => toast.success(`Status updated to ${newStatus}`))
      .catch((err) => toast.error(err.data?.message || "Failed to update status"));
  };

  // ✅ সমাধান: handleBlockParcel ফাংশনটি এখন সরাসরি Table থেকে কল করা যাবে
  const handleBlockParcel = (id: string) => {
    // লজিক: যদি পার্সেলটি অলরেডি ব্লক থাকে তবে আনব্লক করবে, নাহলে ব্লক করবে।
    const parcel = parcelsResponse?.data?.find((p: any) => p._id === id);
    const shouldBlock = parcel?.status !== "CANCELLED"; // উদাহরণ লজিক

    (shouldBlock ? blockParcel(id) : unblockParcel(id))
      .unwrap()
      .then(() => toast.success(`Parcel ${shouldBlock ? "blocked" : "unblocked"}`))
      .catch((err) => toast.error(err.data?.message || "Action failed"));
  };

  const handleBlockUser = (id: string, isBlocked: boolean) => {
    updateUser({ id, isBlocked })
      .unwrap()
      .then(() => toast.success(`User ${isBlocked ? "blocked" : "unblocked"}`))
      .catch((err) => toast.error(err.data?.message || "Action failed"));
  };

  const allParcels = parcelsResponse?.data || [];
  const parcelMeta = parcelsResponse?.meta;
  const allUsers = usersResponse?.data || [];
  const userMeta = usersResponse?.meta;

  const cardStats = useMemo(() => {
    if (!statsResponse?.data) return [];
    const { totalParcels, delivered, inTransit, requested, cancelled } = statsResponse.data;
    return [
      { title: "Total Parcels", value: totalParcels || 0 },
      { title: "Delivered", value: delivered || 0 },
      { title: "In Transit", value: inTransit || 0 },
      { title: "Requested", value: requested || 0 },
      { title: "Cancelled", value: cancelled || 0 },
    ];
  }, [statsResponse]);

  const monthlyTrendsData = trendsResponse?.data || [];
  const globalLoading = statsLoading || trendsLoading;

  return (
    <div className="p-4 md:p-8 space-y-10 bg-slate-50/50 min-h-screen dark:bg-transparent">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-black tracking-tighter uppercase">Admin <span className="text-blue-600">Control Center</span></h1>
           <p className="text-slate-500 text-sm font-medium">Manage parcels, users, and monitor fleet performance.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-800">
           <Activity size={16} className="text-blue-600 animate-pulse" />
           <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">System Live</span>
        </div>
      </div>

      {/* Stats Cards */}
      <OverviewCards stats={cardStats} isLoading={globalLoading} />

      {/* Analytics Chart */}
      <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900">
         <CardHeader className="border-b border-slate-50 dark:border-slate-800 pb-6">
            <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-400">Monthly Shipment Trends</CardTitle>
         </CardHeader>
         <CardContent className="pt-10">
            <AdminBarChart data={monthlyTrendsData} />
         </CardContent>
      </Card>

      <Tabs defaultValue="parcels" className="w-full space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl inline-grid grid-cols-2 w-full md:w-[400px]">
          <TabsTrigger value="parcels" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"><Package size={16} className="mr-2"/> Parcels</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"><UsersIcon size={16} className="mr-2"/> Users</TabsTrigger>
        </TabsList>

        {/* Parcels Tab */}
        <TabsContent value="parcels" className="focus-visible:ring-0">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="space-y-4 pb-6 border-b border-slate-50 dark:border-slate-800">
              <CardTitle className="text-xl font-black">Parcel Management</CardTitle>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input
                    placeholder="Search by ID or Receiver..."
                    value={parcelSearchTerm}
                    onChange={(e) => setParcelSearchTerm(e.target.value)}
                    className="pl-10 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-3">
                   <Filter size={18} className="text-slate-400" />
                   <Select
                     value={parcelStatusFilter}
                     onValueChange={(value) => setParcelStatusFilter(value === "all" ? "" : value)}
                   >
                     <SelectTrigger className="w-[180px] h-12 rounded-xl border-slate-200">
                       <SelectValue placeholder="All Status" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Status</SelectItem>
                       <SelectItem value="REQUESTED">Requested</SelectItem>
                       <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                       <SelectItem value="DELIVERED">Delivered</SelectItem>
                       <SelectItem value="CANCELLED">Cancelled</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {parcelsLoading || parcelsFetching ? (
                <div className="p-10"><TableSkeleton /></div>
              ) : allParcels.length > 0 ? (
                <ParcelTable
                  parcels={allParcels}
                  onUpdateStatus={handleUpdateStatus}
                  onBlock={handleBlockParcel} // ✅ টাইপ এখন ম্যাচ করবে
                />
              ) : (
                <div className="py-20 text-center text-slate-400 font-bold italic">No parcels found matching your criteria.</div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between items-center px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Showing Page {parcelMeta?.page} of {Math.ceil((parcelMeta?.total || 0) / (parcelMeta?.limit || 1))}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline" size="sm" className="rounded-lg font-bold"
                  onClick={() => setParcelPage((p) => p - 1)}
                  disabled={!parcelMeta || parcelMeta.page <= 1}
                >Previous</Button>
                <Button
                  variant="outline" size="sm" className="rounded-lg font-bold"
                  onClick={() => setParcelPage((p) => p + 1)}
                  disabled={!parcelMeta || parcelMeta.page * parcelMeta.limit >= parcelMeta.total}
                >Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="focus-visible:ring-0">
          <Card className="border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="pb-6 border-b border-slate-50 dark:border-slate-800">
              <CardTitle className="text-xl font-black">User Directory</CardTitle>
              <div className="pt-4 max-w-sm relative">
                <Search className="absolute left-3 top-7 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  placeholder="Search by Name or Email..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none shadow-inner"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {usersLoading || usersFetching ? (
                <div className="p-10"><TableSkeleton /></div>
              ) : allUsers.length > 0 ? (
                <UserTable users={allUsers} onBlock={handleBlockUser} />
              ) : (
                <div className="py-20 text-center text-slate-400 font-bold italic">No users found.</div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50">
              <Button
                variant="outline" size="sm" className="rounded-lg font-bold"
                onClick={() => setUserPage((p) => p - 1)}
                disabled={!userMeta || userMeta.page <= 1}
              >Previous</Button>
              <Button
                variant="outline" size="sm" className="rounded-lg font-bold"
                onClick={() => setUserPage((p) => p + 1)}
                disabled={!userMeta || userMeta.page * userMeta.limit >= userMeta.total}
              >Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;