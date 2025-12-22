/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { 
  useGetUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '@/api/userApi'; 
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserCog, MoreVertical, ShieldAlert, ShieldCheck, 
  Trash2, Search, UserCheck, UserMinus 
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { TableSkeleton } from '@/components/shared/SkeletonLoader';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // API Queries - এখানে usersRes ডিক্লেয়ার করা হয়েছে
  const { data: usersRes, isLoading, isFetching } = useGetUsersQuery({
    searchTerm,
    page,
    limit: 10
  });

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleStatusToggle = async (user: any) => {
    try {
      const newStatus = !user.isBlocked;
      await updateUser({ id: user._id, isBlocked: newStatus }).unwrap();
      toast.success(`User ${newStatus ? 'Blocked' : 'Unblocked'} successfully`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted permanently");
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-slate-50/50 dark:bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
            <UserCog className="text-blue-600" /> User <span className="text-blue-600">Directory</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Control access levels and manage platform members.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 h-12 rounded-xl border-none shadow-sm bg-white dark:bg-slate-900 font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm rounded-2xl bg-white dark:bg-slate-900 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
               <UserCheck size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Members</p>
               <h3 className="text-2xl font-black">{usersRes?.meta?.total || 0}</h3>
            </div>
         </Card>
      </div>

      {/* User Table Card */}
      <Card className="border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900 overflow-hidden">
        <CardContent className="p-0">
          {isLoading || isFetching ? (
            <div className="p-10"><TableSkeleton /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow className="border-none">
                    <TableHead className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">User Details</TableHead>
                    <TableHead className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Role</TableHead>
                    <TableHead className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Status</TableHead>
                    <TableHead className="px-6 py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersRes?.data?.map((user: any) => (
                    <TableRow key={user._id} className="border-slate-50 dark:border-slate-800 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600">
                             {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white leading-none mb-1">{user.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <Badge variant="outline" className="rounded-lg font-black text-[10px] uppercase border-blue-200 text-blue-600 px-2 py-0.5">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        {user.isBlocked ? (
                          <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs">
                            <ShieldAlert size={14} /> Blocked
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-green-500 font-bold text-xs">
                            <ShieldCheck size={14} /> Active
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-5 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl border-none shadow-2xl p-2 min-w-[180px]">
                            <DropdownMenuItem 
                              onClick={() => handleStatusToggle(user)}
                              className="rounded-xl flex items-center gap-2 font-bold text-sm py-3 cursor-pointer"
                            >
                              {user.isBlocked ? (
                                <><UserCheck className="text-green-500" size={16} /> Unblock Account</>
                              ) : (
                                <><UserMinus className="text-amber-500" size={16} /> Block Account</>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(user._id)}
                              className="rounded-xl flex items-center gap-2 font-bold text-sm py-3 text-red-500 focus:text-red-500 cursor-pointer"
                            >
                              <Trash2 size={16} /> Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        
        {/* Pagination Footer - এখানে সব userRes পরিবর্তন করে usersRes করা হয়েছে */}
        {!isLoading && usersRes?.meta && (
           <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Showing Page {usersRes?.meta?.page} of {Math.ceil((usersRes?.meta?.total || 0) / (usersRes?.meta?.limit || 1))}
              </p>
              <div className="flex gap-2">
                 <Button 
                   variant="outline" size="sm" className="rounded-lg font-bold"
                   disabled={page === 1} onClick={() => setPage(p => p - 1)}
                 >Previous</Button>
                 <Button 
                   variant="outline" size="sm" className="rounded-lg font-bold"
                   disabled={page * (usersRes?.meta?.limit || 1) >= (usersRes?.meta?.total || 0)} 
                   onClick={() => setPage(p => p + 1)}
                 >Next</Button>
              </div>
           </div>
        )}
      </Card>
    </div>
  );
};

export default ManageUsers;