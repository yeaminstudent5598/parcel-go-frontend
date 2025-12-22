/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useGetActiveLocationsQuery } from '@/api/parcelApi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Loader2, Box, Navigation, Signal, Activity, Map as MapIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// --- Custom Professional Icon for Fleet ---
const fleetIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2343/2343894.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const AdminTrackingMap: React.FC = () => {
  // ✅ Hook-এর ভেতরে pollingInterval সেট করা হয়েছে এরর এড়াতে
  const { data, isLoading, isError } = useGetActiveLocationsQuery(undefined, {
    pollingInterval: 30000, // ৩০ সেকেন্ড পরপর অটো-রিফ্রেশ
    refetchOnFocus: true,
  });

  const parcels = data?.data || [];

  return (
    <div className="p-4 lg:p-8 space-y-6 bg-slate-50/50 dark:bg-transparent min-h-screen">
      <Helmet>
        <title>Fleet Monitor | Admin | ParcelGo</title>
      </Helmet>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <MapIcon className="text-blue-600" /> Fleet Monitoring
          </h1>
          <p className="text-slate-500 font-medium">Global positioning of all in-transit shipments.</p>
        </motion.div>

        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pr-6 rounded-full shadow-sm border">
          <div className="bg-blue-600 p-2 rounded-full text-white animate-pulse">
            <Navigation size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Live Units</p>
            <p className="text-lg font-black leading-none">{parcels.length} Active</p>
          </div>
        </div>
      </div>

      {/* --- Main Map Section --- */}
      <Card className="h-[65vh] w-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl rounded-[2.5rem] relative z-0">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="font-bold text-slate-500 tracking-widest uppercase text-xs">Synchronizing with Satellites...</p>
          </div>
        ) : isError ? (
          <div className="h-full flex flex-col items-center justify-center text-red-500 gap-2">
            <Activity size={48} />
            <p className="font-bold">Failed to connect to tracking server.</p>
          </div>
        ) : (
          <MapContainer 
            center={[23.8103, 90.4125]} // Dhaka Center
            zoom={7} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; ParcelGo Fleet Intelligence'
            />

            {parcels.map((parcel: any) => (
              <Marker 
                key={parcel._id} 
                position={[
                  parcel.currentLocation?.lat || 23.81, 
                  parcel.currentLocation?.lng || 90.41
                ]} 
                icon={fleetIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[180px] space-y-2">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Box size={16} className="text-blue-600" />
                      <span className="font-black text-sm uppercase">{parcel.trackingId}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Current Status</p>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                        {parcel.status}
                      </span>
                    </div>
                    <div className="pt-1">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Receiver</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {parcel.receiver?.name || 'Loading Name...'}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </Card>

      {/* --- Analytics Summary Widgets --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Network Integrity', val: 'Optimal', icon: Signal, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Active Shipments', val: parcels.length, icon: Box, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Coverage Area', val: '64 Districts', icon: MapIcon, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className={`p-6 border-none shadow-lg ${item.bg} dark:bg-slate-900 flex items-center justify-between`}>
              <div>
                <p className="text-xs font-black uppercase text-slate-400 mb-1">{item.label}</p>
                <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
              </div>
              <item.icon size={40} className={`${item.color} opacity-20`} />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminTrackingMap;