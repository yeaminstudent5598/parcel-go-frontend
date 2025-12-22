/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect } from "react"; // ✅ useEffect যোগ করো
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store"; 
import { useCreateParcelMutation, useLazyValidateCouponQuery } from "@/api/parcelApi";
import { useGetReceiversQuery } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Ticket, Loader2, CheckCircle2, BadgePercent, MapPin } from "lucide-react";

const CreateParcelForm: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // --- নতুন স্টেট: আসল লোকেশন সেভ করার জন্য ---
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  
  const [formData, setFormData] = useState({
    receiverId: "",
    origin: "",
    deliveryAddress: "",
    pickupAddress: "",
    weight: 0,
    price: 0,
  });

  const [createParcel, { isLoading: creating }] = useCreateParcelMutation();
  const { data: receiversResponse, isLoading: loadingReceivers } = useGetReceiversQuery();
  const [triggerValidate, { isFetching: validating }] = useLazyValidateCouponQuery();

  const receivers = useMemo(() => receiversResponse?.data || [], [receiversResponse]);

  // ✅ পেজ লোড হওয়ার সময় ইউজারের আসল লোকেশন নেওয়ার চেষ্টা করা
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log("Current Location Captured:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.warning("Could not get your live location. Using default city center.");
        }
      );
    }
  }, []);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    setFormData({
      ...formData,
      weight: weight,
      price: weight * 50
    });
  };

  const handleApplyCoupon = async () => {
    if (!couponInput) return toast.error("Please enter a coupon code");
    try {
      const result = await triggerValidate(couponInput).unwrap();
      if (result.success) {
        setDiscount(result.data.discountAmount);
        setIsCouponApplied(true);
        toast.success(`Success! ${result.data.discountAmount} BDT discount applied.`);
      }
    } catch (err: any) {
      setDiscount(0);
      setIsCouponApplied(false);
      toast.error(err?.data?.message || "Invalid or Expired Coupon");
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setDiscount(0);
    setCouponInput("");
    toast.info("Coupon removed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return toast.error("Please login first");
  if (!formData.receiverId) return toast.error("Please select a receiver");

  // যদি জিপিএস না পায়, তবে একটি ডিফল্ট লোকেশন সেট করে দেওয়া (Professional Approach)
  const defaultCoords = { lat: 23.8103, lng: 90.4125 }; // Dhaka

  try {
    const finalParcelData = {
      ...formData,
      receiver: formData.receiverId,
      sender: user?._id || user?.id,
      couponCode: isCouponApplied ? couponInput : undefined,
      // যদি coords থাকে তবে সেটা যাবে, নাহলে defaultCoords যাবে
      currentLocation: coords ? { lat: coords.lat, lng: coords.lng } : defaultCoords,
    };

    await createParcel(finalParcelData).unwrap();
    toast.success("Shipment Booked Successfully!");
    navigate("/dashboard/sender");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to book parcel");
  }
};

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-xl shadow-2xl border-t-4 border-blue-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <BadgePercent className="text-blue-600" /> Create New Shipment
          </CardTitle>
          {/* লোকেশন ইন্ডিকেটর */}
          <div className="flex justify-center mt-2">
            {coords ? (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                <MapPin size={10} /> GPS Location Captured
              </span>
            ) : (
              <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                <Loader2 size={10} className="animate-spin" /> Fetching GPS...
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Receiver Section */}
            <div className="space-y-2">
              <Label className="font-semibold">Recipient Information</Label>
              <Select 
                onValueChange={(v) => setFormData({...formData, receiverId: v})}
                disabled={loadingReceivers}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={loadingReceivers ? "Loading list..." : "Select Receiver"} />
                </SelectTrigger>
                <SelectContent>
                  {receivers.map((r: any) => (
                    <SelectItem key={r._id} value={r._id}>{r.name} ({r.phoneNumber})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Weight & Price Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight"
                  type="number" 
                  min="0.5" 
                  step="0.5"
                  placeholder="0.0" 
                  onChange={handleWeightChange} 
                  className="h-12"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>Shipping Cost</Label>
                <Input value={`${formData.price} BDT`} disabled className="h-12 bg-muted font-bold text-blue-600" />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Address</Label>
                <Input 
                  id="pickup"
                  placeholder="Street, Area, City" 
                  value={formData.pickupAddress} 
                  onChange={(e) => setFormData({...formData, pickupAddress: e.target.value})} 
                  className="h-12"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery">Delivery Address</Label>
                <Input 
                  id="delivery"
                  placeholder="Recipient's full address" 
                  value={formData.deliveryAddress} 
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})} 
                  className="h-12"
                  required 
                />
              </div>
            </div>

            {/* Coupon UI Section */}
            <div className="p-4 bg-blue-50 dark:bg-slate-900 rounded-xl border border-dashed border-blue-300">
              <Label className="flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-300 font-bold">
                <Ticket size={18} /> Apply Promo Code
              </Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. SAVE100" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  disabled={isCouponApplied}
                  className="h-11 bg-white dark:bg-slate-800"
                />
                <Button 
                  type="button" 
                  onClick={handleApplyCoupon} 
                  disabled={validating || isCouponApplied || !couponInput}
                  className="h-11 px-6"
                  variant={isCouponApplied ? "secondary" : "default"}
                >
                  {validating ? <Loader2 className="animate-spin" size={18} /> : isCouponApplied ? <CheckCircle2 className="text-green-600" /> : "Apply"}
                </Button>
              </div>
              {isCouponApplied && (
                 <button 
                   type="button" 
                   onClick={handleRemoveCoupon}
                   className="text-xs text-red-500 mt-2 underline hover:text-red-700"
                 >
                   Remove this coupon
                 </button>
              )}
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Charge:</span>
                <span className="font-medium">{formData.price} BDT</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Coupon Discount:</span>
                  <span className="font-bold">- {discount} BDT</span>
                </div>
              )}
              <div className="flex justify-between font-extrabold text-xl pt-2 border-t border-slate-300 dark:border-slate-600">
                <span>Net Payable:</span>
                <span className="text-blue-600">{Math.max(0, formData.price - discount)} BDT</span>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg" disabled={creating}>
              {creating ? <Loader2 className="animate-spin mr-2" /> : null}
              {creating ? "Processing Shipment..." : "Confirm & Book Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateParcelForm;