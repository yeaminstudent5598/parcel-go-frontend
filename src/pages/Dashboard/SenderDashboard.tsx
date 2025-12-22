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
import { TableSkeleton } from "@/components/ui/TableSkeleton"; 
import { Search, Plus, Filter } from "lucide-react";
import RoleActionCenter from "./RoleActionCenter";

const SenderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: parcelsResponse, isLoading: parcelsLoading, isError } = useGetMyParcelsQuery({
    page,
    limit: 5,
    searchTerm,
    status: statusFilter,
  });

  const { data: statsResponse, isLoading: statsLoading } = useGetSenderStatsQuery();
  const [cancelParcel] = useCancelParcelMutation();

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
    setPage(1);
  };

  const handleStatusFilter = (val: string) => {
    setStatusFilter(val === "all" ? "" : val);
    setPage(1);
  };

  const myParcels = parcelsResponse?.data || [];
  const totalParcels = parcelsResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalParcels / 5);
  const selectedParcel = myParcels.find((p: IParcel) => p._id === selectedParcelId);

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

  const chartData = useMemo(() => {
    if (!statsResponse?.data?.statuses) return [];
    return Object.entries(statsResponse.data.statuses).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      value: value as number,
    }));
  }, [statsResponse]);

  if (isError) return <div className="p-20 text-center text-red-500 font-bold">Failed to load dashboard data.</div>;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <Helmet><title>Dashboard | Sender | ParcelGo</title></Helmet>
      
      <GuidedTour />

      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white uppercase">Sender <span className="text-blue-600">Dashboard</span></h1>
          <p className="text-slate-500 mt-1 font-medium">Track and manage all your outgoing parcels.</p>
        </div>
        <Button onClick={() => navigate("/dashboard/sender/create")} className="bg-blue-600 hover:bg-blue-700 shadow-lg h-12 px-6 rounded-xl font-bold">
          <Plus className="mr-2 h-5 w-5" /> Book New Parcel
        </Button>
      </div>

      <RoleActionCenter /> 

      <OverviewCards stats={cardStats} isLoading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* --- Search & Filter Bar --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl border">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input placeholder="Search Tracking ID..." value={searchTerm} onChange={handleSearchChange} className="pl-10 h-10 rounded-lg" />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <Select value={statusFilter || "all"} onValueChange={handleStatusFilter}>
                <SelectTrigger className="rounded-lg"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="REQUESTED">Requested</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* --- Parcel Table --- */}
          <div id="parcel-table-card" className="bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden">
            {parcelsLoading ? <TableSkeleton rows={5} /> : (
              <>
                <ParcelTable 
                  parcels={myParcels} 
                  onCancel={handleCancel} 
                  onViewDetails={(id) => setSelectedParcelId(id)} 
                />
                
                {/* ✅ প্যাজিনেশন পুনরায় যোগ করা হয়েছে (এটিই মিসিং ছিল) */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-t">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Page {page} of {totalPages || 1}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPage(p => Math.max(1, p - 1))} 
                      disabled={page <= 1}
                      className="rounded-lg font-bold"
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPage(p => p + 1)} 
                      disabled={page >= totalPages}
                      className="rounded-lg font-bold"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border overflow-hidden p-2">
              <div className="p-3 border-b mb-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Parcel Distribution</h3>
              </div>
              <StatusPieChart data={chartData} isLoading={statsLoading} />
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