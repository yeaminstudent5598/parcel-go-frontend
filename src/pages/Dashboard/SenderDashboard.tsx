import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetMyParcelsQuery, useCancelParcelMutation, useGetSenderStatsQuery } from "@/api/parcelApi";
import OverviewCards from "@/components/dashboard/OverviewCards";
import { ParcelTable } from "@/components/dashboard/ParcelTable";
import StatusTimeline from "@/components/dashboard/StatusTimeline";
import StatusPieChart from "@/components/dashboard/charts/PieChart";
import type { IParcel } from "@/types/parcel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SenderDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // State for filters and pagination
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: parcelsResponse, isLoading: parcelsLoading, isError } = useGetMyParcelsQuery({
    page,
    limit: 5, // প্রতি পেজে ৫টি আইটেম
    searchTerm,
    status: statusFilter,
  });
  
  const { data: statsResponse, isLoading: statsLoading } = useGetSenderStatsQuery();
  const [cancelParcel] = useCancelParcelMutation();

  const handleCancel = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this parcel?");
    if (isConfirmed) {
      try {
        await cancelParcel(id).unwrap();
        toast.success("Parcel cancelled successfully.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to cancel parcel.");
      }
    }
  };
  const handleViewDetails = (id: string) => setSelectedParcelId(id);

  const myParcels = parcelsResponse?.data || [];
  const totalParcels = parcelsResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalParcels / 5);
  
  const selectedParcel = myParcels.find((p: IParcel) => p._id === selectedParcelId);

  // Data for OverviewCards
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

  // Data for PieChart
  const chartData = useMemo(() => {
    if (!statsResponse?.data?.statuses) return [];
    return Object.entries(statsResponse.data.statuses).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      value: value as number,
    }));
  }, [statsResponse]);

  const isLoading = parcelsLoading || statsLoading;
  if (isError) return <div className="p-6 text-center text-red-500">Failed to load data.</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Sender Dashboard</h1>
        <Button onClick={() => navigate("/dashboard/sender/create")}>+ Create Parcel</Button>
      </div>

      <OverviewCards stats={cardStats} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Table and Filters */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Input
              placeholder="Search by Tracking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select 
              value={statusFilter} 
              onValueChange={(value) => {
                // ✅ যদি ব্যবহারকারী 'all' সিলেক্ট করে, তাহলে ফিল্টার খালি করে দিন
                if (value === 'all') {
                  setStatusFilter('');
                } else {
                  setStatusFilter(value);
                }
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {/* ✅ "All Statuses" এর জন্য একটি নন-এমপ্টি ভ্যালু ব্যবহার করুন */}
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="REQUESTED">Requested</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="DISPATCHED">Dispatched</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ParcelTable
              parcels={myParcels}
              onCancel={handleCancel}
              onViewDetails={handleViewDetails}
          />

          <div className="flex items-center justify-end space-x-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</Button>
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages > 0 ? totalPages : 1}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</Button>
          </div>
        </div>

        {/* Right Column: Chart and Timeline */}
        <div className="space-y-6">
            <StatusPieChart data={chartData} isLoading={isLoading}/>
            {selectedParcel && (
                <StatusTimeline parcel={selectedParcel} />
            )}
        </div>
      </div>
    </div>
  );
};

export default SenderDashboard;