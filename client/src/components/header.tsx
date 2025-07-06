import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Users, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Staff", href: "/staff" },
    { name: "About", href: "/about" },
    { name: "Join Us", href: "/join-us" },
    { name: "Staff Portal", href: "/staff-portal" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Users className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold text-dark">NORTH STAFF</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                    location === item.href 
                      ? "text-primary" 
                      : "text-medium hover:text-primary"
                  )}>
                    {item.name}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <Button className="bg-primary text-white hover:bg-secondary">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className={cn(
                    "block px-3 py-2 font-medium cursor-pointer",
                    location === item.href 
                      ? "text-primary" 
                      : "text-medium hover:text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                className="w-full mt-4 mx-3 bg-primary text-white hover:bg-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
