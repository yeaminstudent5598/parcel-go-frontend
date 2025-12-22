import { Globe2, Plane, ShieldCheck, FileText, Info, ArrowRight, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GlobalShipping = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat" />
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto">
            <div className="bg-blue-600 w-24 h-24 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-blue-200 rotate-12">
              <Globe2 size={48} />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
              The World is Now <br/><span className="text-blue-600">Your Neighborhood.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              ParcelGo Global connects your business to over 200 countries. From express air cargo to specialized customs clearance, we handle the complexity of international logistics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-12 h-16 text-lg font-bold shadow-xl transition-transform hover:scale-105">
                  <Link to="/dashboard/sender/create">Book Global Parcel</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-2xl px-12 h-16 text-lg font-bold border-2 hover:bg-slate-100">
                  <Link to="/contact">Talk to Export Expert</Link>
               </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Services */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
           {[
             { icon: Plane, t: "Air Express", d: "3-7 Days delivery worldwide via our premium airline partners like Emirates and DHL." },
             { icon: Anchor, t: "Ocean Freight", d: "Cost-effective solutions for heavy shipments and bulk containers across major ports." },
             { icon: FileText, t: "Customs Paperwork", d: "We handle duty calculations, HS codes, and all regulatory documentation for you." }
           ].map((item, i) => (
             <div key={i} className="group p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-transparent hover:border-blue-200 transition-all hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <item.icon size={30} />
                </div>
                <h3 className="text-2xl font-black mb-4">{item.t}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{item.d}</p>
                <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn More <ArrowRight size={18} />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Global Compliance Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
           <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/30 blur-3xl rounded-full" />
             <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">No Borders, <br/>No Confusion.</h2>
             <div className="space-y-8">
               {[
                 { title: "Smart Duty Estimation", desc: "Know exactly what customs duties apply before you ship with our AI calculator." },
                 { title: "Real-time Port Tracking", desc: "Monitor your shipment's status as it clears customs at international borders." },
                 { title: "Localized Last-Mile", desc: "We partner with local experts in each country for guaranteed delivery at the destination door." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-600/50 flex items-center justify-center text-blue-400">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
           <div className="relative rounded-[3rem] overflow-hidden border border-slate-700">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Global Logistics" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                 <div className="flex items-center gap-2 text-blue-400 mb-2 font-bold uppercase tracking-tighter text-xs"> <Info size={14}/> Pro Tip</div>
                 <p className="text-sm text-slate-200 italic">"Ensure all items are packed according to IATA standards for air freight."</p>
              </div>
           </div>
        </div>
      </section>

      {/* Restricted Items Section */}
      <section className="py-24 container mx-auto px-6">
         <div className="bg-slate-50 dark:bg-slate-900 p-12 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <h3 className="text-3xl font-black mb-8 text-center">Important: Restricted Items</h3>
            <div className="grid md:grid-cols-4 gap-4 text-center">
               {["Flammables", "Corrosives", "Explosives", "Currency", "Live Animals", "Perishables", "Illegal Drugs", "Firearms"].map((item, i) => (
                 <div key={i} className="py-4 px-6 bg-white dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 font-bold border border-slate-100 dark:border-slate-700 italic">
                   {item}
                 </div>
               ))}
            </div>
            <p className="mt-8 text-center text-slate-500 text-sm">Please review our full <span className="text-blue-600 font-bold underline cursor-pointer">Global Shipping Policy</span> before booking.</p>
         </div>
      </section>
    </div>
  );
};

export default GlobalShipping;