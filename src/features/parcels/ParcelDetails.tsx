// src/features/parcels/ParcelDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ParcelDetailsProps {
  parcelId?: string;
}


const ParcelDetails: React.FC<ParcelDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const parcels = useSelector((state: RootState) => state.parcels.parcels);
  const [parcel, setParcel] = useState<typeof parcels[0] | null>(null);

  useEffect(() => {
    const foundParcel = parcels.find((p) => p._id === id);
    if (foundParcel) {
      setParcel(foundParcel);
    } else {
      toast.error("Parcel not found");
    }
  }, [id, parcels]);

  if (!parcel) {
    return <div className="text-center mt-10 text-gray-500">Parcel not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parcel Details</CardTitle>
          <CardDescription>Tracking Number: {parcel.trackingId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <strong>Sender:</strong>{" "}
            {typeof parcel.sender === "object" ? parcel.sender.name : parcel.sender}
          </div>
          <div>
            <strong>Receiver:</strong>{" "}
            {typeof parcel.receiver === "object" ? parcel.receiver.name : parcel.receiver}
          </div>
          <div>
            <strong>Origin:</strong> {parcel.pickupAddress || "N/A"}
          </div>
          <div>
            <strong>Destination:</strong> {parcel.deliveryAddress}
          </div>
          <div>
            <strong>Status:</strong> {parcel.status}
          </div>
        </CardContent>

      </Card>
      <Button onClick={() => toast.success("Feature coming soon!")}>Update Status</Button>
    </div>
  );
};

export default ParcelDetails;
