import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Truck, Zap, Briefcase, Plane, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const allServices = [
  { id: 1, title: 'Standard Delivery', icon: <Truck size={40} className="text-blue-500" />, desc: 'Economical nationwide shipping within 3-5 days. Perfect for daily needs.', price: 'Starts from 60 BDT' },
  { id: 2, title: 'Express Plus', icon: <Zap size={40} className="text-yellow-500" />, desc: 'Urgent delivery within 24 hours in all major metro cities.', price: 'Starts from 150 BDT' },
  { id: 3, title: 'Corporate Logistics', icon: <Briefcase size={40} className="text-purple-500" />, desc: 'End-to-end supply chain management for large scale businesses.', price: 'Custom Pricing' },
  { id: 4, title: 'Global Air Freight', icon: <Plane size={40} className="text-cyan-500" />, desc: 'Fastest international export-import solutions to 200+ countries.', price: 'International Rates' },
  { id: 5, title: 'Secure Handling', icon: <ShieldCheck size={40} className="text-green-500" />, desc: 'Special care for fragile items with full insurance coverage.', price: 'Base + 1% Insurance' },
  { id: 6, title: '24/7 Priority Support', icon: <Headphones size={40} className="text-rose-500" />, desc: 'Get a dedicated manager to handle all your shipping queries.', price: 'Free for Business' },
];

const AllServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20">
      <Helmet><title>Our Services | ParcelGo Logistics</title></Helmet>
      
      <div className="container mx-auto px-6 text-center mb-20">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-6">
          Comprehensive <span className="text-blue-600">Solutions</span>
        </motion.h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          From local doorstep delivery to global air freight, we provide professional logistics services for everyone.
        </p>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allServices.map((service) => (
          <motion.div key={service.id} whileHover={{ y: -10 }}>
            <Card className="p-10 h-full border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all rounded-[2.5rem] bg-white dark:bg-slate-900">
              <div>
                <div className="mb-8">{service.icon}</div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{service.desc}</p>
              </div>
              <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600">{service.price}</span>
                    <Button onClick={() => navigate('/dashboard/sender/create')} variant="ghost" size="sm" className="font-bold gap-2 hover:text-blue-600">
                       Book <ArrowRight size={16} />
                    </Button>
                 </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;