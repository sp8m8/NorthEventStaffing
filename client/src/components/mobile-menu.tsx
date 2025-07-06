import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Our Staff", href: "/staff" },
  { name: "About", href: "/about" },
  { name: "Join Us", href: "/join-us" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [location] = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-dark">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className={cn(
                    "block px-3 py-3 rounded-lg font-medium cursor-pointer transition-colors",
                    location === item.href 
                      ? "bg-primary text-white" 
                      : "text-medium hover:bg-light hover:text-primary"
                  )}
                  onClick={onClose}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <Link href="/contact">
              <Button 
                className="w-full bg-primary text-white hover:bg-secondary"
                onClick={onClose}
              >
                Get Quote
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
