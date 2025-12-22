/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Target, Eye,  
  ArrowLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CompanyOverview = () => {
  const navigate = useNavigate();

  const milestones = [
    { year: "2023", title: "Inception", desc: "Started with a vision to digitize Bangladesh's supply chain." },
    { year: "2024", title: "Nationwide Coverage", desc: "Expanded operations to all 64 districts within 12 months." },
    { year: "2025", title: "Elite Tech Integration", desc: "Launched AI-powered routing and satellite tracking system." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 md:py-24">
      <Helmet><title>Company Overview | ParcelGo Logistics Ltd.</title></Helmet>

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back Button */}
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-8 gap-2 font-bold text-slate-500">
          <ArrowLeft size={18} /> Back
        </Button>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                Redefining the <br/> <span className="text-blue-600">Supply Chain.</span>
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8">
                ParcelGo Logistics Ltd. is a premier end-to-end logistics service provider in Bangladesh. We combine technology, speed, and safety to deliver excellence at every doorstep.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100">
                  <p className="text-3xl font-black text-blue-600">5k+</p>
                  <p className="text-xs font-bold uppercase text-slate-400">Active Riders</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100">
                  <p className="text-3xl font-black text-blue-600">1M+</p>
                  <p className="text-xs font-bold uppercase text-slate-400">Parcels Handled</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-full" />
             <img 
               src="https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1000" 
               className="relative rounded-[3rem] shadow-2xl border-8 border-white dark:border-slate-800" 
               alt="Corporate Office" 
             />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
           <Card className="p-10 rounded-[2.5rem] bg-slate-900 text-white border-none shadow-xl">
              <Target className="text-blue-500 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4 italic">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">To empower businesses and individuals through seamless, transparent, and technology-driven logistics solutions across every corner of the nation.</p>
           </Card>
           <Card className="p-10 rounded-[2.5rem] bg-blue-600 text-white border-none shadow-xl">
              <Eye className="text-white mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4 italic">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">To be the most trusted and efficient logistics network in South Asia, setting global standards in delivery safety and customer satisfaction.</p>
           </Card>
        </div>

        {/* Timeline Milestone */}
        <div className="space-y-12">
           <h2 className="text-3xl font-black text-center uppercase tracking-tighter mb-12">Our Journey So Far</h2>
           <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 md:ml-8 pl-8 space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className="relative">
                   <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950" />
                   <p className="text-blue-600 font-black mb-1">{m.year}</p>
                   <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{m.title}</h4>
                   <p className="text-slate-500 dark:text-slate-400 font-medium">{m.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper Card if not imported
const Card = ({ children, className }: any) => <div className={`card ${className}`}>{children}</div>;

export default CompanyOverview;