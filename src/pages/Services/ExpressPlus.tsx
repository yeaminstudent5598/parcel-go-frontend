import React from 'react';
import { Zap, Timer, ArrowRight, ShieldCheck, Crown, Rocket, Bell, HeadphonesIcon, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExpressPlus = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Premium Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -ml-40 -mb-40" />
        
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 text-yellow-500 font-black mb-8 uppercase tracking-[0.3em] text-xs">
              <Crown size={20} fill="currentColor" /> The Elite Choice
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-10 tracking-tighter">
              Time is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Luxury.</span> <br/>We Deliver Fast.
            </h1>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed max-w-xl">
              Express Plus is our premium tier for those who can't wait. Guaranteed 24-hour delivery with dedicated riders and priority sorting.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-12 h-18 text-xl font-black shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                  <Link to="/dashboard/sender/create" className="flex items-center gap-3">
                    Activate Express <Zap size={20} fill="currentColor" />
                  </Link>
                </Button>
            </div>
          </motion.div>
          
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
             <div className="relative rounded-[3rem] overflow-hidden border border-slate-800 bg-slate-900">
                <img src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1000" className="w-full h-[600px] object-cover" alt="Express Delivery" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <div className="flex items-center gap-4 bg-black/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black">
                        <Timer size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Avg. Delivery Time</p>
                        <p className="text-2xl font-black text-white">14.2 Hours</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-900/50">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { icon: Rocket, t: "Priority Boarding", d: "Your parcel is the first to get on the truck and the last to get off." },
                 { icon: Bell, t: "VIP Notifications", d: "Get direct SMS/WhatsApp alerts for every single milestone." },
                 { icon: HeadphonesIcon, t: "Concierge Support", d: "Dedicated relationship manager for all your shipping needs." },
                 { icon: CreditCard, t: "Instant Refund", d: "If we miss the 24h deadline, get your delivery fee back instantly." }
               ].map((feature, i) => (
                 <div key={i} className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors group">
                    <feature.icon className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="text-xl font-bold mb-4">{feature.t}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-black mb-4">Why Choose Plus?</h2>
           <p className="text-slate-500">Compare and see the premium difference.</p>
        </div>
        <div className="max-w-4xl mx-auto overflow-hidden rounded-[2rem] border border-slate-800">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-slate-900">
                    <th className="p-6 text-slate-400 font-bold">Feature</th>
                    <th className="p-6 text-slate-400 font-bold">Standard</th>
                    <th className="p-6 text-blue-400 font-bold">Express Plus</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                 {[
                   ["Delivery Window", "3-5 Days", "Under 24 Hours"],
                   ["Insurance Coverage", "Up to 5,000 BDT", "Up to 50,000 BDT"],
                   ["Pickup Service", "Scheduled", "Within 60 Minutes"],
                   ["Support Tier", "Bot / Email", "Human / Personal Agent"],
                   ["Rider Tier", "Standard", "Elite / Certified"]
                 ].map((row, i) => (
                   <tr key={i} className="hover:bg-slate-900/40">
                      <td className="p-6 font-medium text-slate-300">{row[0]}</td>
                      <td className="p-6 text-slate-500">{row[1]}</td>
                      <td className="p-6 text-white font-bold">{row[2]}</td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>

      {/* Business Partners */}
      <section className="py-24 bg-gradient-to-b from-transparent to-blue-900/20">
         <div className="container mx-auto px-6 text-center">
            <h3 className="text-slate-500 uppercase tracking-[0.5em] text-xs font-bold mb-12">Trusted by Global Corporations</h3>
            <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Replace with actual logos if you have them */}
               <div className="text-2xl font-black">SAMSUNG</div>
               <div className="text-2xl font-black">TOYOTA</div>
               <div className="text-2xl font-black">ROLEX</div>
               <div className="text-2xl font-black">APPLE</div>
               <div className="text-2xl font-black">NIKE</div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ExpressPlus;