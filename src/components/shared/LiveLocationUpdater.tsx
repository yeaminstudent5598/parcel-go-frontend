/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useUpdateParcelLocationMutation } from '@/api/parcelApi';
import { toast } from 'sonner';

const LiveLocationUpdater = ({ parcelId }: { parcelId: string }) => {
  const [updateLocation] = useUpdateParcelLocationMutation();

  useEffect(() => {
    if (!parcelId) return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // এটি ডাটাবেজ আপডেট করবে এবং ব্যাকএন্ড সকেট ইভেন্ট পাঠাবে
          await updateLocation({ id: parcelId, lat: latitude, lng: longitude }).unwrap();
        } catch (err) {
          console.error("Sync Error:", err);
        }
      },
      // ✅ সমাধান: error প্যারামিটারটি ব্যবহার করা হয়েছে অথবা আন্ডারস্কোর (_) দিয়ে ইগনোর করা যায়।
      (error) => {
        console.error("Geolocation Error:", error.message);
        toast.error("GPS access denied or signal lost!");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [parcelId, updateLocation]);

  return (
    <div className="bg-blue-600 p-4 rounded-2xl text-white flex items-center gap-4 shadow-xl">
      {/* লাইভ জিপিএস ইন্ডিকেটর এনিমেশন */}
      <div className="relative flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
      </div>
      <span className="font-bold tracking-tight">Real-time GPS Casting Active</span>
    </div>
  );
};

export default LiveLocationUpdater;