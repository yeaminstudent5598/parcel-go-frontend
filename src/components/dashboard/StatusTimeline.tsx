// src/components/dashboard/StatusTimeline.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IParcel } from "@/types/parcel";

// ✅ শুধু একটি সঠিক interface রাখুন
interface StatusTimelineProps {
  parcel: IParcel;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ parcel }) => {
  // ✅ parcel prop থেকে timeline ডেটা তৈরি করুন
  // যদি statusLogs থাকে, তবে সেটি ব্যবহার করুন, নাহলে বর্তমান স্ট্যাটাস দেখান
  const timeline = parcel.statusLogs && parcel.statusLogs.length > 0
    ? parcel.statusLogs
    : [{ status: parcel.status, updatedAt: parcel.updatedAt }];

  return (
    <Card className="w-full border rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>Parcel Status Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="relative border-l border-gray-200">
          {timeline.map((entry, index) => (
            <li key={index} className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white">
                <span className="h-3 w-3 rounded-full bg-white"></span>
              </span>
              <div className="flex flex-col">
                <p className="mb-1 text-sm font-semibold text-gray-900">{entry.status}</p>
                <time className="text-xs text-gray-500">{new Date(entry.updatedAt).toLocaleString()}</time>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default StatusTimeline;