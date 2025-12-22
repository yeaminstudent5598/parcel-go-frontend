/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, Scale, Globe, 
  ArrowLeft, FileCheck, Truck, HelpCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const GlobalShippingPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Scale className="text-blue-600" />,
      title: "1. Customs & Duties",
      desc: "All international shipments are subject to customs inspection. Customers are responsible for any import duties, taxes, or clearance fees levied by the destination country's government."
    },
    {
      icon: <ShieldCheck className="text-green-600" />,
      title: "2. Insurance & Liability",
      desc: "Standard global shipping includes limited liability. For high-value items, we strongly recommend purchasing our 'ParcelGo Guard' insurance which covers up to 100% of the declared value."
    },
    {
      icon: <AlertTriangle className="text-amber-600" />,
      title: "3. Prohibited Items",
      desc: "ParcelGo strictly adheres to IATA and local regulations. Items like flammable liquids, loose batteries, currency, and perishable goods are strictly prohibited in international air lanes."
    },
    {
      icon: <Truck className="text-purple-600" />,
      title: "4. Transit Times",
      desc: "Estimated delivery times (3-7 days for Air, 30-45 days for Sea) are excluding customs processing time, which varies by country. We are not liable for delays caused by customs authorities."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 md:py-24">
      <Helmet><title>Global Shipping Policy | ParcelGo</title></Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Button 
          onClick={() => navigate(-1)} 
          variant="ghost" 
          className="mb-8 gap-2 font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Global Shipping
        </Button>

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
            <Globe size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">
            Global Shipping <span className="text-blue-600">Policy</span>
          </h1>
          <p className="text-slate-500 font-medium">Last Updated: December 2025</p>
        </div>

        {/* Policy Content */}
        <div className="grid gap-8 md:gap-12">
          {sections.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-blue-100 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-black mb-3 text-slate-900 dark:text-white uppercase tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-8 rounded-[2rem] bg-blue-600 text-white text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <HelpCircle className="mx-auto mb-4 opacity-50" size={32} />
            <h3 className="text-xl font-bold mb-2">Have Questions?</h3>
            <p className="text-blue-100 mb-6 text-sm">Our expert export-import consultants are here to help you navigate global trade.</p>
            <Button onClick={() => navigate('/contact')} className="bg-white text-blue-600 hover:bg-slate-100 font-black rounded-xl px-8 h-12">
              Contact Compliance Team
            </Button>
          </div>
          <FileCheck size={200} className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default GlobalShippingPolicy;