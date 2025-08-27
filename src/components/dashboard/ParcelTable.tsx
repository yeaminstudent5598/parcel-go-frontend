import React, { useState, useMemo } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { IParcel, ParcelStatus } from "@/types/parcel";

interface ParcelTableProps {
  parcels: IParcel[];
  title?: string;
  description?: string;
  onViewDetails?: (id: string) => void;
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
  onUpdateStatus?: (id: string, newStatus: ParcelStatus) => void;
  onBlock?: (id: string, isBlocked: boolean) => void;
}

// Status badge
const StatusBadge = ({ status }: { status: string }) => {
  const statusUpper = status.toUpperCase();
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";

  switch (statusUpper) {
    case "DELIVERED":
      variant = "default";
      break;
    case "CANCELLED":
    case "BLOCKED":
      variant = "destructive";
      break;
    case "REQUESTED":
      variant = "outline";
      break;
    default:
      variant = "secondary";
  }

  return <Badge variant={variant}>{statusUpper}</Badge>;
};

// Status list
const parcelStatuses: ParcelStatus[] = ["APPROVED", "DISPATCHED", "IN_TRANSIT", "DELIVERED", "RETURNED"];

export const ParcelTable: React.FC<ParcelTableProps> = ({
  parcels,
  title = "Parcels",
  description = "A list of relevant parcels.",
  onViewDetails,
  onCancel,
  onConfirm,
  onUpdateStatus,
  onBlock,
}) => {
  // 👉 Search, Filter, Pagination states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // 👉 Filtered & searched parcels
  const filteredParcels = useMemo(() => {
    return parcels
      .filter((p) => {
        if (statusFilter !== "ALL" && p.status.toUpperCase() !== statusFilter) return false;
        if (search && !p.trackingId.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => b.trackingId.localeCompare(a.trackingId));
  }, [parcels, search, statusFilter]);

  // 👉 Pagination
  const totalPages = Math.ceil(filteredParcels.length / pageSize);
  const paginatedParcels = filteredParcels.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>

        {/* Search + Filter Controls */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by Tracking ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              {parcelStatuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedParcels && paginatedParcels.length > 0 ? (
              paginatedParcels.map((parcel) => (
                <TableRow key={parcel._id}>
                  <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                  <TableCell>
                    {typeof parcel.sender === "object" ? parcel.sender.name : "N/A"}
                  </TableCell>
                  <TableCell>
                    {typeof parcel.receiver === "object" ? parcel.receiver.name : "N/A"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={parcel.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {onViewDetails && (
                          <DropdownMenuItem onClick={() => onViewDetails(parcel._id)}>View Details</DropdownMenuItem>
                        )}
                        {onCancel &&
                          (parcel.status.toUpperCase() === "REQUESTED" ||
                            parcel.status.toUpperCase() === "APPROVED") && (
                            <DropdownMenuItem className="text-red-600" onClick={() => onCancel(parcel._id)}>
                              Cancel
                            </DropdownMenuItem>
                          )}
                        {onConfirm &&
                          ["DISPATCHED", "IN_TRANSIT"].includes(parcel.status.toUpperCase()) && (
                            <DropdownMenuItem className="text-green-600" onClick={() => onConfirm(parcel._id)}>
                              Confirm Delivery
                            </DropdownMenuItem>
                          )}

                        {onUpdateStatus && (
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuLabel>Select New Status</DropdownMenuLabel>
                              {parcelStatuses.map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  disabled={parcel.status === status}
                                  onClick={() => onUpdateStatus(parcel._id, status)}
                                >
                                  {status}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        )}

                        {onBlock && (
                          <DropdownMenuItem
                            className={parcel.isBlocked ? "text-blue-600" : "text-red-600"}
                            onClick={() => onBlock(parcel._id, !parcel.isBlocked)}
                          >
                            {parcel.isBlocked ? "Unblock" : "Block"}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No parcels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)} variant="outline" size="sm">
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} variant="outline" size="sm">
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
