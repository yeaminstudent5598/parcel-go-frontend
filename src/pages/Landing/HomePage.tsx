/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Truck, ShieldCheck, Globe, Star, 
  Download, PackageCheck, Zap, BarChart3, 
  Users, MapPin, Mail, ChevronRight, Activity, Smartphone,
  HelpCircle, ShieldAlert, Award, Headphones, Plane, Briefcase
} from 'lucide-react';

import type { RootState } from '@/app/store'; 

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "@/components/ui/accordion";
import { toast } from 'sonner';

import riderImage from '../../assets/images/rider.svg';

const districts = ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Tangail", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira", "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati", "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet", "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Sherpur", "Mymensingh"].sort();

const services = [
  { id: 1, title: 'Standard Delivery', icon: <Truck className="text-blue-500" />, desc: 'Reliable 48-72 hour delivery across all 64 districts.' },
  { id: 2, title: 'Express Plus', icon: <Zap className="text-yellow-500" />, desc: 'Guaranteed 24-hour priority delivery for urgent needs.' },
  { id: 3, title: 'Corporate Logistics', icon: <Briefcase className="text-purple-500" />, desc: 'Tailored supply chain solutions for large enterprises.' },
  { id: 4, title: 'Global Air Freight', icon: <Plane className="text-cyan-500" />, desc: 'International shipping to 200+ countries with customs support.' },
  { id: 5, title: 'Secure Handling', icon: <ShieldCheck className="text-green-500" />, desc: 'Advanced insurance for high-value electronics and luxury goods.' },
  { id: 6, title: '24/7 Priority Support', icon: <Headphones className="text-rose-500" />, desc: 'Dedicated account managers for all your inquiries.' },
];

