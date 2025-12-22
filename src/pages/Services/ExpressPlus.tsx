/* eslint-disable @typescript-eslint/no-explicit-any */
import { Zap, Timer, Crown, Rocket, Bell, HeadphonesIcon, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const ExpressPlus = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Helmet><title>Express Plus | Elite Priority Shipping</title></Helmet>

      {/* --- 1. PREMIUM HERO (Responsive Grid) --- */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-32 overflow-hidden px-6">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 blur-[100px] md:blur-[150px] rounded-full -mr-20 -mt-20 md:-mr-40 md:-mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full -ml-20 -mb-20 md:-ml-40 md:-mb-40" />
        
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            {/* ✅ Fixed Icon Props */}
            <div className="flex items-center gap-3 text-yellow-500 font-black mb-6 md:mb-8 uppercase tracking-[0.3em] text-[10px] md:text-xs">
              <Crown size={20} fill="currentColor" /> The Elite Choice
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[1.1] md:leading-[0.9] mb-6 md:mb-10 tracking-tighter">
              Time is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">Luxury.</span> <br className="hidden md:block"/>We Deliver Fast.
            </h1>
            <p className="text-slate-400 text-base md:text-xl mb-8 md:mb-12 leading-relaxed max-w-xl font-medium">
              Express Plus is our premium tier for those who can't wait. Guaranteed 24-hour delivery with dedicated riders and priority sorting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Button onClick={() => navigate('/dashboard/sender/create')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 md:px-12 h-14 md:h-18 text-lg md:text-xl font-black shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                   Activate Express <Zap size={20} fill="currentColor" className="ml-3" />
                </Button>
            </div>
          </motion.div>
          
          <div className="relative group mt-8 lg:mt-0">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] md:rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-[350px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Express Delivery" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-auto">
                   <div className="flex items-center gap-4 bg-black/50 backdrop-blur-xl p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10">
                      {/* ✅ Fixed Icon Props */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black shrink-0">
                        <Timer size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Avg. Time</p>
                        <p className="text-xl md:text-2xl font-black text-white">14.2 Hours</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 2. FEATURES GRID (Responsive Layout) --- */}
      <section className="py-20 md:py-24 bg-slate-900/40 border-y border-slate-800/50">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Rocket, t: "Priority Boarding", d: "Your parcel is the first to get on the truck and the last to get off." },
                  { icon: Bell, t: "VIP Notifications", d: "Get direct SMS/WhatsApp alerts for every single milestone." },
                  { icon: HeadphonesIcon, t: "Concierge Support", d: "Dedicated relationship manager for all your shipping needs." },
                  { icon: CreditCard, t: "Instant Refund", d: "If we miss the 24h deadline, get your delivery fee back instantly." }
                ].map((feature, i) => (
                  <motion.div 
                    whileHover={{ y: -5 }}
                    key={i} 
                    className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all group shadow-sm"
                  >
                     <feature.icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                     <h4 className="text-xl font-black mb-4 uppercase tracking-tight">{feature.t}</h4>
                     <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.d}</p>
                  </motion.div>
                ))}
            </div>
         </div>
      </section>

      {/* --- 3. COMPARISON TABLE (Horizontal Scroll Responsive) --- */}
      <section className="py-20 md:py-32 container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
           <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-none">Why Choose <span className="text-blue-500 italic">Plus?</span></h2>
           <p className="text-slate-500 font-medium">Compare and see the premium difference for yourself.</p>
        </div>
        
        {/* Table Container with Horizontal Scroll for Mobile */}
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-3xl md:rounded-[2rem] border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
           <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                  <tr className="bg-slate-900">
                     <th className="p-6 text-slate-400 font-black uppercase text-xs tracking-widest">Feature</th>
                     <th className="p-6 text-slate-400 font-black uppercase text-xs tracking-widest">Standard</th>
                     <th className="p-6 text-blue-500 font-black uppercase text-xs tracking-widest italic">Express Plus</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                  {[
                    ["Delivery Window", "3-5 Days", "Under 24 Hours"],
                    ["Insurance Coverage", "Up to 5,000 BDT", "Up to 50,000 BDT"],
                    ["Pickup Service", "Scheduled", "Within 60 Minutes"],
                    ["Support Tier", "Bot / Email", "Personal Agent"],
                    ["Rider Tier", "Standard", "Elite Certified"]
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-600/5 transition-colors group">
                       <td className="p-6 font-bold text-slate-300 text-sm md:text-base">{row[0]}</td>
                       <td className="p-6 text-slate-500 text-sm md:text-base">{row[1]}</td>
                       <td className="p-6 text-white font-black text-sm md:text-base italic group-hover:text-blue-400 transition-colors">{row[2]}</td>
                    </tr>
                  ))}
              </tbody>
           </table>
        </div>
      </section>

      {/* --- 4. BUSINESS PARTNERS (Responsive Flex) --- */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-blue-900/10 px-6">
         <div className="container mx-auto text-center">
            <h3 className="text-slate-500 uppercase tracking-[0.5em] text-[10px] md:text-xs font-black mb-12">Trusted by Global Corporations</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               {["SAMSUNG", "TOYOTA", "ROLEX", "APPLE", "NIKE"].map(brand => (
                 <div key={brand} className="text-lg md:text-3xl font-black tracking-tighter italic cursor-default">{brand}</div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
          <Button onClick={() => navigate('/dashboard/sender/create')} className="w-full h-14 bg-blue-600 text-white font-black rounded-2xl shadow-2xl flex items-center justify-center gap-2">
            Book Express <ArrowRight size={18} />
          </Button>
      </div>

    </div>
  );
};

export default ExpressPlus;