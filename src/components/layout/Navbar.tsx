/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  Sun, Moon, User, LogOut, Menu, X, 
  ShieldCheck, Truck, 
  MapPin, LayoutDashboard, Globe, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";

import type { RootState } from "@/app/store";
import { clearAuth } from "@/features/auth/authSlice";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import logo from "@/assets/logo/logo.png";
import { useTheme } from "../hooks/useTheme";
import { cn } from "@/lib/utils";

// --- Theme Toggle Component ---
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.info('Logged out from ParcelGo');
    navigate('/login', { replace: true });
  };

  const getDashboardLink = () => {
    const role = user?.role?.toLowerCase();
    return role ? `/dashboard/${role}` : '/dashboard';
  };

  // --- Services Data with Custom Routes ---
  const services = [
    { 
      title: "Standard Delivery", 
      desc: "Reliable shipping within 3-5 days.", 
      icon: Truck, 
      color: "text-blue-500",
      href: "/services/standard" 
    },
    { 
      title: "Express Plus", 
      desc: "Urgent delivery within 24 hours.", 
      icon: ShieldCheck, 
      color: "text-green-500",
      href: "/services/express" 
    },
    { 
      title: "Global Shipping", 
      desc: "Send parcels across 200+ countries.", 
      icon: Globe, 
      color: "text-purple-500",
      href: "/services/global" 
    },
    { 
      title: "Smart Tracking", 
      desc: "Real-time updates via satellite.", 
      icon: MapPin, 
      color: "text-orange-500",
      href: "/track" // ✅ Smart Tracking এখন সরাসরি /track এ নিয়ে যাবে
    },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-2 shadow-sm" 
          : "bg-background py-4"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        
        {/* --- LEFT: LOGO --- */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200 dark:shadow-none">
            <img src={logo} alt="ParcelGo" className="h-7 w-auto brightness-0 invert" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            Parcel<span className="text-blue-600">Go</span>
          </span>
        </Link>

        {/* --- CENTER: DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              
              <NavigationMenuItem>
                <Link to="/" className={cn(navigationMenuTriggerStyle(), "font-semibold")}>Home</Link>
              </NavigationMenuItem>

              {/* Mega Menu: Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-slate-700 dark:text-slate-200">
                  Our Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[450px] gap-3 p-4 md:w-[550px] md:grid-cols-2 lg:w-[650px] bg-white dark:bg-slate-900 shadow-2xl rounded-2xl">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link 
                          className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 no-underline outline-none focus:shadow-md transition-all hover:scale-[0.98]" 
                          to="/services/standard"
                        >
                          <Truck className="h-10 w-10 text-white mb-4" />
                          <div className="mb-2 mt-4 text-xl font-bold text-white leading-tight">Fastest Delivery in Bangladesh</div>
                          <p className="text-sm leading-tight text-white/90">Supporting businesses and individuals with top-tier logistics since 2023.</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {services.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link 
                            to={item.href} // ✅ প্রতিটি আইটেমের জন্য আলাদা রাউট
                            className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                              <item.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", item.color)} />
                              {item.title}
                              <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-slate-500 dark:text-slate-400 mt-1">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/track" className={cn(navigationMenuTriggerStyle(), "font-semibold")}>Track Parcel</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>About</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>Contact</Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* --- RIGHT: ACTIONS (Theme + Auth) --- */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* User Auth Section */}
          <div className="hidden sm:flex items-center border-l pl-3 ml-1 gap-3">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-blue-100 dark:ring-blue-900/30">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                      <AvatarFallback className="bg-blue-600 text-white font-bold">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 p-2 rounded-xl shadow-2xl border-slate-100 dark:border-slate-800" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-bold leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-slate-500">{user.email}</p>
                      <span className="inline-flex w-fit px-2 py-0.5 mt-2 rounded-full text-[10px] bg-blue-100 text-blue-700 font-bold dark:bg-blue-900/40">{user.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="p-3 cursor-pointer rounded-lg">
                    <Link to={getDashboardLink()} className="flex items-center">
                      <LayoutDashboard className="mr-3 h-4 w-4 text-slate-500" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-3 cursor-pointer rounded-lg">
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-3 h-4 w-4 text-slate-500" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="p-3 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 rounded-lg"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="font-bold">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold px-5 rounded-full shadow-lg shadow-blue-200 dark:shadow-none">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION DRAWER --- */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b animate-in slide-in-from-top duration-300 shadow-xl">
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-4">
            <Link to="/" onClick={()=>setMobileMenuOpen(false)} className="text-lg font-bold">Home</Link>
            
            {/* Mobile Services List */}
            <div className="flex flex-col gap-3 border-t pt-4">
              <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Our Services</span>
              {services.map((s) => (
                <Link key={s.href} to={s.href} onClick={()=>setMobileMenuOpen(false)} className="flex items-center gap-3 text-md font-medium text-slate-600 dark:text-slate-300">
                  <s.icon className={cn("h-4 w-4", s.color)} /> {s.title}
                </Link>
              ))}
            </div>

            <Link to="/about" onClick={()=>setMobileMenuOpen(false)} className="text-lg font-bold border-t pt-4">About Us</Link>
            <Link to="/contact" onClick={()=>setMobileMenuOpen(false)} className="text-lg font-bold border-t pt-4 border-b pb-4">Contact</Link>
            
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button asChild variant="outline" className="w-full rounded-xl"><Link to="/login">Login</Link></Button>
                <Button asChild className="w-full bg-blue-600 rounded-xl"><Link to="/register">Register</Link></Button>
              </div>
            ) : (
              <Button asChild variant="secondary" className="w-full rounded-xl shadow-md"><Link to={getDashboardLink()}>Go to Dashboard</Link></Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}