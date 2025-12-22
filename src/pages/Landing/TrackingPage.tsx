/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useTrackParcelByIdQuery } from '@/api/parcelApi';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2, Clock, Activity, ShieldCheck, AlertCircle } from 'lucide-react'; // AlertCircle added
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

// --- সকেট কানেকশন সেটআপ ---
const socket = io("https://assignment5-eight-nu.vercel.app");

const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/411/411712.png', 
  iconSize: [45, 45],
  iconAnchor: [22, 45],
});

function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

const TrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [livePos, setLivePos] = useState<{lat: number; lng: number} | null>(null);

  // ✅ 'error' ব্যবহার করা হয়েছে এরর মেসেজ দেখানোর জন্য
  const { data, isFetching, error } = useTrackParcelByIdQuery(searchQuery, {
    skip: !searchQuery,
  });

  const parcel = data?.data;

  useEffect(() => {
    if (parcel?._id) {
      socket.emit('join-parcel', parcel._id);
      socket.on('location-update', (newCoords: {lat: number; lng: number}) => {
        setLivePos(newCoords);
      });
    }
    return () => {
      socket.off('location-update');
    };
  }, [parcel?._id]);

  const displayPos = livePos || (parcel?.currentLocation ? 
    { lat: parcel.currentLocation.lat, lng: parcel.currentLocation.lng } : 
    { lat: 23.8103, lng: 90.4125 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return toast.error("Enter Tracking ID");
    setSearchQuery(trackingId);
    setLivePos(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <Helmet><title>Live Tracking | ParcelGo</title></Helmet>

      {/* Header */}
      <section className="bg-slate-900 py-20 text-white shadow-2xl">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 initial={{y: -20}} animate={{y: 0}} className="text-5xl font-black mb-4 tracking-tighter">
              Precision <span className="text-blue-500">Tracking</span>
          </motion.h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 mt-10">
            <Input 
              placeholder="Enter Tracking ID (TRK-XXXX)" 
              className="h-16 bg-white text-slate-900 text-lg border-none rounded-2xl px-6"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <Button disabled={isFetching} className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-lg font-black rounded-2xl shadow-xl active:scale-95 transition-transform">
              {isFetching ? <Loader2 className="animate-spin" /> : "Track Now"}
            </Button>
          </form>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 -mt-12 grid lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <Card className="lg:col-span-2 h-[650px] overflow-hidden shadow-2xl rounded-[3rem] border-8 border-white dark:border-slate-800 z-10">
          <MapContainer center={[displayPos.lat, displayPos.lng]} zoom={14} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[displayPos.lat, displayPos.lng]} icon={truckIcon}>
              <Popup>
                <div className="p-2 text-center font-bold text-blue-600">
                  <p>PARCEL LOCATION</p>
                  <p className="text-[10px] text-slate-400 font-normal">Active WebSocket Node</p>
                </div>
              </Popup>
            </Marker>
            <MapRecenter lat={displayPos.lat} lng={displayPos.lng} />
          </MapContainer>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {/* ১. এরর স্টেট হ্যান্ডলিং */}
            {error ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="p-10 text-center border-none shadow-xl rounded-[2.5rem] bg-white dark:bg-slate-900">
                     <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                     <h3 className="text-xl font-black mb-2">Invalid ID</h3>
                     <p className="text-slate-500 text-sm">We couldn't find any parcel matching this ID. Please check and try again.</p>
                  </Card>
               </motion.div>
            ) : parcel ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <Card className="p-8 rounded-[2.5rem] shadow-xl border-none">
                  <div className="flex justify-between items-center mb-6">
                     <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${livePos ? "bg-green-100 text-green-600 animate-pulse" : "bg-slate-100 text-slate-500"}`}>
                        {livePos ? "● WebSocket Live" : "Stable Connection"}
                     </span>
                     <ShieldCheck className="text-blue-500" size={20} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight uppercase tracking-tighter">{parcel.status}</h2>
                  <p className="text-slate-400 font-mono text-xs">{parcel.trackingId}</p>
                  
                  <div className="mt-8 pt-8 border-t space-y-4">
                    <div className="flex gap-4 items-start">
                       <MapPin className="text-red-500 shrink-0" size={20} />
                       <p className="text-sm font-bold text-slate-600">{parcel.deliveryAddress}</p>
                    </div>
                  </div>
                </Card>

                {/* Status Logs */}
                <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-slate-900">
                   <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                      <Clock size={18} className="text-blue-500" /> Movement Logs
                   </h3>
                   <div className="space-y-8 border-l-2 ml-3 pl-6 border-slate-100 dark:border-slate-800">
                     {parcel.statusLogs?.slice().reverse().map((log: any, i: number) => (
                       <div key={i} className="relative">
                         <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 ${i === 0 ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" : "bg-slate-200"}`} />
                         <p className={`text-sm font-black uppercase ${i === 0 ? "text-blue-600" : "text-slate-500"}`}>{log.status}</p>
                         <p className="text-[10px] text-slate-400 font-bold">{new Date(log.updatedAt).toLocaleString()}</p>
                       </div>
                     ))}
                   </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="h-80 flex flex-col items-center justify-center text-center p-10 border-dashed border-2 rounded-[2.5rem] bg-white/50 backdrop-blur-md">
                <Activity size={48} className="text-slate-300 mb-4 animate-pulse" />
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">
                  Enter a valid Tracking ID <br/> to connect to our satellite network
                </p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;