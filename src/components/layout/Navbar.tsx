// D:\yeamin student\Programming hero level 2\Assignment6\ParcelGo\src\components\layout\Navbar.tsx

import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, User, LogOut } from "lucide-react";

import type { RootState } from "@/app/store";
import { clearAuth } from "@/features/auth/authSlice";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import logo from "@/assets/logo/logo.png";
import { useTheme } from "../hooks/useTheme";
// import logoWhite from "@/assets/logo/logo-white.png"; // ডার্ক মোডের জন্য সাদা লোগো

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);


  const handleLogout = () => {
    dispatch(clearAuth());
    toast.info('Logged out successfully');
    navigate('/login', { replace: true });
  };

  // Role-based dashboard link
  const getDashboardLink = () => {
    switch (user?.role) {
      case 'SENDER':
        return '/dashboard/sender';
      case 'RECEIVER':
        return '/dashboard/receiver';
      case 'ADMIN':
        return '/dashboard/admin';
      default:
        return '/dashboard';
    }
  };

  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/features", label: "Features" }, 
    { to: "/faq", label: "FAQ" },
  ];

  const authLinks = isAuthenticated ? [{ to: getDashboardLink(), label: "Dashboard" }] : [];
  const navigationLinks = [...baseLinks, ...authLinks];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side: Logo + Main nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-primary hover:text-primary/90">
            <img
              src={logo}
              alt="ParcelGo Logo"
              className="h-10 w-auto"
            />
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `py-1.5 font-medium transition-colors ${
                        isActive
                          ? "text-primary"
                          // Note: In some setups, you might need to adjust text colors for dark mode explicitly
                          : "text-muted-foreground hover:text-primary"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side: Theme Toggle & Auth */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
