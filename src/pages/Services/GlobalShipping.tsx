/* eslint-disable @typescript-eslint/no-explicit-any */
import { Globe2, Plane, ShieldCheck, FileText, Info, ArrowRight, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const GlobalShipping = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <Helmet><title>Global Shipping | ParcelGo Logistics</title></Helmet>

      {/* --- 1. HERO SECTION (Responsive) --- */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat scale-150 md:scale-100" />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto">
            <div className="bg-blue-600 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 md:mb-10 shadow-2xl shadow-blue-200 rotate-12 transition-transform hover:rotate-0 duration-500">
              <Globe2 size={32} className="md:w-12 md:h-12" />
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]">
              The World is Now <br/><span className="text-blue-600">Neighborhood.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              ParcelGo Global connects your business to over 200 countries. From express air cargo to specialized customs clearance, we handle the complexity of international logistics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
               <Button onClick={() => navigate('/dashboard/sender/create')} size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-xl md:rounded-2xl px-8 md:px-12 h-14 md:h-16 text-md md:text-lg font-bold shadow-xl transition-all active:scale-95">
                  Book Global Parcel
               </Button>
               <Button onClick={() => navigate('/contact')} variant="outline" size="lg" className="rounded-xl md:rounded-2xl px-8 md:px-12 h-14 md:h-16 text-md md:text-lg font-bold border-2 bg-white dark:bg-transparent transition-all active:scale-95">
                  Talk to Export Expert
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. STRATEGIC SERVICES (Grid Responsive) --- */}
      <section className="py-16 md:py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {[
             { icon: Plane, t: "Air Express", d: "3-7 Days delivery worldwide via our premium airline partners like Emirates and DHL." },
             { icon: Anchor, t: "Ocean Freight", d: "Cost-effective solutions for heavy shipments and bulk containers across major ports." },
             { icon: FileText, t: "Customs Paperwork", d: "We handle duty calculations, HS codes, and all regulatory documentation for you." }
           ].map((item, i) => (
             <div key={i} className="group p-8 md:p-10 bg-slate-50 dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 mb-6 md:mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <item.icon size={24} className="md:w-[30px] md:h-[30px]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-slate-900 dark:text-white uppercase tracking-tight">{item.t}</h3>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">{item.d}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-2 transition-transform cursor-pointer text-sm md:text-base">
                  Learn More <ArrowRight size={18} />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* --- 3. GLOBAL COMPLIANCE (Responsive Flex/Grid) --- */}
      <section className="py-16 md:py-32 bg-slate-900 text-white overflow-hidden relative px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
           <div className="relative">
             <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-blue-600/30 blur-3xl rounded-full" />
             <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 leading-tight tracking-tighter uppercase">No Borders, <br/>No Confusion.</h2>
             <div className="space-y-6 md:space-y-10">
               {[
                 { title: "Smart Duty Estimation", desc: "Know exactly what customs duties apply before you ship with our AI calculator." },
                 { title: "Real-time Port Tracking", desc: "Monitor your shipment's status as it clears customs at international borders." },
                 { title: "Localized Last-Mile", desc: "We partner with local experts in each country for guaranteed doorstep delivery." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600/20 border border-blue-600/50 flex items-center justify-center text-blue-400">
                      <ShieldCheck size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
           
           <div className="relative rounded-3xl md:rounded-[3rem] overflow-hidden border border-slate-700 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-64 md:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                alt="Global Logistics" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                 <div className="flex items-center gap-2 text-blue-400 mb-1 md:mb-2 font-black uppercase tracking-widest text-[10px] md:text-xs"> 
                    <Info size={14}/> Pro Tip
                 </div>
                 <p className="text-xs md:text-sm text-slate-200 italic font-medium">"Ensure all items are packed according to IATA standards for air freight."</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- 4. RESTRICTED ITEMS (Responsive Grid) --- */}
      <section className="py-16 md:py-32 container mx-auto px-6">
         <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-20 rounded-3xl md:rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl md:text-4xl font-black mb-8 md:mb-12 text-center uppercase tracking-tighter">Important: Restricted Items</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 text-center">
               {["Flammables", "Corrosives", "Explosives", "Currency", "Live Animals", "Perishables", "Illegal Drugs", "Firearms"].map((item, i) => (
                 <div key={i} className="py-3 px-4 md:py-5 md:px-6 bg-white dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 font-bold border border-slate-100 dark:border-slate-700 italic text-xs md:text-sm shadow-sm transition-transform hover:scale-105">
                   {item}
                 </div>
               ))}
            </div>
            <p className="mt-8 md:mt-12 text-center text-slate-500 text-xs md:text-sm font-medium">
            Please review our full 
            <span 
                onClick={() => navigate('/global-policy')} 
                className="text-blue-600 font-black underline cursor-pointer hover:text-blue-700 transition-colors ml-1"
            >
                Global Shipping Policy
            </span> 
            before booking.
            </p>
         </div>
      </section>

      {/* --- BOTTOM CTA (FIXED RESPONSIVE) --- */}
    <section className="pb-24 container mx-auto px-4 md:px-6">
    <div className="bg-blue-600 rounded-3xl md:rounded-[4rem] p-8 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
            {/* Responsive Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 md:mb-12 tracking-tighter leading-[1.1] uppercase">
            Ready to Expand <br className="hidden sm:block" /> Your Reach?
            </h2>

            {/* ✅ বাটন ফিক্স: মোবাইলে পুরো উইডথ নিবে, টেক্সট ছোট হবে */}
            <Button 
            asChild 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-slate-50 rounded-full w-full sm:w-auto px-6 md:px-16 h-14 md:h-20 text-sm md:text-xl font-black transition-all active:scale-95 shadow-xl"
            >
            <Link to="/register" className="flex items-center justify-center gap-2">
                Create Merchant Account
            </Link>
            </Button>
        </div>

        {/* Background Icon: মোবাইলে হাইড করে দিয়েছি যাতে টেক্সট পড়তে সুবিধা হয় */}
        <Globe2 size={400} className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none rotate-12 hidden md:block" />
    </div>
    </section>
    </div>
  );
};

export default GlobalShipping;