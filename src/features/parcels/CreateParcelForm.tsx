// src/features/parcels/CreateParcelForm.tsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/rootReducer";
import { useCreateParcelMutation } from "@/api/parcelApi";
import { useGetReceiversQuery } from "@/api/userApi";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IFormData {
  receiverId: string;
  origin: string;
  deliveryAddress: string;
  pickupAddress: string;
  weight: number;
  price: number;
}

const CreateParcelForm: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState<IFormData>({
    receiverId: "",
    origin: "",
    deliveryAddress: "",
    pickupAddress: "",
    weight: 0,
    price: 0,
  });

  // API hooks
  const [createParcel, { isLoading: creating }] = useCreateParcelMutation();
  const { data: receiversResponse, isLoading: loadingReceivers } = useGetReceiversQuery();

  // Extract actual receivers array from response
  const receivers = useMemo(() => receiversResponse?.data || [], [receiversResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "weight" || name === "price" ? Number(value) : value,
    }));
  };

// handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login first");
    if (!formData.receiverId) return alert("Please select a receiver");

    try {
        const trackingNumber = `TRK-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(100000 + Math.random() * 900000)}`;

        // formData থেকে receiverId আলাদা করে নিন
        const { receiverId, ...restOfFormData } = formData;

        // ব্যাকএন্ডের মডেল অনুযায়ী নতুন একটি অবজেক্ট তৈরি করুন
        const parcelDataForBackend = {
          ...restOfFormData,
          receiver: receiverId,   // 'receiverId' এর ভ্যালু 'receiver' নামে পাঠান
          sender: user._id,       // 'user._id' এর ভ্যালু 'sender' নামে পাঠান
          status: "REQUESTED",
          trackingNumber,
        };
        
        // নতুন অবজেক্টটি API কলে পাঠান
        await createParcel(parcelDataForBackend).unwrap();

        alert("Parcel created successfully!");
        navigate("/dashboard/sender");
    } catch (error: any) {
        console.error(error);
        alert(error?.data?.message || "Failed to create parcel");
    }
};

  return (
    <Card className="max-w-lg mx-auto mt-6 shadow-lg">
      <CardHeader>
        <CardTitle>Create Parcel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Receiver select */}
          <div>
            <Label htmlFor="receiverId">Select Receiver</Label>
            <Select value={formData.receiverId} onValueChange={(value) => setFormData(prev => ({ ...prev, receiverId: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={loadingReceivers ? "Loading..." : "Select a receiver"} />
              </SelectTrigger>
              <SelectContent>
                {receivers.length > 0 ? (
                  receivers.map(receiver => (
                    <SelectItem key={receiver._id} value={receiver._id}>
                      {receiver.name || receiver.email}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-receivers" disabled>
                    No receivers available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Other form fields */}
          <div>
            <Label htmlFor="origin">Origin</Label>
            <Input id="origin" name="origin" value={formData.origin} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Input id="deliveryAddress" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="pickupAddress">Pickup Address</Label>
            <Input id="pickupAddress" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" name="weight" value={formData.weight} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <Button type="submit" className="w-full" disabled={creating}>
            {creating ? "Creating..." : "Create Parcel"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateParcelForm;
