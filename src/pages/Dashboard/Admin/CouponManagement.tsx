/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useCreateCouponMutation, useGetAllCouponsQuery } from '@/api/parcelApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Ticket, Plus, Loader2, Trash2, Gift } from 'lucide-react';

const CouponManagement = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  const { data: couponsResponse, isLoading: loadingCoupons } = useGetAllCouponsQuery();
  const [createCoupon, { isLoading: creating }] = useCreateCouponMutation();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discount) return toast.error("Please fill all fields");

    try {
      await createCoupon({ 
        code: code.toUpperCase(), 
        discountAmount: Number(discount) 
      }).unwrap();
      
      toast.success("New Coupon Added Successfully!");
      setCode('');
      setDiscount('');
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to create coupon");
    }
  };

  return (
    <div className="space-y-8 p-2 lg:p-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-600 rounded-lg text-white">
          <Gift size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupons</h1>
          <p className="text-muted-foreground">Manage discount codes for your delivery platform.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* কুপন তৈরির ফর্ম */}
        <Card className="lg:col-span-1 shadow-lg border-t-4 border-blue-600 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus size={20}/> Add New Code</CardTitle>
            <CardDescription>Enter code name and fixed discount amount.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <Input 
                  id="code" 
                  placeholder="e.g. SAVE100" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (BDT)</Label>
                <Input 
                  id="discount" 
                  type="number" 
                  placeholder="50" 
                  value={discount} 
                  onChange={(e) => setDiscount(e.target.value)} 
                />
              </div>
              <Button className="w-full" disabled={creating}>
                {creating ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                Save Coupon
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* কুপন লিস্ট টেবিল */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Ticket size={20}/> Active Promo Codes</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingCoupons ? (
              <div className="flex flex-col items-center py-10 gap-2">
                <Loader2 className="animate-spin text-blue-600" />
                <p className="text-sm text-muted-foreground">Loading coupons...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800">
                    <TableHead>Code Name</TableHead>
                    <TableHead>Discount Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {couponsResponse?.data?.map((coupon: any) => (
                    <TableRow key={coupon._id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <TableCell className="font-bold text-blue-600 uppercase tracking-wider">
                        {coupon.code}
                      </TableCell>
                      <TableCell className="font-medium">{coupon.discountAmount} BDT</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!couponsResponse?.data || couponsResponse.data.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-slate-400 italic">
                        No coupons found. Start by adding one!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CouponManagement;