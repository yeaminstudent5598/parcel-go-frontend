/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetMyParcelsQuery, useCancelParcelMutation, useGetSenderStatsQuery } from "@/api/parcelApi";
import OverviewCards from "@/components/dashboard/OverviewCards";
import { ParcelTable } from "@/components/dashboard/ParcelTable";
import StatusTimeline from "@/components/dashboard/StatusTimeline";
import StatusPieChart from "@/components/dashboard/charts/PieChart";
import GuidedTour from "@/components/GuidedTour";
import type { IParcel } from "@/types/parcel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { TableSkeleton } from "@/components/ui/TableSkeleton"; // ✅ Ensure this component exists
import { Search, Filter, Plus } from "lucide-react";

const SenderDashboard: React.FC = () => {
  const navigate = useNavigate();

  // --- Search, Filter & Pagination States ---
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetching Data with States
  const { data: parcelsResponse, isLoading: parcelsLoading, isError } = useGetMyParcelsQuery({
    page,
    limit: 5,
    searchTerm,
    status: statusFilter,
  });

  const { data: statsResponse, isLoading: statsLoading } = useGetSenderStatsQuery();
  const [cancelParcel] = useCancelParcelMutation();

  // --- Handlers ---
  const handleCancel = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this delivery request?")) {
      try {
        await cancelParcel(id).unwrap();
        toast.success("Parcel shipment cancelled successfully.");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to cancel shipment.");
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to page 1 on search (Requirement: filter/search sync)
  };

  const handleStatusFilter = (val: string) => {
    setStatusFilter(val === "all" ? "" : val);
    setPage(1); // Reset to page 1 on filter
  };

  const myParcels = parcelsResponse?.data || [];
  const totalParcels = parcelsResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalParcels / 5);
  const selectedParcel = myParcels.find((p: IParcel) => p._id === selectedParcelId);

  // Overview Stats Logic
  const cardStats = useMemo(() => {
    if (!statsResponse?.data) return [];
    const { totalParcels, statuses } = statsResponse.data;
    return [
      { title: "Total Parcels", value: totalParcels || 0 },
      { title: "Requested", value: statuses?.REQUESTED || 0 },
      { title: "Delivered", value: statuses?.DELIVERED || 0 },
      { title: "Cancelled", value: statuses?.CANCELLED || 0 },
    ];
  }, [statsResponse]);

  // Chart Logic
  const chartData = useMemo(() => {
    if (!statsResponse?.data?.statuses) return [];
    return Object.entries(statsResponse.data.statuses).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      value: value as number,
    }));
  }, [statsResponse]);

  if (isError) return <div className="p-20 text-center text-red-500 font-bold">Failed to load dashboard data. Please try again later.</div>;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <Helmet>
        <title>Dashboard | Sender | ParcelGo</title>
      </Helmet>
      
      <GuidedTour />

      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">Sender Dashboard</h1>
          <p className="text-slate-500 mt-1">Track and manage all your outgoing parcels from one place.</p>
        </div>
        <Button onClick={() => navigate("/dashboard/sender/create")} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 dark:shadow-none h-12 px-6">
          <Plus className="mr-2 h-5 w-5" /> Book New Parcel
        </Button>
      </div>

      {/* --- Stats Cards --- */}
      <OverviewCards stats={cardStats} isLoading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* --- Search & Filter Bar (Requirement) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl border">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by Tracking ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 h-10"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              <Select value={statusFilter || "all"} onValueChange={handleStatusFilter}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="REQUESTED">Requested</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* --- Parcel Table with SKELETON LOADER (Requirement) --- */}
          <div id="parcel-table-card">
            {parcelsLoading ? (
              <TableSkeleton rows={5} /> 
            ) : (
              <ParcelTable 
                parcels={myParcels} 
                onCancel={handleCancel} 
                onViewDetails={(id) => setSelectedParcelId(id)} 
              />
            )}
          </div>

          {/* --- Pagination Controls (Requirement) --- */}
          <div className="flex items-center justify-between px-2 pt-4">
            <p className="text-sm text-slate-500 font-medium">
              Showing page {page} of {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page <= 1}
                className="rounded-lg"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p + 1)} 
                disabled={page >= totalPages}
                className="rounded-lg"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* --- Sidebar: Analytics & Timeline --- */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Analytics</h3>
            </div>
            <div className="p-2">
              <StatusPieChart data={chartData} isLoading={statsLoading} />
            </div>
          </div>

          {selectedParcel && (
             <div className="animate-in slide-in-from-right duration-500">
                <StatusTimeline parcel={selectedParcel} />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SenderDashboard;