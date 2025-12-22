/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, MapPin, Weight, Zap, Info, ArrowLeft, Truck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const districts = ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Tangail", "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira", "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati", "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet", "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Sherpur", "Mymensingh"].sort();

const CalculateRate = () => {
  const navigate = useNavigate();
  const [dest, setDest] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState("Standard");
  const [result, setResult] = useState<number | null>(null);

  const handleCalc = () => {
    if (!dest || !weight) return toast.error("Please fill all fields!");
    const w = parseFloat(weight);
    if (w <= 0) return toast.error("Weight must be greater than 0");

    let base = dest === "Dhaka" ? 60 : 120;
    if (type === "Express") base += 80; 
    
    setResult(base * w);
    toast.success("Rate calculated!");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-10 md:py-24 overflow-x-hidden">
      <Helmet><title>Rate Estimator | ParcelGo Logistics</title></Helmet>
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Back Button */}
        <Button onClick={() => navigate(-1)} variant="ghost" className="mb-6 md:mb-8 gap-2 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full px-4">
          <ArrowLeft size={18} /> <span className="hidden sm:inline">Back to Previous</span>
        </Button>

        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200 dark:shadow-none"
          >
            <Calculator size={32} className="md:w-10 md:h-10" />
          </motion.div>
          <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-3 md:mb-4 text-slate-900 dark:text-white">
            Cost <span className="text-blue-600">Estimator</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Get an instant precise quote for your shipment across Bangladesh.
          </p>
        </div>

        {/* Main Grid: Responsive Column Swap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Form Card */}
          <Card className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-none shadow-2xl bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            <div className="space-y-6 md:space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                  <MapPin size={14} className="text-blue-600" /> Destination District
                </label>
                <Select onValueChange={setDest}>
                  <SelectTrigger className="h-14 rounded-2xl border-none bg-white dark:bg-slate-800 font-bold shadow-sm">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {districts.map(d => <SelectItem key={d} value={d} className="font-medium">{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                  <Weight size={14} className="text-blue-600" /> Parcel Weight (KG)
                </label>
                <Input 
                  type="number" placeholder="e.g. 2.5" 
                  className="h-14 rounded-2xl border-none bg-white dark:bg-slate-800 font-bold text-lg shadow-sm"
                  value={weight} onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Delivery Speed</label>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <button 
                    onClick={() => setType("Standard")}
                    className={`h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-xs md:text-sm ${type === "Standard" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white dark:bg-slate-800 text-slate-500"}`}
                  >
                    <Truck size={16} /> Standard
                  </button>
                  <button 
                    onClick={() => setType("Express")}
                    className={`h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-xs md:text-sm ${type === "Express" ? "bg-amber-500 text-white shadow-lg shadow-amber-200" : "bg-white dark:bg-slate-800 text-slate-500"}`}
                  >
                    <Zap size={16} /> Express
                  </button>
                </div>
              </div>

              <Button onClick={handleCalc} size="lg" className="w-full h-16 rounded-2xl bg-slate-900 dark:bg-blue-600 font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                Calculate Now
              </Button>
            </div>
            <Calculator size={300} className="absolute -left-20 -bottom-20 opacity-[0.03] text-slate-900 pointer-events-none" />
          </Card>

          {/* Result Card: Dynamic and Responsive */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {result !== null ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] bg-blue-600 text-white border-none text-center shadow-3xl relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">Estimated Total</p>
                      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                        <span className="text-6xl md:text-9xl font-black tracking-tighter leading-none">{result.toFixed(0)}</span>
                        <span className="text-xl md:text-3xl font-bold opacity-60">BDT</span>
                      </div>
                      
                      <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 space-y-3 md:space-y-4">
                        <div className="flex justify-between text-xs md:text-sm font-bold opacity-80">
                          <span className="uppercase tracking-widest">Base Rate ({dest})</span>
                          <span>{dest === "Dhaka" ? 60 : 120} BDT</span>
                        </div>
                        <div className="flex justify-between text-xs md:text-sm font-bold opacity-80">
                          <span className="uppercase tracking-widest">Speed Multiplier</span>
                          <span>{type}</span>
                        </div>
                      </div>

                      <Button onClick={() => navigate('/register')} className="mt-8 md:mt-12 w-full bg-white text-blue-600 hover:bg-blue-50 h-14 rounded-2xl font-black text-sm md:text-base transition-transform active:scale-95 shadow-xl">
                        Proceed to Booking
                      </Button>
                    </div>
                    {/* Background Decorative Icon */}
                    <Truck size={400} className="absolute -left-20 -bottom-20 opacity-10 pointer-events-none rotate-12" />
                  </Card>
                </motion.div>
              ) : (
                <Card className="p-10 md:p-16 h-[300px] md:h-full flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-50/50 dark:bg-slate-900/20">
                  <Info size={40} className="text-slate-200 dark:text-slate-800 mb-4" />
                  <p className="text-slate-400 font-black uppercase text-[10px] md:text-xs tracking-widest leading-relaxed">
                    Fill the form to see <br/> instant shipping rates
                  </p>
                </Card>
              )}
            </AnimatePresence>

            {/* Disclaimer Box */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-5 md:p-6 rounded-3xl flex gap-4 items-start"
            >
              <Zap className="text-amber-600 shrink-0" size={20} />
              <p className="text-[10px] md:text-xs text-amber-800 dark:text-amber-500 leading-relaxed font-bold uppercase tracking-wide">
                * Rates are estimates. Actual pricing may vary based on exact parcel dimensions and insurance for high-value electronics.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CalculateRate;