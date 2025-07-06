import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Martini, Volume2, Handshake, Check } from "lucide-react";

const services = [
  {
    icon: Martini,
    title: "Bar Staff",
    features: [
      "Licensed bartenders",
      "Cocktail specialists",
      "Event bar setup",
      "Professional uniforms"
    ],
    price: "From £18/hour",
    category: "bar-staff"
  },
  {
    icon: Volume2,
    title: "Sound Technicians",
    features: [
      "Audio engineering",
      "Live sound mixing",
      "Equipment setup",
      "Technical support"
    ],
    price: "From £25/hour",
    category: "sound-technician"
  },
  {
    icon: Handshake,
    title: "Brand Ambassadors",
    features: [
      "Product promotion",
      "Customer engagement",
      "Event activation",
      "Lead generation"
    ],
    price: "From £16/hour",
    category: "brand-ambassador"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Staffing Services</h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            Professional, experienced staff for every type of event across West Yorkshire and the North of England
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-light shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-dark mb-4">{service.title}</h3>
                </div>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-medium">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary mb-4">{service.price}</p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary text-white hover:bg-secondary">
                      Request {service.title}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
