// src/features/parcels/ParcelList.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import type { IParcel } from "@/types/parcel"; // <-- Import the type

const ParcelList: React.FC = () => {
  const parcels = useSelector((state: RootState) => state.parcels.parcels);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-4">
      {parcels.map((parcel: IParcel) => (  // <-- Explicitly type parcel
        <Card key={parcel.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Tracking #: {parcel.trackingNumber}</CardTitle>
            <Button size="sm" onClick={() => navigate(`/parcel/${parcel.id}`)}>
              View Details
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div><strong>Sender:</strong> {parcel.name}</div>
            <div><strong>Receiver:</strong> {parcel.name}</div>
            <div><strong>Origin:</strong> {parcel.origin}</div>
            <div><strong>Destination:</strong> {parcel.destination}</div>
            <div><strong>Status:</strong> {parcel.status}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ParcelList;
