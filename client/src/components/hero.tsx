import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Your One Stop Shop for Event Staffing Up North
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Comprehensive music event staffing from bar staff and sound technicians to riggers, security, and production managers. Fair rates, fast response, fully licensed professionals across the North of England.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 w-full sm:w-auto">
                  Book Staff Now
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional event staff at work" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
