/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { 
  Facebook, Twitter, Instagram, Github, Linkedin, 
  Mail, MapPin, Phone, Truck, ChevronRight, 
  ShieldCheck, Globe2, Activity 
} from "lucide-react";
import logo from "@/assets/logo/logo.png";

// --- DYNAMIC DATA ARRAYS ---
const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Track Parcel", path: "/track" },
  { name: "Coverage Area", path: "/districts" },
];

const serviceLinks = [
  { name: "Standard Delivery", path: "/services/standard" },
  { name: "Express Plus", path: "/services/express" },
  { name: "Global Shipping", path: "/services/global" },
  { name: "Merchant Solutions", path: "/register" },
  { name: "Corporate Logistics", path: "/services" },
];

const socialLinks = [
  { icon: Facebook, color: "hover:text-blue-600", path: "https://facebook.com" },
  { icon: Twitter, color: "hover:text-sky-400", path: "https://twitter.com" },
  { icon: Instagram, color: "hover:text-pink-500", path: "https://instagram.com" },
  { icon: Linkedin, color: "hover:text-blue-700", path: "https://linkedin.com" },
  { icon: Github, color: "hover:text-slate-900 dark:hover:text-white", path: "https://github.com" },
];

const contactInfo = [
  { icon: MapPin, text: "Plot 15, Block B, Banani, Dhaka 1213", label: "Head Office" },
  { icon: Phone, text: "+880 1234 567 890", label: "Support Line" },
  { icon: Mail, text: "support@parcelgo.com", label: "Official Email" },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-20 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* --- TOP GRID: MAIN CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200 dark:shadow-none transition-transform group-hover:scale-105">
                <img src={logo} alt="P" className="h-6 w-auto brightness-0 invert" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                Parcel<span className="text-blue-600">Go</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Revolutionizing nationwide logistics with AI-powered routing and real-time satellite tracking. Delivering trust, one parcel at a time.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} href={social.path} target="_blank" rel="noreferrer" 
                  className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 transition-all ${social.color} hover:scale-110 border border-transparent hover:border-slate-100 dark:hover:border-slate-800`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="group flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">
                    <ChevronRight size={14} className="mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Solutions</h3>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="group flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">
                    <ChevronRight size={14} className="mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="space-y-8">
            <div>
               <h3 className="text-slate-900 dark:text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Connect</h3>
               <div className="space-y-5">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                          <info.icon size={16} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{info.label}</p>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{info.text}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

        </div>

        {/* --- MIDDLE BAR: TRUST INDICATORS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-y border-slate-50 dark:border-slate-900">
           {[
             { i: <ShieldCheck/>, t: "Verified Handover", d: "OTP Based Delivery System" },
             { i: <Activity/>, t: "Live Tracking", d: "Satellite Linked Fleet Monitor" },
             { i: <Globe2/>, t: "Global Network", d: "Connecting 200+ Countries" }
           ].map((item, idx) => (
             <div key={idx} className="flex items-center gap-4 justify-center md:justify-start grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <div className="text-blue-600">{item.i}</div>
                <div><p className="text-xs font-black uppercase tracking-widest">{item.t}</p><p className="text-[10px] text-slate-400 font-bold">{item.d}</p></div>
             </div>
           ))}
        </div>

        {/* --- BOTTOM BAR: LEGAL & COPYRIGHT --- */}
        <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400">
            © {new Date().getFullYear()} <span className="text-blue-600">ParcelGo Logistics Ltd.</span> All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link to="/terms" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Terms</Link>
            <Link to="/privacy" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Privacy</Link>
            <Link to="/faq" className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Cookies</Link>
          </div>
        </div>

      </div>
      
      {/* Decorative Gradient Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
    </footer>
  );
};

export default Footer;