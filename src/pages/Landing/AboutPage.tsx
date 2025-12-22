/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Rocket, ShieldCheck, HeartHandshake, Users, 
  Target, Award, Globe2, Zap, ArrowRight,
  Facebook, Twitter, Linkedin, Github
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// --- ১. ডাইনামিক ডাটাবেজ (সহজেই পরিবর্তনযোগ্য) ---
const stats = [
  { label: "Active Districts", value: "64", icon: <Globe2 size={20}/> },
  { label: "Verified Riders", value: "5000+", icon: <Users size={20}/> },
  { label: "Successful Deliveries", value: "2.8M+", icon: <Zap size={20}/> },
  { label: "Business Partners", value: "12K+", icon: <Award size={20}/> },
];

const values = [
  { 
    title: "Unmatched Speed", 
    desc: "We leverage AI-routing to ensure your parcels take the fastest path possible.",
    icon: <Rocket className="text-blue-600" />,
    bg: "bg-blue-50 dark:bg-blue-900/20"
  },
  { 
    title: "Ironclad Security", 
    desc: "With OTP verification and RFID tagging, your parcel's safety is our priority.",
    icon: <ShieldCheck className="text-green-600" />,
    bg: "bg-green-50 dark:bg-green-900/20"
  },
  { 
    title: "Customer Centric", 
    desc: "Our support teams are available 24/7 to solve your logistics challenges.",
    icon: <HeartHandshake className="text-rose-600" />,
    bg: "bg-rose-50 dark:bg-rose-900/20"
  },
  { 
    title: "Shared Success", 
    desc: "We grow when our merchant partners grow. Your business is our business.",
    icon: <Target className="text-purple-600" />,
    bg: "bg-purple-50 dark:bg-purple-900/20"
  },
];

const team = [
  { name: "Jane Doe", role: "Chief Executive Officer", image: "https://i.pravatar.cc/150?u=jane" },
  { name: "John Smith", role: "Head of Operations", image: "https://i.pravatar.cc/150?u=john" },
  { name: "Aisha Khan", role: "Chief Technology Officer", image: "https://i.pravatar.cc/150?u=aisha" },
  { name: "Rahim Hasan", role: "Director of Logistics", image: "https://i.pravatar.cc/150?u=rahim" },
];

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <Helmet><title>About Us | ParcelGo Logistics</title></Helmet>

      {/* --- 1. PREMIUM HERO SECTION --- */}
      <section className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900/20 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
              Revolutionizing <br />
              <span className="text-blue-600">The Future</span> of Logistics.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
              ParcelGo is more than just a delivery service. We are a technology-driven logistics ecosystem built to connect every corner of Bangladesh.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <Button onClick={() => navigate('/register')} size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-2xl font-bold shadow-xl shadow-blue-200 dark:shadow-none">
                  Join Our Mission <ArrowRight className="ml-2" size={18} />
               </Button>
               <Button onClick={() => navigate('/contact')} variant="outline" size="lg" className="h-14 px-10 rounded-2xl font-bold border-2">
                  Contact Sales
               </Button>
            </div>
          </motion.div>
        </div>
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]" />
      </section>

      {/* --- 2. IMPACT STATS --- */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-center text-blue-600 mb-2">{s.icon}</div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white">{s.value}</h2>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. OUR STORY SECTION --- */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-blue-600 underline underline-offset-8">Our Journey</h2>
            <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed">
               <p>
                 Founded in 2023, ParcelGo emerged from a simple observation: the digital economy of Bangladesh was growing faster than its logistics infrastructure could handle.
               </p>
               <p>
                 We started with 5 riders in Dhaka and a dream to unify the nation's supply chain. Today, we manage a massive fleet powered by proprietary satellite tracking technology, serving as the backbone for thousands of e-commerce entrepreneurs.
               </p>
               <p>
                 Our goal is to reach every household in all 64 districts, providing not just delivery, but a promise of reliability and care.
               </p>
            </div>
          </motion.div>
          <div className="relative group">
             <div className="absolute inset-0 bg-blue-600 rounded-[4rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500" />
             <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000" 
              alt="Team Work" 
              className="relative rounded-[4rem] shadow-2xl border-8 border-white dark:border-slate-800" 
            />
          </div>
        </div>
      </section>

      {/* --- 4. OUR CORE VALUES GRID --- */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
             <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Values That <span className="text-blue-600">Define Us</span></h2>
             <p className="text-slate-500 font-medium">These principles guide every single delivery we make across the country.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} whileHover={{ y: -10 }}>
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all rounded-[2.5rem] bg-white dark:bg-slate-900 p-8">
                  <div className={`${v.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-8`}>
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-black mb-4">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. MEET THE LEADERSHIP TEAM --- */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
           <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">The Leadership</h2>
           <p className="text-slate-500 font-medium">Experts dedicated to transforming logistics in Bangladesh.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="group">
              <Card className="text-center border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden group-hover:border-blue-600 transition-all duration-500">
                <CardContent className="p-8">
                  <Avatar className="h-32 w-32 mx-auto mb-6 ring-4 ring-slate-50 dark:ring-slate-800 transition-all group-hover:ring-blue-100">
                    <AvatarImage src={member.image} />
                    <AvatarFallback className="font-bold">{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-black mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6">{member.role}</p>
                  
                  {/* Social Links for Team */}
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Linkedin size={16}/></Button>
                     <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Twitter size={16}/></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 6. CAREERS CTA (Final Section) --- */}
      <section className="py-32 container mx-auto px-6">
         <Card className="bg-slate-900 dark:bg-blue-600 p-12 md:p-20 rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative border-none">
            <div className="relative z-10 max-w-xl">
               <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight">Be a Part of Our Growing Story.</h2>
               <p className="text-slate-400 dark:text-blue-100 mb-10 text-lg font-medium">We are always looking for passionate riders, developers, and logistics experts. Join the revolution today.</p>
               <Button onClick={() => navigate('/contact')} size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-16 px-12 rounded-2xl font-black text-lg">
                  See Open Positions
               </Button>
            </div>
            <Users size={400} className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none" />
         </Card>
      </section>

    </div>
  );
};

export default AboutPage;