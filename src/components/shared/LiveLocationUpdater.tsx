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
          console.error("Sync Error");
        }
      },
      (error) => toast.error("GPS access denied!"),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [parcelId, updateLocation]);

  return (
    <div className="bg-blue-600 p-4 rounded-2xl text-white flex items-center gap-4 shadow-xl">
      <div className="h-4 w-4 bg-white rounded-full animate-ping" />
      <span className="font-bold">Real-time GPS Casting Active</span>
    </div>
  );
};
export default LiveLocationUpdater;