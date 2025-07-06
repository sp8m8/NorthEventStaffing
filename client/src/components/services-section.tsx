import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Martini, Volume2, Handshake, Users, Shield, Check, Settings, Zap, Clock, ShoppingBag, Award } from "lucide-react";

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
  },
  {
    icon: Users,
    title: "Stewards",
    features: [
      "Crowd control",
      "Health & Safety",
      "Emergency procedures",
      "NVQ Level 2 qualified"
    ],
    price: "From £14/hour",
    category: "steward"
  },
  {
    icon: Shield,
    title: "Security",
    features: [
      "SIA licensed operatives",
      "Door supervision",
      "CCTV monitoring",
      "Close protection"
    ],
    price: "From £22/hour",
    category: "security"
  },
  {
    icon: Settings,
    title: "Riggers / Stage Setup",
    features: [
      "PASMA/IPAF certified",
      "Working at height",
      "Stage construction",
      "Equipment rigging"
    ],
    price: "From £28/hour",
    category: "rigger"
  },
  {
    icon: Zap,
    title: "Lighting Technicians",
    features: [
      "City & Guilds qualified",
      "PAT testing certified",
      "Lighting design",
      "Equipment setup"
    ],
    price: "From £24/hour",
    category: "lighting-technician"
  },
  {
    icon: Clock,
    title: "Production Managers",
    features: [
      "Event coordination",
      "Team management",
      "Timeline oversight",
      "Problem solving"
    ],
    price: "From £35/hour",
    category: "production-manager"
  },
  {
    icon: Users,
    title: "Backstage Crew",
    features: [
      "Equipment handling",
      "Artist assistance",
      "Setup support",
      "Event logistics"
    ],
    price: "From £16/hour",
    category: "backstage-crew"
  },
  {
    icon: ShoppingBag,
    title: "Merchandise Staff",
    features: [
      "Retail experience",
      "Cash handling",
      "Customer service",
      "Sales targets"
    ],
    price: "From £14/hour",
    category: "merchandise"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Comprehensive Music Event Staffing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your one stop shop for professional music event staff across the North of England. Fair rates, fast response, full UK regulatory compliance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <service.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-dark mb-2">{service.title}</h3>
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600 text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <p className="text-xl font-bold text-primary mb-3">{service.price}</p>
                  <Link href="/contact">
                    <Button size="sm" className="w-full bg-primary text-white hover:bg-secondary text-xs">
                      Request Quote
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
