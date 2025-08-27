import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { useGetIncomingParcelsQuery, useConfirmDeliveryMutation, useGetReceiverStatsQuery } from "@/api/parcelApi";
import OverviewCards from "@/components/dashboard/OverviewCards";
import { ParcelTable } from "@/components/dashboard/ParcelTable";
import StatusTimeline from "@/components/dashboard/StatusTimeline";
import type { IParcel } from "@/types/parcel";

const ReceiverDashboard: React.FC = () => {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  // 1. ইনকামিং পার্সেল এবং পরিসংখ্যান ফেচ করুন
  const { data: parcelsResponse, isLoading: parcelsLoading, isError } = useGetIncomingParcelsQuery();
  const { data: statsResponse, isLoading: statsLoading } = useGetReceiverStatsQuery();
  
  // 2. ডেলিভারি কনফার্ম করার জন্য মিউটেশন হুক
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const handleConfirmDelivery = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you have received this parcel?");
    if (isConfirmed) {
      try {
        await confirmDelivery(id).unwrap();
        toast.success("Delivery confirmed successfully!");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to confirm delivery.");
      }
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedParcelId(id);
  };

  const isLoading = parcelsLoading || statsLoading;

  if (isError) {
    return <div className="p-6 text-center text-red-500">Failed to load data.</div>;
  }

  const allParcels = parcelsResponse?.data || [];
  const incomingParcels = allParcels.filter((p: IParcel) => p.status !== 'DELIVERED' && p.status !== 'CANCELLED');
  const deliveryHistory = allParcels.filter((p: IParcel) => p.status === 'DELIVERED');
  
  const selectedParcel = allParcels.find((p: IParcel) => p._id === selectedParcelId);

  // OverviewCards-এর জন্য ডেটা প্রস্তুত করুন
  const cardStats = useMemo(() => {
    if (!statsResponse?.data) return [];
    const { totalReceived, inTransit } = statsResponse.data;
    return [
      { title: "Parcels In Transit", value: inTransit || 0 },
      { title: "Total Parcels Received", value: totalReceived || 0 },
    ];
  }, [statsResponse]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Receiver Dashboard</h1>

      <OverviewCards stats={cardStats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* ইনকামিং পার্সেলের টেবিল */}
          <ParcelTable
              title="Incoming Parcels"
              description="These parcels are on their way to you."
              parcels={incomingParcels}
              onConfirm={handleConfirmDelivery}
              onViewDetails={handleViewDetails}
          />

          {/* ডেলিভারি হিস্টোরির টেবিল */}
          <ParcelTable
              title="Delivery History"
              description="A list of parcels you have successfully received."
              parcels={deliveryHistory}
              onViewDetails={handleViewDetails}
          />
        </div>
        <div className="space-y-6">
            {/* নির্বাচিত পার্সেলের স্ট্যাটাস টাইমলাইন */}
            {selectedParcel && (
                <StatusTimeline parcel={selectedParcel} />
            )}
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;