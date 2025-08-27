// src/features/parcels/ParcelList.tsx
import React from "react"; 
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import type { IParcel } from "@/types/parcel"; // <-- Import the type

const ParcelList: React.FC = () => {
  const parcels = useSelector((state: RootState) => state.parcels.parcels);
  // const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-4">
      {parcels.map((parcel: IParcel) => (  // <-- Explicitly type parcel
        <Card key={parcel._id} className="hover:shadow-lg transition-shadow">
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
      ))}
    </div>
  );
};

export default ParcelList;
