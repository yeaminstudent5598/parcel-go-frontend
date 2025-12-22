/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MoreHorizontal, Plus, Eye, XCircle, CheckCircle, RefreshCcw, ShieldAlert } from "lucide-react";
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
  showCreateButton?: boolean; // ✅ নতুন প্রপ: এটি ঠিক করবে বাটন দেখাবে কি না
  onViewDetails?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onUpdateStatus?: (id: string, newStatus: ParcelStatus) => void;
  onBlock?: (id: string) => void; // ✅ AdminDashboard এর সাথে সামঞ্জস্যপূর্ণ
}

const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toUpperCase();
  if (s === "DELIVERED") return <Badge className="bg-green-500 font-bold">DELIVERED</Badge>;
  if (s === "CANCELLED" || s === "BLOCKED") return <Badge variant="destructive" className="font-bold">{s}</Badge>;
  if (s === "IN_TRANSIT" || s === "DISPATCHED") return <Badge className="bg-blue-500 animate-pulse font-bold">IN TRANSIT</Badge>;
  if (s === "APPROVED") return <Badge className="bg-purple-500 font-bold">APPROVED</Badge>;
  return <Badge variant="secondary" className="font-bold">{s}</Badge>;
};

export const ParcelTable: React.FC<ParcelTableProps> = ({
  parcels,
  isLoading = false,
  title = "Parcel Management",
  description = "Manage and track shipments effectively.",
  showCreateButton = false, // ✅ ডিফল্টভাবে এটি false থাকবে
  onViewDetails,
  onCancel,
  onConfirm,
  onUpdateStatus,
  onBlock,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="border-none shadow-2xl bg-white dark:bg-slate-950 rounded-[2rem] overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 bg-slate-50/30 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
        <div>
          <CardTitle className="text-2xl font-black tracking-tighter uppercase">{title}</CardTitle>
          <CardDescription className="font-medium text-slate-400">{description}</CardDescription>
        </div>
        
        {/* ✅ সমাধান: শুধুমাত্র যদি showCreateButton=true পাঠানো হয়, তবেই বাটনটি দেখাবে */}
        {showCreateButton && (
          <Button 
            size="sm" 
            onClick={() => navigate('/dashboard/sender/create')} 
            className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none rounded-xl font-bold px-5 h-10 transition-all active:scale-95"
          >
             <Plus size={18} className="mr-1.5 stroke-[3]"/> New Shipment
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                <TableHead className="w-[150px] pl-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Tracking ID</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Shipment Details</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Cost</TableHead>
                <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-slate-50 dark:border-slate-800">
                    <TableCell className="pl-8"><Skeleton className="h-4 w-24 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full rounded-lg" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16 rounded-full" /></TableCell>
                    <TableCell className="pr-8"><div className="flex justify-end"><Skeleton className="h-8 w-8 rounded-full" /></div></TableCell>
                  </TableRow>
                ))
              ) : parcels.length > 0 ? (
                parcels.map((parcel) => (
                  <TableRow key={parcel._id} className="border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <TableCell className="pl-8 font-mono font-black text-blue-600 text-sm">
                      {parcel.trackingId}
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none mb-1.5">
                        {typeof parcel.receiver === 'object' ? parcel.receiver.name : 'Authorized Consignee'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium leading-tight max-w-[200px] truncate italic">
                        {parcel.deliveryAddress}
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={parcel.status} /></TableCell>
                    <TableCell className="font-black text-slate-700 dark:text-slate-300">{parcel.price} <span className="text-[10px] opacity-50">BDT</span></TableCell>
                    <TableCell className="text-right pr-8">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <MoreHorizontal size={20} className="text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-none shadow-2xl bg-white dark:bg-slate-900">
                          <DropdownMenuLabel className="text-[10px] uppercase font-black tracking-widest text-slate-400 p-3">Intelligence Options</DropdownMenuLabel>
                          
                          <DropdownMenuItem onClick={() => onViewDetails?.(parcel._id)} className="rounded-xl py-2.5 font-bold cursor-pointer">
                            <Eye size={16} className="mr-3 text-blue-500" /> View Detailed Logs
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-800" />

                          {/* সেন্ডার অপশন: শুধুমাত্র REQUESTED থাকলে */}
                          {onCancel && (parcel.status === "REQUESTED") && (
                            <DropdownMenuItem className="text-red-600 rounded-xl py-2.5 font-black cursor-pointer focus:text-red-600 focus:bg-red-50" onClick={() => onCancel(parcel._id)}>
                              <XCircle size={16} className="mr-3" /> Terminate Shipment
                            </DropdownMenuItem>
                          )}

                          {/* রিসিভার অপশন */}
                          {onConfirm && ["IN_TRANSIT", "DISPATCHED"].includes(parcel.status) && (
                            <DropdownMenuItem className="text-green-600 rounded-xl py-2.5 font-black cursor-pointer focus:text-green-600 focus:bg-green-50" onClick={() => onConfirm(parcel._id)}>
                              <CheckCircle size={16} className="mr-3" /> Acknowledge Receipt
                            </DropdownMenuItem>
                          )}

                          {/* অ্যাডমিন অপশন */}
                          {onUpdateStatus && (
                            <>
                              <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-800" />
                              <DropdownMenuLabel className="text-[10px] uppercase font-black tracking-widest text-amber-500 p-3">Command Override</DropdownMenuLabel>
                              
                              {parcel.status === "REQUESTED" && (
                                <DropdownMenuItem onClick={() => onUpdateStatus(parcel._id, "APPROVED")} className="rounded-xl py-2.5 font-bold cursor-pointer">
                                  <RefreshCcw size={16} className="mr-3 text-purple-600" /> Dispatch Authorization
                                </DropdownMenuItem>
                              )}
                              
                              {["APPROVED", "DISPATCHED"].includes(parcel.status) && (
                                <DropdownMenuItem onClick={() => onUpdateStatus(parcel._id, "IN_TRANSIT")} className="rounded-xl py-2.5 font-bold cursor-pointer">
                                  <RefreshCcw size={16} className="mr-3 text-blue-600" /> Set to In-Transit
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuItem className="text-orange-600 rounded-xl py-2.5 font-black cursor-pointer focus:text-orange-600 focus:bg-orange-50" onClick={() => onBlock?.(parcel._id)}>
                                <ShieldAlert size={16} className="mr-3" /> Quarantine Asset
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-slate-400 font-bold italic">
                    <div className="flex flex-col items-center gap-2">
                       <MoreHorizontal className="opacity-20" size={40} />
                       No shipment data synchronized yet.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};