import { Truck, CheckCircle2, MapPin, Shield, PackageCheck, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StandardDelivery = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-white dark:bg-slate-900/40">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">
              <Truck size={14} /> Nationwide Logistics
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1]">
              Reliable Shipping <br/><span className="text-blue-600">Everyday.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
              The most trusted standard delivery network in Bangladesh. We balance cost and efficiency to provide you with a seamless shipping experience across all 64 districts.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-xl px-10 h-14 font-bold shadow-lg shadow-blue-200 dark:shadow-none">
                <Link to="/dashboard/sender/create">Start Shipping Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl px-10 h-14 font-bold border-2">
                Calculate Rate
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
              className="relative rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-800 object-cover h-[500px] w-full" 
              alt="Standard Delivery" 
            />
          </motion.div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="py-12 bg-blue-600">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {[
            { label: "Districts Covered", val: "64/64" },
            { label: "Active Riders", val: "5,000+" },
            { label: "Happy Clients", val: "1M+" },
            { label: "Safe Delivery Rate", val: "99.9%" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-black mb-1">{stat.val}</div>
              <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black mb-4">Simple 3-Step Process</h2>
          <p className="text-slate-500">Shipping shouldn't be complicated. Here is how we handle your parcels.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" />
          {[
            { icon: PackageCheck, t: "Book Your Parcel", d: "Fill out the sender and receiver details via our easy dashboard." },
            { icon: Truck, t: "Doorstep Pickup", d: "Our rider will arrive at your location to collect the package safely." },
            { icon: CheckCircle2, t: "Safe Delivery", d: "The parcel is sorted and delivered to the recipient within 3-5 days." }
          ].map((step, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200 dark:shadow-none">
                <step.icon size={30} />
              </div>
              <h3 className="text-xl font-extrabold mb-4">{step.t}</h3>
              <p className="text-slate-500 leading-relaxed">{step.d}</p>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features - Bento Grid Style */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <Shield className="text-blue-600 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-4">Maximum Security Guarantee</h3>
              <p className="text-slate-500">Every parcel in our standard network is scanned at every transit point. We provide insurance options for valuable goods and ensure professional handling for fragile items.</p>
            </div>
            <div className="bg-blue-600 p-10 rounded-[2rem] text-white flex flex-col justify-between shadow-xl">
               <MapPin size={40} />
               <div>
                 <h3 className="text-2xl font-bold mb-2">Live Tracking</h3>
                 <p className="text-blue-100 text-sm">Real-time GPS updates for every movement.</p>
               </div>
            </div>
            <div className="bg-slate-900 p-10 rounded-[2rem] text-white flex flex-col justify-between">
               <Headphones size={40} className="text-blue-400" />
               <div>
                 <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                 <p className="text-slate-400 text-sm">Always here to help with your shipment queries.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32" />
          <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to ship your first parcel?</h2>
          <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">Join thousands of businesses and individuals who trust ParcelGo for their daily shipping needs.</p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100 rounded-full px-12 h-16 text-lg font-black">
            <Link to="/dashboard/sender/create">Create Shipment Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default StandardDelivery;