const partners = ["Daraz", "Foodpanda", "Aarong", "Bata", "Chaldal", "Samsung", "Unilever", "Walton"];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  const [trackId, setTrackId] = useState('');
  const [calcCity, setCalcCity] = useState('');
  const [calcWeight, setCalcWeight] = useState<string>('');
  const [estPrice, setEstPrice] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [activeRiders, setActiveRiders] = useState(4850);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRiders(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId) return toast.error("Please enter a Tracking ID");
    navigate(`/track?id=${trackId}`);
  };

  const handleCalculate = () => {
    if (!calcCity || !calcWeight) return toast.error("Select destination and weight!");
    const rate = calcCity === "Dhaka" ? 60 : 120;
    setEstPrice(rate * parseFloat(calcWeight));
    toast.success(`Rate calculated for ${calcCity}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error("Invalid Email!");
    toast.success("Subscribed to ParcelGo Elite Newsletter!");
    setEmail('');
  };

  const handleJoinMerchant = () => {
    if (!isAuthenticated) {
      toast.info("Register as a merchant to grow your business!");
      navigate('/register');
    } else {
      toast.success("Redirecting to your dashboard...");
      navigate(`/dashboard/${user?.role?.toLowerCase()}`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <Helmet><title>ParcelGo | Elite Logistics & Satellite Tracking</title></Helmet>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-10 pb-20 md:pb-32 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/40 dark:to-slate-950">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8">
              <Activity size={14} className="animate-pulse" /> Live Fleet: {activeRiders} Active
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.1] tracking-tighter mb-6 md:mb-8 text-slate-900 dark:text-white">
              Next Gen <br /><span className="text-blue-600">Logistics.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 mb-8 md:mb-12 max-w-lg leading-relaxed font-medium">
              We leverage satellite tracking and AI-driven routing to deliver parcels faster than anyone in the industry.
            </p>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg p-2 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none">
              <Input 
                placeholder="Tracking ID (TRK-XXXX)" 
                className="h-12 md:h-14 border-none bg-transparent focus-visible:ring-0 text-md font-bold"
                value={trackId} onChange={(e) => setTrackId(e.target.value)}
              />
              <Button type="submit" size="lg" className="h-12 md:h-14 bg-blue-600 hover:bg-blue-700 px-10 font-bold rounded-xl md:rounded-2xl transition-all">
                Track Live
              </Button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden lg:block">
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
            <img src={riderImage} alt="Rider" className="relative w-full max-w-xl drop-shadow-3xl mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* --- 2. DYNAMIC STATS --- */}
      <section className="container mx-auto px-6 -mt-10 md:-mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {[
            { l: 'Delivered', v: '2.8M+', i: <PackageCheck size={20}/> },
            { l: 'Merchants', v: '12K+', i: <Users size={20}/> },
            { l: 'Cities', v: '500+', i: <MapPin size={20}/> },
            { l: 'Global', v: '200+', i: <Globe size={20}/> },
          ].map((s, idx) => (
            <div key={idx} className="text-center md:border-r border-slate-100 dark:border-slate-800 last:border-0">
              <div className="flex justify-center text-blue-500 mb-1 md:mb-2">{s.i}</div>
              <h2 className="text-xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{s.v}</h2>
              <p className="opacity-60 text-[8px] md:text-[10px] mt-1 uppercase font-bold tracking-widest text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. DYNAMIC SERVICES GRID --- */}
      <section className="py-16 md:py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-slate-900 dark:text-white">Enterprise Grade <br className="hidden md:block"/> <span className="text-blue-600">Solutions</span></h2>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">Everything you need to ship, track, and manage your logistics operations globally.</p>
          </div>
          <Button 
            onClick={() => navigate('/services')} 
            variant="outline" 
            className="rounded-full h-12 md:h-14 px-8 border-2 font-bold group w-full md:w-auto"
          >
            Explore All Services <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform"/>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -10 }} className="group">
              <Card className="h-full border-none shadow-sm hover:shadow-2xl p-6 md:p-10 bg-slate-50 dark:bg-slate-900/50 transition-all rounded-3xl md:rounded-[3rem] border border-transparent hover:border-blue-500/20">
                <div className="bg-white dark:bg-slate-800 w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs md:text-sm font-medium">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. STEP-BY-STEP PROCESS --- */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-12 md:mb-20 italic">Simple. Seamless. Satellite Tracked.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { s: '01', t: 'Booking', d: 'AI optimized routes.' },
              { s: '02', t: 'Pickup', d: 'Doorstep in 30 mins.' },
              { s: '03', t: 'Transit', d: 'Satellite GPS track.' },
              { s: '04', t: 'Handover', d: 'Secure OTP Verify.' }
            ].map((p, i) => (
              <div key={i} className="relative group">
                <div className="text-5xl md:text-8xl font-black text-slate-200/50 dark:text-slate-800 group-hover:text-blue-100 transition-colors">{p.s}</div>
                <div className="-mt-6 md:-mt-12">
                   <h3 className="text-sm md:text-xl font-black mb-1 md:mb-2 text-slate-900 dark:text-white">{p.t}</h3>
                   <p className="text-[10px] md:text-sm text-slate-500 font-medium px-2">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MERCHANT SOLUTIONS (B2B) --- */}
      <section className="py-16 md:py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative order-2 lg:order-1">
           <img 
              src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200" 
              alt="B2B Merchant" 
              className="rounded-3xl md:rounded-[4rem] border-8 border-white dark:border-slate-800 shadow-2xl w-full" 
            />
           <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 bg-blue-600 text-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-2xl">
              <BarChart3 size={32} className="md:w-10 md:h-10" />
              <p className="mt-2 md:mt-4 font-black text-xl md:text-2xl">200%</p>
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-80">Sales Growth</p>
           </div>
        </motion.div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight tracking-tighter text-slate-900 dark:text-white">Scalable API for <br/> <span className="text-blue-600">E-commerce.</span></h2>
          <p className="text-sm md:text-lg text-slate-500 mb-8 md:mb-10 leading-relaxed font-medium">Empower your business with our world-class API. Automated booking, bulk tracking, and fastest COD remittance in Bangladesh.</p>
          <div className="grid gap-3 md:gap-5 mb-8 md:mb-10">
             {[ "Next-day COD disbursement", "Bulk Booking Tools", "Shopify Integration", "Dedicated Manager" ].map(f => (
               <div key={f} className="flex items-center gap-3 md:gap-4 text-xs md:text-md font-bold group cursor-default text-slate-800 dark:text-slate-200">
                  <div className="bg-green-100 text-green-600 p-1 rounded-full group-hover:rotate-12 transition-transform"><PackageCheck size={14}/></div> {f}
               </div>
             ))}
          </div>
          <Button onClick={handleJoinMerchant} size="lg" className="w-full md:w-auto rounded-2xl h-14 md:h-16 px-10 md:px-12 bg-slate-900 dark:bg-blue-600 font-bold shadow-xl transition-all active:scale-95">
            Join Merchant Network
          </Button>
        </div>
      </section>

      {/* --- 6. FULLY FUNCTIONAL SELECT CALCULATOR --- */}
      <section className="py-16 md:py-24 container mx-auto px-6">
        <Card className="bg-slate-900 text-white p-6 md:p-12 rounded-3xl md:rounded-[4rem] border-none shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12 overflow-hidden relative">
          <div className="relative z-10 w-full lg:max-w-xl">
            <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tighter">Shipping Calculator</h2>
            <p className="text-xs md:text-slate-400 mb-8 md:mb-10 font-medium">Get an instant precise estimation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-1">Destination</label>
                 <Select onValueChange={setCalcCity}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-12 md:h-14 rounded-xl md:rounded-2xl text-white font-bold">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                       {districts.map(d => <SelectItem key={d} value={d} className="font-medium">{d}</SelectItem>)}
                    </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-1">Weight (KG)</label>
                 <Input 
                  type="number" placeholder="e.g. 1.5" 
                  className="h-12 md:h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl md:rounded-2xl font-bold"
                  value={calcWeight} onChange={(e) => setCalcWeight(e.target.value)}
                />
               </div>
            </div>
            <Button onClick={handleCalculate} className="mt-8 md:mt-10 bg-blue-600 hover:bg-blue-700 h-12 md:h-16 px-10 md:px-12 rounded-xl md:rounded-2xl font-black w-full shadow-2xl">
              Calculate Cost
            </Button>
          </div>
          <motion.div key={estPrice} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-3xl md:rounded-[4rem] border border-white/10 w-full lg:min-w-[320px] text-center">
             <p className="text-[10px] uppercase font-black tracking-widest text-blue-400 mb-2 md:mb-4">Total Estimate</p>
             <div className="flex items-center justify-center gap-2 md:gap-3">
                <span className="text-5xl md:text-8xl font-black tracking-tighter">{estPrice.toFixed(0)}</span>
                <span className="text-xl md:text-2xl font-bold text-slate-500">BDT</span>
             </div>
             <p className="text-[10px] text-slate-500 mt-4 md:mt-6 font-bold uppercase tracking-[0.2em] italic">Doorstep Included</p>
          </motion.div>
        </Card>
      </section>

      {/* --- 7. GLOBAL COVERAGE --- */}
      <section className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden">
         <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
               <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[1]">Connecting <br className="md:hidden"/> Global Economy.</h2>
               <p className="text-sm md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 md:mb-16 font-medium">Shipping to 200+ countries with priority air lanes.</p>
               <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                  {["USA", "UK", "UAE", "CHINA", "INDIA"].map(c => (
                    <span key={c} className="px-4 md:px-6 py-2 md:py-3 border border-white/10 rounded-full text-[10px] md:text-xs font-black tracking-widest bg-white/5">{c}</span>
                  ))}
               </div>
            </motion.div>
         </div>
      </section>

      {/* --- 8. TESTIMONIALS SLIDER --- */}
      <section className="py-16 md:py-32 container mx-auto px-6 bg-white">
        <h2 className="text-center text-[10px] font-black mb-10 md:mb-16 text-blue-600 uppercase tracking-[0.4em]">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm rounded-3xl md:rounded-[3rem] bg-white dark:bg-slate-900 relative">
              <Star className="text-amber-400 absolute top-6 md:top-10 right-6 md:right-10" fill="currentColor" size={20} />
              <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 italic mb-8 md:mb-10 leading-relaxed font-medium">
                "ParcelGo service is phenomenal. Their tracking accuracy is exactly what my business needed."
              </p>
              <div className="flex items-center gap-4 md:gap-5 border-t dark:border-slate-800 pt-6 md:pt-8 text-slate-900 dark:text-white">
                <div className="w-10 md:w-14 h-10 md:h-14 bg-blue-100 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-blue-600">Y</div>
                <div>
                  <p className="font-black text-xs md:text-sm">Merchant {i}</p>
                  <p className="text-[8px] md:text-[10px] uppercase text-slate-400 font-black tracking-widest">Verified</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* --- 9. TRUST PARTNERS MARQUEE --- */}
      <section className="py-12 md:py-20 border-y dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 items-center grayscale opacity-50">
           {partners.map(p => (
             <span key={p} className="text-xl md:text-3xl font-black text-slate-400 italic tracking-tighter">{p}</span>
           ))}
        </div>
      </section>

      {/* --- 10. REAL-TIME FLEET STATUS --- */}
      <section className="py-16 md:py-32 container mx-auto px-6">
         <div className="bg-blue-600 rounded-3xl md:rounded-[4rem] p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative overflow-hidden">
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tighter italic">Live Fleet Monitor</h2>
               <p className="text-sm md:text-blue-100 mb-8 md:mb-10 font-medium">Active logistics network status across the nation.</p>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
                     <Activity className="animate-ping" size={14} /> <span className="text-xs md:text-sm">{activeRiders} Riders on transit.</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/20">
                     <ShieldCheck size={14} /> <span className="text-xs md:text-sm">99.9% Successful Handover.</span>
                  </div>
               </div>
            </div>
            <div className="relative z-10 flex justify-center">
               <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
                  {[ {l: "Dhaka", v: "1420"}, {l: "Ctg", v: "840"}, {l: "Sylhet", v: "310"}, {l: "Others", v: "2280"} ].map(c => (
                    <div key={c.l} className="p-4 md:p-8 bg-white/10 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/20 text-center">
                       <p className="text-xl md:text-3xl font-black text-white">{c.v}</p>
                       <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-60 text-white">{c.l}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* --- 11. MOBILE APP SECTION --- */}
      <section className="py-16 md:py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase mb-6 tracking-wider border border-amber-100">
             <Zap size={12} fill="currentColor" /> APP COMING SOON
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight tracking-tighter uppercase text-slate-900 dark:text-white">
            Power in Your <br/><span className="text-blue-600">Pocket.</span>
          </h2>
          <p className="text-sm md:text-xl text-slate-500 dark:text-slate-400 mb-8 md:mb-12 leading-relaxed font-medium italic">
            Book shipments, manage CODs, and track deliveries with our upcoming mobile application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => toast.info("Coming soon!")} size="lg" className="bg-slate-900 text-white rounded-xl h-14 md:h-16 px-10 gap-3 font-black opacity-70">
               <Download size={22} /> Google Play
            </Button>
            <Button onClick={() => toast.info("Coming soon!")} variant="outline" size="lg" className="rounded-xl h-14 md:h-16 px-10 gap-3 font-black border-2 opacity-70">
               <Smartphone size={22} /> App Store
            </Button>
          </div>
        </div>
        <div className="flex justify-center relative">
           <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 blur-[100px] rounded-full" />
           <div className="w-64 md:w-80 h-[450px] md:h-[580px] bg-slate-900 rounded-[3rem] md:rounded-[4rem] border-[8px] md:border-[12px] border-slate-800 shadow-3xl overflow-hidden relative">
              <div className="p-8 text-white text-center mt-16 md:mt-24">
                 <div className="bg-blue-600 w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    {/* ✅ সমাধান: Packaging icon-এর responsive সাইজ className দিয়ে করা হয়েছে */}
                    <PackageCheck className="w-8 h-8 md:w-10 md:h-10" />
                 </div>
                 <p className="font-black text-2xl md:text-3xl tracking-tighter text-white text-center">ParcelGo Mobile</p>
                 <p className="text-[10px] opacity-50 mt-4 leading-relaxed font-black uppercase tracking-widest text-blue-400">Under Development</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- 12. ADVANCED FAQ SECTION --- */}
      <section className="py-16 md:py-32 bg-slate-50 dark:bg-slate-900/40 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-20">
             <div className="bg-blue-100 dark:bg-blue-900/50 w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                {/* ✅ সমাধান: HelpCircle-এর responsive সাইজ className দিয়ে করা হয়েছে */}
                <HelpCircle className="w-7 h-7 md:w-8 md:h-8" />
             </div>
             <h2 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-tighter text-slate-900 dark:text-white">General Inquiries</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px]">Your Security, Our Priority</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
            {[
              { q: "What is the max weight for Express Plus?", a: "Standard Express Plus handles up to 10kg. For larger items, please contact our enterprise desk." },
              { q: "How do you ensure parcel safety?", a: "Every parcel is tracked via satellite 24/7." },
              { q: "What is your COD remittance cycle?", a: "Merchants receive their COD payments within 24 hours." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] px-6 md:px-10 shadow-sm overflow-hidden border border-transparent hover:border-blue-500/20 transition-all">
                <AccordionTrigger className="hover:no-underline font-black py-6 md:py-8 text-sm md:text-xl text-slate-800 dark:text-slate-200 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-lg text-slate-600 dark:text-slate-400 pb-6 md:pb-8 font-medium">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- 13. AWARDS & RECOGNITION --- */}
      <section className="py-16 md:py-32 container mx-auto px-6 flex flex-col items-center">
         <h2 className="text-center text-[8px] md:text-[10px] font-black mb-12 md:mb-16 text-slate-400 uppercase tracking-[0.5em]">Recognition</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full text-center">
            {[ {i: <Award/>, t: "Best Logistics"}, {l: <ShieldAlert/>, t: "ISO Certified"}, {i: <Star/>, t: "Top Rated"}, {i: <Users/>, t: "Top Employer"} ].map((a, i) => (
              <div key={i} className="flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity text-slate-900 dark:text-white">
                 <div className="text-blue-600 mb-2 md:mb-4">{a.i || a.l}</div>
                 <p className="font-black text-[8px] md:text-[10px] uppercase tracking-widest">{a.t}</p>
              </div>
            ))}
         </div>
      </section>

      {/* --- 14. DYNAMIC NEWSLETTER --- */}
      <section className="py-24 md:py-40 bg-slate-950 text-white relative overflow-hidden px-6">
        <div className="container mx-auto text-center relative z-10 max-w-3xl">
          {/* ✅ সমাধান: Mail-এর responsive সাইজ className দিয়ে করা হয়েছে */}
          <Mail className="w-10 h-10 md:w-12 md:h-12 mx-auto text-blue-500 mb-8 md:mb-10" />
          <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[1.1] text-white">Join the <br/> <span className="text-blue-600">Network.</span></h2>
          <p className="text-sm md:text-xl text-slate-400 mb-10 md:mb-12 font-medium">Logistics intelligence straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] border border-white/10">
            <Input 
              placeholder="email@domain.com" 
              className="border-none bg-transparent h-12 md:h-16 focus-visible:ring-0 text-md md:text-xl px-6 font-bold text-white placeholder:text-white/30"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <Button type="submit" className="h-12 md:h-16 px-10 md:px-12 bg-blue-600 hover:bg-blue-700 rounded-xl md:rounded-[2rem] font-black text-md md:text-lg">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* --- 15. DISTRICTS REDIRECT --- */}
      <section className="py-16 md:py-24 text-center bg-white dark:bg-slate-950 px-6">
          <h2 className="text-xl md:text-3xl font-black mb-6 md:mb-8 text-slate-900 dark:text-white uppercase tracking-tighter">Explore Our Network</h2>
          <Button 
            onClick={() => navigate('/districts')} 
            variant="ghost" 
            className="text-blue-600 font-black group h-14 md:h-16 px-8 md:px-12 rounded-full border border-blue-50 hover:bg-blue-50 w-full sm:w-auto"
          >
            View All 64 Districts <ChevronRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform"/>
          </Button>
      </section>

      {/* SATELLITE INDICATOR */}
      <div className="fixed bottom-6 md:bottom-10 right-6 md:right-10 z-[100] group">
         <div className="bg-slate-900 text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 border border-blue-500/50 backdrop-blur-xl">
            <div className="h-2 w-2 md:h-3 md:w-3 bg-green-500 rounded-full animate-ping" />
            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">Live Node</p>
         </div>
      </div>
    </div>
  );
};

export default HomePage;