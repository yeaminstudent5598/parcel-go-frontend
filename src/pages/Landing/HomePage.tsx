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

// ✅ Fixed: Type-only import to resolve SyntaxError and verbatimModuleSyntax issues
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

// Assets
import riderImage from '../../assets/images/rider.svg';

// --- DYNAMIC DATA ARRAYS ---
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
  
  // --- STATES ---
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

  // ✅ Functional logic for Merchant Join button
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
      <section className="relative pt-10 pb-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Activity size={14} className="animate-pulse" /> Live Fleet Tracking: {activeRiders} Active
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-slate-900 dark:text-white">
              Next Gen <br /><span className="text-blue-600">Logistics.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
              We leverage satellite tracking and AI-driven routing to deliver parcels faster than anyone in the industry.
            </p>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg p-2 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-100 dark:shadow-none">
              <Input 
                placeholder="Enter Tracking ID (TRK-XXXX)" 
                className="h-14 border-none bg-transparent focus-visible:ring-0 text-lg font-bold"
                value={trackId} onChange={(e) => setTrackId(e.target.value)}
              />
              <Button type="submit" size="lg" className="h-14 bg-blue-600 hover:bg-blue-700 px-10 font-bold rounded-2xl transition-all">
                Track Live
              </Button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
            <img src={riderImage} alt="Rider" className="relative w-full max-w-xl drop-shadow-3xl" />
          </motion.div>
        </div>
      </section>

      {/* --- 2. DYNAMIC STATS --- */}
      <section className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-12 rounded-[3.5rem] shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {[
            { l: 'Delivered Packages', v: '2.8M+', i: <PackageCheck size={20}/> },
            { l: 'Happy Merchants', v: '12K+', i: <Users size={20}/> },
            { l: 'Cities Covered', v: '500+', i: <MapPin size={20}/> },
            { l: 'Global Reach', v: '200+', i: <Globe size={20}/> },
          ].map((s, idx) => (
            <div key={idx} className="text-center md:border-r border-slate-100 dark:border-slate-800 last:border-0">
              <div className="flex justify-center text-blue-500 mb-2">{s.i}</div>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{s.v}</h2>
              <p className="opacity-60 text-[10px] mt-1 uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. DYNAMIC SERVICES GRID --- */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 text-slate-900 dark:text-white">Enterprise Grade <br/> <span className="text-blue-600">Solutions</span></h2>
            <p className="text-slate-500 font-medium leading-relaxed">Everything you need to ship, track, and manage your logistics operations globally.</p>
          </div>
          <Button 
            onClick={() => navigate('/services')} 
            variant="outline" 
            className="rounded-full h-14 px-8 border-2 font-bold group"
          >
            Explore All Services <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform"/>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -12 }} className="group">
              <Card className="h-full border-none shadow-sm hover:shadow-2xl p-10 bg-slate-50 dark:bg-slate-900/50 transition-all rounded-[3rem] border border-transparent hover:border-blue-500/20">
                <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. STEP-BY-STEP PROCESS --- */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-20 italic">Simple. Seamless. Satellite Tracked.</h2>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { s: '01', t: 'Smart Booking', d: 'AI optimized routes.' },
              { s: '02', t: 'Rapid Pickup', d: 'Doorstep in 30 mins.' },
              { s: '03', t: 'Live Transit', d: 'Satellite GPS track.' },
              { s: '04', t: 'Safe Handover', d: 'Secure OTP Verify.' }
            ].map((p, i) => (
              <div key={i} className="relative group">
                <div className="text-8xl font-black text-slate-200/50 dark:text-slate-800 group-hover:text-blue-100 transition-colors">{p.s}</div>
                <div className="-mt-12">
                   <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-white">{p.t}</h3>
                   <p className="text-sm text-slate-500 font-medium px-4">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MERCHANT SOLUTIONS (B2B) --- */}
      <section className="py-32 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative">
           <img 
              src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200" 
              alt="B2B Merchant" 
              className="rounded-[4rem] border-8 border-slate-50 shadow-2xl" 
            />
           <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-10 rounded-[3rem] shadow-2xl">
              <BarChart3 size={40} />
              <p className="mt-4 font-black text-2xl">200%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Sales Growth for Merchants</p>
           </div>
        </motion.div>
        <div>
          <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter text-slate-900 dark:text-white">Scalable API for <br/> <span className="text-blue-600">E-commerce.</span></h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">Empower your business with our world-class API. Automated booking, bulk tracking, and fastest COD remittance in Bangladesh.</p>
          <div className="grid gap-5 mb-10">
             {[ "Next-day COD disbursement", "Excel/CSV Bulk Booking Tools", "Shopify & WooCommerce Integration", "Dedicated Key Account Manager" ].map(f => (
               <div key={f} className="flex items-center gap-4 text-md font-bold group cursor-default text-slate-800 dark:text-slate-200">
                  <div className="bg-green-100 text-green-600 p-1.5 rounded-full group-hover:rotate-12 transition-transform"><PackageCheck size={18}/></div> {f}
               </div>
             ))}
          </div>
          <Button onClick={handleJoinMerchant} size="lg" className="rounded-2xl h-16 px-12 bg-slate-900 dark:bg-blue-600 font-bold shadow-xl transition-all active:scale-95">
            Join Merchant Network
          </Button>
        </div>
      </section>

      {/* --- 6. FULLY FUNCTIONAL SELECT CALCULATOR --- */}
      <section className="py-24 container mx-auto px-6">
        <Card className="bg-slate-900 text-white p-12 rounded-[4rem] border-none shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">Shipping Calculator</h2>
            <p className="text-slate-400 mb-10 font-medium">Select your destination and weight for an instant precise estimation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-1">Destination District</label>
                 <Select onValueChange={setCalcCity}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl text-white font-bold">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                       {districts.map(d => <SelectItem key={d} value={d} className="font-medium">{d}</SelectItem>)}
                    </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 ml-1">Parcel Weight (KG)</label>
                 <Input 
                  type="number" placeholder="e.g. 1.5" 
                  className="bg-white/5 border-white/10 h-14 text-white placeholder:text-white/20 rounded-2xl font-bold"
                  value={calcWeight} onChange={(e) => setCalcWeight(e.target.value)}
                />
               </div>
            </div>
            <Button onClick={handleCalculate} className="mt-10 bg-blue-600 hover:bg-blue-700 h-16 px-12 rounded-2xl font-black w-full sm:w-auto shadow-2xl">
              Calculate Cost
            </Button>
          </div>
          <Globe size={500} className="absolute -right-20 -bottom-20 opacity-10 text-blue-400 pointer-events-none" />
          <motion.div key={estPrice} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 bg-white/5 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/10 min-w-[320px] text-center">
             <p className="text-[10px] uppercase font-black tracking-widest text-blue-400 mb-4">Total Estimate</p>
             <div className="flex items-center justify-center gap-3">
                <span className="text-8xl font-black tracking-tighter">{estPrice.toFixed(0)}</span>
                <span className="text-2xl font-bold text-slate-500">BDT</span>
             </div>
             <p className="text-[10px] text-slate-500 mt-6 font-bold uppercase tracking-[0.2em]">*Doorstep Delivery Included</p>
          </motion.div>
        </Card>
      </section>

      {/* --- 7. GLOBAL COVERAGE MAP SECTION --- */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
         <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
               <h2 className="text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">Connecting the <br/> <span className="text-blue-600">Global Economy.</span></h2>
               <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 font-medium">Shipping to 200+ countries with professional clearance and priority air lanes.</p>
               <div className="flex flex-wrap justify-center gap-4">
                  {["USA", "UK", "UAE", "CANADA", "CHINA", "GERMANY", "INDIA", "MALAYSIA"].map(c => (
                    <span key={c} className="px-6 py-3 border border-white/10 rounded-full text-xs font-black tracking-widest bg-white/5">{c}</span>
                  ))}
               </div>
            </motion.div>
         </div>
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center scale-125" />
      </section>

      {/* --- 8. TESTIMONIALS SLIDER --- */}
      <section className="py-32 container mx-auto px-6 bg-white">
        <h2 className="text-center text-xs font-black mb-16 text-blue-600 uppercase tracking-[0.4em]">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-12 border border-slate-100 dark:border-slate-800 shadow-sm rounded-[3rem] bg-white dark:bg-slate-900 relative">
              <Star className="text-amber-400 absolute top-10 right-10" fill="currentColor" size={24} />
              <p className="text-lg text-slate-600 dark:text-slate-400 italic mb-10 leading-relaxed font-medium leading-relaxed">
                "ParcelGo Elite service is phenomenal. Their live tracking accuracy is exactly what my business needed."
              </p>
              <div className="flex items-center gap-5 border-t dark:border-slate-800 pt-8 text-slate-900 dark:text-white">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center font-black text-blue-600">Y</div>
                <div>
                  <p className="font-black text-sm">Merchant Partner {i}</p>
                  <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest text-slate-400">Verified</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* --- 9. TRUST PARTNERS MARQUEE --- */}
      <section className="py-20 border-y dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-16 items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           {partners.map(p => (
             <span key={p} className="text-3xl font-black text-slate-400 italic tracking-tighter">{p}</span>
           ))}
        </div>
      </section>

      {/* --- 10. REAL-TIME FLEET STATUS --- */}
      <section className="py-32 container mx-auto px-6">
         <div className="bg-blue-600 rounded-[4rem] p-16 text-white grid lg:grid-cols-2 gap-16 items-center relative overflow-hidden">
            <div className="relative z-10">
               <h2 className="text-5xl font-black mb-6 tracking-tighter italic">Live Fleet Monitor</h2>
               <p className="text-blue-100 mb-10 font-medium">Current status of our active logistics network across the nation.</p>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                     <Activity className="animate-ping" size={16} /> <span>{activeRiders} Riders currently on transit.</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                     <ShieldCheck size={16} /> <span>99.9% Successful Handover Accuracy.</span>
                  </div>
               </div>
            </div>
            <div className="relative z-10 flex justify-center">
               <div className="grid grid-cols-2 gap-4">
                  {[ {l: "Dhaka", v: "1420"}, {l: "Chittagong", v: "840"}, {l: "Sylhet", v: "310"}, {l: "Others", v: "2280"} ].map(c => (
                    <div key={c.l} className="p-8 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 text-center">
                       <p className="text-3xl font-black text-white">{c.v}</p>
                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-white">{c.l}</p>
                    </div>
                  ))}
               </div>
            </div>
            <Zap size={600} className="absolute -left-40 -bottom-40 opacity-10 rotate-12" />
         </div>
      </section>

      {/* --- 11. MOBILE APP SECTION (COMING SOON) --- */}
      <section className="py-32 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-6 tracking-wider border border-amber-100">
             <Zap size={12} fill="currentColor" /> APP COMING SOON
          </div>
          <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter uppercase text-slate-900 dark:text-white">
            Power in Your <br/><span className="text-blue-600">Pocket.</span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed font-medium italic">
            Book shipments, manage CODs, and track deliveries with our upcoming mobile application.
          </p>
          <div className="flex flex-wrap gap-5">
            <Button onClick={() => toast.info("Google Play Store app is coming soon!")} size="lg" className="bg-slate-900 text-white rounded-2xl h-16 px-10 gap-3 font-black opacity-70 cursor-not-allowed">
               <Download size={22} /> Play Store <span className="text-[10px] bg-white/20 px-2 rounded-lg">Wait</span>
            </Button>
            <Button onClick={() => toast.info("App Store version is in review. Coming soon!")} variant="outline" size="lg" className="rounded-2xl h-16 px-10 gap-3 font-black border-2 opacity-70 cursor-not-allowed">
               <Smartphone size={22} /> App Store <span className="text-[10px] bg-slate-100 px-2 rounded-lg text-slate-500 font-bold">Soon</span>
            </Button>
          </div>
        </div>
        <div className="flex justify-center relative">
           <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 blur-[150px] rounded-full" />
           <div className="w-80 h-[580px] bg-slate-900 rounded-[4rem] border-[12px] border-slate-800 shadow-3xl overflow-hidden relative">
              <div className="p-8 text-white text-center mt-24">
                 <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <PackageCheck size={40} />
                 </div>
                 <p className="font-black text-3xl tracking-tighter">Parcel<span className="text-blue-500">Go</span></p>
                 <p className="text-sm opacity-50 mt-4 leading-relaxed font-black uppercase tracking-widest text-blue-400">Under Development</p>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-white/20 rounded-full" />
           </div>
        </div>
      </section>

      {/* --- 12. ADVANCED FAQ SECTION --- */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
             <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
                <HelpCircle size={32} />
             </div>
             <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-slate-900 dark:text-white">General Inquiries</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your Security, Our Priority</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "What is the max weight for Express Plus?", a: "Standard Express Plus handles up to 10kg. For larger items, please contact our enterprise desk." },
              { q: "How do you ensure parcel safety?", a: "Every parcel is sealed with a tamper-proof RFID tag and tracked via satellite 24/7." },
              { q: "What is your COD remittance cycle?", a: "Merchants receive their COD payments within 24 hours of successful delivery." },
              { q: "Do you offer international export?", a: "Yes, our Global Shipping service covers over 200 countries with full customs support." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2rem] px-10 shadow-sm overflow-hidden border border-transparent hover:border-blue-500/20 transition-all">
                <AccordionTrigger className="hover:no-underline font-black py-8 text-xl text-slate-800 dark:text-slate-200 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 dark:text-slate-400 pb-8 leading-relaxed font-medium text-lg text-slate-600 dark:text-slate-400">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- 13. AWARDS & RECOGNITION --- */}
      <section className="py-32 container mx-auto px-6 flex flex-col items-center">
         <h2 className="text-center text-xs font-black mb-16 text-slate-400 uppercase tracking-[0.5em]">Recognition</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full text-center">
            {[ {i: <Award/>, t: "Best Logistics 2024"}, {l: <ShieldAlert/>, t: "ISO 9001 Certified"}, {i: <Star/>, t: "5 Star Merchant Rating"}, {i: <Users/>, t: "Top Employer Award"} ].map((a, i) => (
              <div key={i} className="flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity text-slate-900 dark:text-white">
                 <div className="text-blue-600 mb-4">{a.i || a.l}</div>
                 <p className="font-black text-[10px] uppercase tracking-widest">{a.t}</p>
              </div>
            ))}
         </div>
      </section>

      {/* --- 14. DYNAMIC NEWSLETTER --- */}
      <section className="py-40 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <Mail size={48} className="mx-auto text-blue-500 mb-10" />
            <h2 className="text-6xl font-black mb-8 tracking-tighter uppercase leading-[0.9] text-white">Join the <br/> <span className="text-blue-600 text-outline">Network.</span></h2>
            <p className="text-xl text-slate-400 mb-12 font-medium">Subscribe for weekly logistics intelligence and exclusive merchant discount codes.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 p-3 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 max-w-2xl mx-auto">
              <Input 
                placeholder="company@domain.com" 
                className="border-none bg-transparent h-16 focus-visible:ring-0 text-xl px-8 font-bold text-white placeholder:text-white/30"
                value={email} onChange={(e) => setEmail(e.target.value)} required
              />
              <Button type="submit" className="h-16 px-12 bg-blue-600 hover:bg-blue-700 rounded-[2rem] font-black text-lg transition-transform active:scale-95 shadow-2xl">
                Join Now
              </Button>
            </form>
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* --- 15. DISTRICTS REDIRECT BUTTON --- */}
      <section className="py-24 text-center bg-white dark:bg-slate-950">
          <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">Ready to Explore Our Network?</h2>
          <Button 
            onClick={() => navigate('/districts')} 
            variant="ghost" 
            className="text-blue-600 font-black group h-16 px-12 rounded-full border border-blue-100 hover:bg-blue-50"
          >
            View All 64 Districts <ChevronRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform"/>
          </Button>
      </section>

      {/* SATELLITE INDICATOR */}
      <div className="fixed bottom-10 right-10 z-[100] group">
         <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-500/50 backdrop-blur-xl">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-ping" />
            <p className="text-[10px] font-black uppercase tracking-widest hidden group-hover:block text-white">Satellite Link Active</p>
         </div>
      </div>
    </div>
  );
};

export default HomePage;