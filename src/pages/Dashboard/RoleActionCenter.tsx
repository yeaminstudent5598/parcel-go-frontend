/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
// ✅ সমাধান ১: Type-only import ব্যবহার করা হয়েছে
import type { RootState } from '@/app/store'; 
import { useGetAllParcelsQuery, useGetIncomingParcelsQuery } from '@/api/parcelApi';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RoleActionCenter = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  // ১. অ্যাডমিন এর জন্য পেন্ডিং রিকোয়েস্ট চেক
  // ✅ সমাধান ২: page এবং limit অ্যাড করা হয়েছে
  const { data: adminParcels } = useGetAllParcelsQuery(
    { status: 'REQUESTED', page: 1, limit: 100 }, 
    { skip: user?.role !== 'ADMIN' }
  );

  // ২. রিসিভার এর জন্য ইনকামিং পার্সেল চেক
  const { data: receiverParcels } = useGetIncomingParcelsQuery(
    undefined,
    { skip: user?.role !== 'RECEIVER' }
  );

  // ৩. সেন্ডার এর জন্য পেমেন্ট পেন্ডিং চেক
  // ✅ সমাধান ৩: role রিমুভ করে page/limit দেওয়া হয়েছে
  const { data: senderParcels } = useGetAllParcelsQuery(
    { page: 1, limit: 100 }, 
    { skip: user?.role !== 'SENDER' }
  );

  // --- অ্যাডমিন লজিক ---
  if (user?.role === 'ADMIN') {
    const requestedCount = adminParcels?.data?.length || 0;
    return requestedCount > 0 ? (
      <Card className="p-5 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/10 flex flex-col sm:flex-row items-center justify-between rounded-2xl gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">Admin Action Required</h3>
            <p className="text-sm text-slate-500">{requestedCount} parcels are waiting for your approval.</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/admin/parcels')} className="bg-amber-600 hover:bg-amber-700 text-xs font-bold rounded-xl h-10 px-6 w-full sm:w-auto">Manage Now</Button>
      </Card>
    ) : null;
  }

  // --- সেন্ডার লজিক ---
  if (user?.role === 'SENDER') {
    const unpaidCount = senderParcels?.data?.filter((p: any) => p.paymentStatus === 'UNPAID' && p.status !== 'CANCELLED').length || 0;
    return unpaidCount > 0 ? (
      <Card className="p-5 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/10 flex flex-col sm:flex-row items-center justify-between rounded-2xl gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">Action Needed</h3>
            <p className="text-sm text-slate-500">You have {unpaidCount} shipments with pending payments.</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/sender/my-parcels')} className="bg-blue-600 hover:bg-blue-700 text-xs font-bold rounded-xl h-10 px-6 w-full sm:w-auto">Complete Payment</Button>
      </Card>
    ) : null;
  }

  // --- রিসিভার লজিক ---
  if (user?.role === 'RECEIVER') {
    const incomingCount = receiverParcels?.data?.filter((p: any) => p.status === 'IN_TRANSIT').length || 0;
    return incomingCount > 0 ? (
      <Card className="p-5 border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/10 flex flex-col sm:flex-row items-center justify-between rounded-2xl gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">Incoming Delivery</h3>
            <p className="text-sm text-slate-500">{incomingCount} parcel(s) arriving. Please keep your OTP ready.</p>
          </div>
        </div>
        <Button onClick={() => navigate('/dashboard/receiver/parcels')} variant="outline" className="text-xs font-bold rounded-xl h-10 px-6 w-full sm:w-auto">Track Live</Button>
      </Card>
    ) : null;
  }

  return null;
};

export default RoleActionCenter;