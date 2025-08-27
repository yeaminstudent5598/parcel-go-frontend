// src/components/layout/Navbar.tsx
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { clearAuth } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import logo from "@/assets/logo/logo.png";

// Navigation links
const navigationLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/dashboard", label: "Dashboard", authOnly: true },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

const handleLogout = () => {
  dispatch(clearAuth()); // Clears state, localStorage & cookies
  toast.info('Logged out successfully');
  navigate('/login', { replace: true });
};


  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks
                    .filter((link) => !link.authOnly || isAuthenticated)
                    .map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavLink
                          to={link.to}
                          className={({ isActive }) =>
                            `block py-1.5 w-full ${
                              isActive
                                ? "text-primary font-semibold"
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
            </PopoverContent>
          </Popover>

          {/* Logo + Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <img
                  src={logo}
                  alt="ParcelGo Logo"
                  className="h-10 w-auto" // height ঠিক রাখবে, width auto
                />
            </Link>
            {/* Desktop navigation */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks
                  .filter((link) => !link.authOnly || isAuthenticated)
                  .map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `py-1.5 font-medium ${
                            isActive
                              ? "text-primary"
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
        </div>

        {/* Right side (Auth buttons / User info) */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <Button
                variant="destructive"
                size="sm"
                className="text-sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
