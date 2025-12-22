/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  MapPin, Info, Search, Truck, 
  ShieldCheck, Globe2, ChevronRight 
} from 'lucide-react';

// ✅ এই লাইনটিই হলো এরর সমাধানের মূল চাবিকাঠি
import type { RootState } from '@/app/store'; 

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const districtData = [
  { division: "Dhaka", districts: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Tangail"] },
  { division: "Chittagong", districts: ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"] },
  { division: "Rajshahi", districts: ["Bogra", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj"] },
  { division: "Khulna", districts: ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"] },
  { division: "Barisal", districts: ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"] },
  { division: "Sylhet", districts: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"] },
  { division: "Rangpur", districts: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"] },
  { division: "Mymensingh", districts: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"] }
];

const DistrictsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStartShipping = () => {
    if (!isAuthenticated) {
      toast.info("Please login to start booking!");
      navigate("/login");
    } else {
      const role = user?.role?.toLowerCase();
      if (role === 'sender') {
        navigate("/dashboard/sender/create");
      } else {
        navigate(`/dashboard/${role}`);
      }
    }
  };

  const filteredData = districtData.map(div => ({
    ...div,
    districts: div.districts.filter(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(div => div.districts.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Helmet><title>Coverage Map | ParcelGo - All 64 Districts</title></Helmet>

      <section className="bg-white dark:bg-slate-900 border-b py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Nationwide <span className="text-blue-600">Coverage</span>
            </h1>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input 
                placeholder="Search your district..." 
                className="pl-12 h-14 rounded-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        {filteredData.map((div, idx) => (
          <div key={idx} className="mb-16">
            <h2 className="text-2xl font-black mb-8 border-l-4 border-blue-600 pl-4">{div.division} Division</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {div.districts.map((district) => (
                <Card key={district} className="p-4 hover:border-blue-500 transition-all cursor-default group">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-blue-600" />
                    <span className="font-bold text-sm">{district}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="pb-32 container mx-auto px-6">
           <Card className="bg-slate-900 dark:bg-blue-600 p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 border-none">
              <div className="flex items-center gap-6">
                 <Globe2 size={48} className="opacity-50" />
                 <div>
                    <h3 className="text-2xl font-black">Standard Delivery Rates</h3>
                    <p className="opacity-80">Inside Dhaka: 60 BDT | Outside Dhaka: 120 BDT</p>
                 </div>
              </div>
              <Button onClick={handleStartShipping} className="bg-white text-slate-900 hover:bg-slate-100 h-16 px-10 rounded-2xl font-black text-lg">
                Start Shipping <ChevronRight className="ml-2" />
              </Button>
           </Card>
      </section>
    </div>
  );
};

export default DistrictsPage;