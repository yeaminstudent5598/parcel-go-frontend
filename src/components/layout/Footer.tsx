// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import logo from "@/assets/logo/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t mt-10 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="ParcelGo Logo" className="h-8 w-8"/>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">ParcelGo</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            A smart way to send, track, and receive your parcels with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500 dark:hover:text-blue-400">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 dark:hover:text-blue-400">Contact</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-500 dark:hover:text-blue-400">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-600 dark:text-gray-300">
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400">
              <Facebook size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-blue-400 dark:hover:text-blue-300">
              <Twitter size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-pink-500 dark:hover:text-pink-400">
              <Instagram size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-gray-800 dark:hover:text-gray-200">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
          © {new Date().getFullYear()} ParcelGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
