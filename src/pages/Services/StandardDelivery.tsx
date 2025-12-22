/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Truck, CheckCircle2, MapPin, Shield, PackageCheck, 
  Headphones, ArrowRight, Award, Globe2, Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

// ✅ সমাধান: হেল্পার কম্পোনেন্টটি উপরে নিয়ে আসা হয়েছে যাতে Hoisting এরর না হয়
const UsersIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// --- ১. ডাইনামিক ডাটা অ্যারে ---
const stats = [
  { label: "Districts Covered", val: "64/64", icon: <MapPin size={18}/> },
  { label: "Active Riders", val: "5,000+", icon: <UsersIcon size={18}/> },
  { label: "Happy Clients", val: "1M+", icon: <Award size={18}/> },
  { label: "Safety Rate", val: "99.9%", icon: <Shield size={18}/> },
];

const steps = [
  { icon: PackageCheck, t: "Book Online", d: "Fill details in our intuitive dashboard within seconds." },
  { icon: Truck, t: "Quick Pickup", d: "Professional riders collect from your doorstep safely." },
  { icon: CheckCircle2, t: "Safe Handover", d: "OTP verified delivery at the recipient's doorstep." }
];

const features = [
  { 
    title: "Maximum Security", 
    desc: "Every parcel is scanned at 5+ transit points with real-time logging.",
    icon: <Shield className="text-blue-600" />,
    span: "lg:col-span-2",
    bg: "bg-white dark:bg-slate-900"
  },
  { 
    title: "Live GPS", 
    desc: "Satellite tracking active for every mile.",
    icon: <MapPin className="text-white" />,
    span: "lg:col-span-1",
    bg: "bg-blue-600 text-white"
  },
  { 
    title: "24/7 Support", 
    desc: "Dedicated priority support for standard users.",
    icon: <Headphones className="text-blue-400" />,
    span: "lg:col-span-1",
    bg: "bg-slate-900 text-white"
  }
];

const StandardDelivery = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <Helmet><title>Standard Delivery | ParcelGo Nationwide</title></Helmet>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-12 md:pt-24 pb-16 md:pb-32 overflow-hidden bg-white dark:bg-slate-900/40">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest mb-6 border border-blue-100">
              <Truck size={14} /> Nationwide Logistics Network
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 leading-[1.1] tracking-tighter">
              Reliable Shipping <br/><span className="text-blue-600">Everyday.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-500 dark:text-slate-400 text-base md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
              The most trusted standard delivery network in Bangladesh. Balancing cost and efficiency across all 64 districts.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/dashboard/sender/create')} size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-10 h-14 md:h-16 font-black shadow-xl shadow-blue-200 transition-all active:scale-95">
                Start Shipping Now
              </Button>
              <Button onClick={() => navigate('/calculate-rate')} variant="outline" size="lg" className="rounded-2xl px-10 h-14 md:h-16 font-black border-2 transition-all active:scale-95">
                <Calculator className="mr-2" size={20} /> Calculate Rate
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden lg:block">
            <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
              className="relative rounded-[3rem] shadow-3xl border-8 border-white dark:border-slate-800 object-cover h-[550px] w-full" 
              alt="Logistics" 
            />
          </motion.div>
        </div>
      </section>

      {/* --- 2. STATS BAR --- */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
          {stats.map((stat, i) => (
            <div key={i} className="group cursor-default">
              <div className="flex justify-center mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
              <div className="text-2xl md:text-4xl font-black mb-1 tracking-tighter">{stat.val}</div>
              <div className="text-blue-100 text-[10px] md:text-xs font-black uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. THE PROCESS --- */}
      <section className="py-16 md:py-32 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Simple 3-Step Process</h2>
          <p className="text-slate-500 font-medium">From booking to doorstep, we've optimized every second for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div whileHover={{ y: -10 }} key={i} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center relative shadow-sm hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-200">
                <step.icon size={30} />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{step.t}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{step.d}</p>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-lg">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 4. CORE FEATURES --- */}
      <section className="py-16 md:py-32 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card key={i} className={`${f.span} ${f.bg} p-8 md:p-12 rounded-[2.5rem] border-none flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group`}>
                <div className="mb-10">{f.icon}</div>
                <div>
                   <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">{f.title}</h3>
                   <p className="opacity-70 text-sm font-medium leading-relaxed">{f.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. PREMIUM CTA SECTION --- */}
      <section className="py-20 md:py-40 container mx-auto px-6">
        <div className="bg-slate-900 dark:bg-blue-600 rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10">
             <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">Ready to Ship?</h2>
             <p className="text-slate-400 dark:text-blue-100 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">Experience the balance of speed and reliability with Bangladesh's #1 logistics network.</p>
             <Button onClick={() => navigate('/register')} size="lg" className="bg-blue-600 dark:bg-white text-white dark:text-blue-600 hover:scale-105 rounded-2xl px-12 h-16 md:h-20 text-lg md:text-xl font-black transition-all active:scale-95 shadow-2xl">
                Create First Parcel <ArrowRight className="ml-3" />
             </Button>
          </div>
          <Globe2 size={600} className="absolute -left-40 -bottom-40 opacity-5 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default StandardDelivery;