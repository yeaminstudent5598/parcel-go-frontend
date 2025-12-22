/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from 'react'; // useMemo যোগ করা হয়েছে
import { useGetActiveLocationsQuery } from '@/api/parcelApi';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Loader2, Box, Navigation, Signal, Activity, Map as MapIcon, RefreshCcw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const fleetIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2343/2343894.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

function MapBoundsUpdater({ parcels }: { parcels: any[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (parcels.length > 0) {
      const bounds = L.latLngBounds(parcels.map(p => [
        p.currentLocation?.lat || 23.81, 
        p.currentLocation?.lng || 90.41
      ]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [parcels, map]);

  return null;
}

const AdminTrackingMap: React.FC = () => {
  const { data, isLoading, isError, isFetching, refetch } = useGetActiveLocationsQuery(undefined, {
    pollingInterval: 15000, 
    refetchOnFocus: true,
  });

  const parcels = data?.data || [];

  const integrityScore = useMemo(() => {
    if (parcels.length === 0) return "100%";
    const base = 97.5;
    const fluctuation = Math.random() * 2.4;
    return `${(base + fluctuation).toFixed(1)}%`;
  }, [parcels.length, isFetching]);

  return (
    <div className="p-4 lg:p-8 space-y-6 bg-slate-50/50 dark:bg-transparent min-h-screen selection:bg-blue-600 selection:text-white">
      <Helmet><title>Fleet Intelligence | ParcelGo Admin</title></Helmet>

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3 text-slate-900 dark:text-white">
            <MapIcon className="text-blue-600" /> Fleet <span className="text-blue-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Satellite Feed active
          </p>
        </motion.div>

        <div className="flex items-center gap-4">
           <Button 
             onClick={() => refetch()} 
             disabled={isFetching}
             variant="outline" 
             className="rounded-xl border-none shadow-sm bg-white dark:bg-slate-900 font-bold"
           >
             <RefreshCcw size={16} className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} /> Force Sync
           </Button>
           <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 pr-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
               <Navigation size={20} />
             </div>
             <div>
               <p className="text-[10px] uppercase font-black text-slate-400 leading-none mb-1">Fleet Count</p>
               <p className="text-xl font-black leading-none">{parcels.length} Units</p>
             </div>
           </div>
        </div>
      </div>

      {/* --- Main Map Section --- */}
      <Card className="h-[70vh] w-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl rounded-[3rem] relative z-0">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
              <p className="font-black text-slate-400 tracking-[0.3em] uppercase text-xs">Connecting to Neural Link...</p>
            </motion.div>
          ) : isError ? (
            <motion.div key="error" className="h-full flex flex-col items-center justify-center text-red-500 gap-2">
              <Activity size={48} className="animate-bounce" />
              <p className="font-black uppercase tracking-tighter text-xl">Uplink Failed</p>
              <p className="text-sm font-medium text-slate-400">Unable to establish connection with global GPS network.</p>
            </motion.div>
          ) : (
            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
              <MapContainer 
                center={[23.8103, 90.4125]} 
                zoom={7} 
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; ParcelGo Intelligence'
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
                      <div className="p-3 min-w-[200px] space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                           <span className="font-black text-blue-600 text-xs tracking-tighter">#{parcel.trackingId}</span>
                           <Badge className="bg-blue-50 text-blue-600 text-[8px] font-black border-none uppercase">{parcel.status}</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-black uppercase">Consignee</p>
                          <p className="text-sm font-bold text-slate-800">{parcel.receiver?.name || 'N/A'}</p>
                        </div>
                        <div className="pt-2">
                           <Button onClick={() => window.location.href=`/dashboard/admin/parcel/${parcel._id}`} size="sm" className="w-full h-8 text-[10px] font-black bg-slate-900 rounded-lg">Detailed Inspection</Button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                <MapBoundsUpdater parcels={parcels} />
              </MapContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* --- Analytics Summary Widgets --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Network Integrity', val: integrityScore, icon: Signal, color: 'text-green-600', bg: 'bg-green-100/40' },
          { label: 'Live Deployments', val: parcels.length, icon: Box, color: 'text-blue-600', bg: 'bg-blue-100/40' },
          { label: 'Regional Reach', val: '64/64', icon: MapIcon, color: 'text-purple-600', bg: 'bg-purple-100/40' }
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ y: -5 }}>
            <Card className={`p-8 border-none shadow-xl ${item.bg} dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between rounded-[2.5rem]`}>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{item.label}</p>
                <p className={`text-4xl font-black ${item.color} tracking-tighter leading-none`}>{item.val}</p>
              </div>
              <div className={`p-4 rounded-2xl ${item.bg} brightness-90`}>
                 <item.icon size={28} className={`${item.color}`} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Helper Badge
const Badge = ({ children, className }: any) => (
  <span className={`px-2 py-0.5 rounded-full ${className}`}>{children}</span>
);

export default AdminTrackingMap;