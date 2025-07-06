import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container grid lg:grid-cols-2 gap-12 items-center py-20">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Your Premier Event Staffing Partner in the North
        </h1>
        <p className="text-lg text-muted-foreground">
          From bar staff to production managers, we provide licensed professionals for music events across the North of England. Fair rates, fast response, and unparalleled service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/packages">
            <Button size="lg">View Packages</Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Get Quote
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
          alt="Professional event staff at work"
          className="rounded-xl shadow-lg w-full h-auto"
        />
      </div>
    </section>
  );
}
