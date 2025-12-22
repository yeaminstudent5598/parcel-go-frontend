/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MoreHorizontal, PackageOpen, Plus, Eye, XCircle, CheckCircle, RefreshCcw, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { IParcel, ParcelStatus } from "@/types/parcel";

interface ParcelTableProps {
  parcels: IParcel[];
  isLoading?: boolean;
  title?: string;
  description?: string;
  onViewDetails?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onUpdateStatus?: (id: string, newStatus: ParcelStatus) => void;
  onBlock?: (id: string) => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toUpperCase();
  if (s === "DELIVERED") return <Badge className="bg-green-500">DELIVERED</Badge>;
  if (s === "CANCELLED" || s === "BLOCKED") return <Badge variant="destructive">{s}</Badge>;
  if (s === "IN_TRANSIT" || s === "DISPATCHED") return <Badge className="bg-blue-500 animate-pulse">IN TRANSIT</Badge>;
  if (s === "APPROVED") return <Badge className="bg-purple-500">APPROVED</Badge>;
  return <Badge variant="secondary">{s}</Badge>;
};

export const ParcelTable: React.FC<ParcelTableProps> = ({
  parcels,
  isLoading = false,
  title = "Parcel Management",
  onViewDetails,
  onCancel,
  onConfirm,
  onUpdateStatus,
  onBlock,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="border-none shadow-xl bg-white dark:bg-slate-950 rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-black">{title}</CardTitle>
          <CardDescription>Manage and track shipments effectively.</CardDescription>
        </div>
        <Button size="sm" onClick={() => navigate('/dashboard/sender/create')} className="bg-blue-600">
           <Plus size={16} className="mr-1"/> New
        </Button>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-900">
              <TableHead className="font-bold">Tracking ID</TableHead>
              <TableHead className="font-bold">Details</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}><Skeleton className="h-12 w-full" /></TableCell>
                </TableRow>
              ))
            ) : parcels.length > 0 ? (
              parcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  <TableCell className="font-mono font-bold text-blue-600">{parcel.trackingId}</TableCell>
                  <TableCell>
                    <div className="text-sm font-semibold">{typeof parcel.receiver === 'object' ? parcel.receiver.name : 'User'}</div>
                    <div className="text-[10px] text-slate-500">{parcel.deliveryAddress}</div>
                  </TableCell>
                  <TableCell><StatusBadge status={parcel.status} /></TableCell>
                  <TableCell className="font-bold">{parcel.price} BDT</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal size={16}/></Button>
                      </DropdownMenuTrigger>
                      
                      <DropdownMenuContent align="end" className="w-56 p-2">
                        <DropdownMenuLabel className="text-[10px] uppercase text-slate-400">Shipment Actions</DropdownMenuLabel>
                        
                        {/* ১. সাধারণ অপশন: সবার জন্য */}
                        <DropdownMenuItem onClick={() => onViewDetails?.(parcel._id)}>
                          <Eye size={14} className="mr-2" /> View Details
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* ২. সেন্ডার অপশন: শুধুমাত্র REQUESTED থাকলে Cancel করা যাবে */}
                        {onCancel && (parcel.status === "REQUESTED") && (
                          <DropdownMenuItem className="text-red-600 font-bold" onClick={() => onCancel(parcel._id)}>
                            <XCircle size={14} className="mr-2" /> Cancel Shipment
                          </DropdownMenuItem>
                        )}

                        {/* ৩. রিসিভার অপশন: ট্রানজিটে থাকলে Confirm করা যাবে */}
                        {onConfirm && ["IN_TRANSIT", "DISPATCHED"].includes(parcel.status) && (
                          <DropdownMenuItem className="text-green-600 font-bold" onClick={() => onConfirm(parcel._id)}>
                            <CheckCircle size={14} className="mr-2" /> Confirm Received
                          </DropdownMenuItem>
                        )}

                        {/* ৪. অ্যাডমিন অপশন: স্ট্যাটাস আপডেট */}
                        {onUpdateStatus && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-[10px] uppercase text-slate-400">Admin Controls</DropdownMenuLabel>
                            
                            {parcel.status === "REQUESTED" && (
                              <DropdownMenuItem onClick={() => onUpdateStatus(parcel._id, "APPROVED")}>
                                <RefreshCcw size={14} className="mr-2 text-purple-600" /> Approve Parcel
                              </DropdownMenuItem>
                            )}
                            
                            {["APPROVED", "DISPATCHED"].includes(parcel.status) && (
                              <DropdownMenuItem onClick={() => onUpdateStatus(parcel._id, "IN_TRANSIT")}>
                                <RefreshCcw size={14} className="mr-2 text-blue-600" /> Mark as In-Transit
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuItem className="text-orange-600" onClick={() => onBlock?.(parcel._id)}>
                              <ShieldAlert size={14} className="mr-2" /> Block Shipment
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={5} className="text-center py-10">No data available.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};