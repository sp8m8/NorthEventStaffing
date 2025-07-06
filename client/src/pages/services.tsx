import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Martini, Volume2, Handshake, Check } from "lucide-react";

const services = [
  {
    icon: Martini,
    title: "Bar Staff",
    description: "Professional licensed bartenders and cocktail specialists for your events.",
    features: [
      "Fully licensed and certified bartenders",
      "Cocktail specialists and mixologists", 
      "Wine service professionals",
      "Complete bar setup and breakdown",
      "Professional uniforms provided",
      "Experience with corporate events, weddings, and festivals",
      "Reliable and punctual staff",
      "Full liability insurance"
    ],
    baseRate: 18,
    category: "bar-staff"
  },
  {
    icon: Volume2,
    title: "Sound Technicians",
    description: "Expert audio engineers and sound technicians for flawless event audio.",
    features: [
      "Certified audio engineers",
      "Live sound mixing specialists",
      "Professional equipment setup and operation",
      "Festival and concert experience",
      "Microphone and speaker management",
      "Sound system design consultation",
      "Emergency technical support",
      "Latest industry equipment knowledge"
    ],
    baseRate: 25,
    category: "sound-technician"
  },
  {
    icon: Handshake,
    title: "Brand Ambassadors",
    description: "Engaging brand representatives to promote your products and services.",
    features: [
      "Professional brand representation",
      "Product demonstration expertise",
      "Customer engagement specialists",
      "Lead generation and data collection",
      "Multilingual staff available",
      "Trade show and exhibition experience",
      "Social media content creation",
      "Sales and marketing backgrounds"
    ],
    baseRate: 16,
    category: "brand-ambassador"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <title>Our Services - NORTH STAFF</title>
      <meta name="description" content="Professional bar staff, sound technicians, brand ambassadors, stewards, and security personnel across the North of England. Licensed, experienced event professionals." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Event Staffing Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We provide experienced, professional staff for all types of events across West Yorkshire and the North of England.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="bg-light shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <service.icon className="w-12 h-12 text-primary mr-4" />
                        <div>
                          <h2 className="text-3xl font-bold text-dark">{service.title}</h2>
                          <p className="text-2xl font-bold text-primary mt-2">From £{service.baseRate}/hour</p>
                        </div>
                      </div>
                      <p className="text-lg text-medium mb-6">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start text-medium">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <Link href="/contact">
                          <Button className="w-full bg-primary text-white hover:bg-secondary">
                            Request {service.title}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      service.category === 'bar-staff' ? '1566753323558-f4e0952af115' :
                      service.category === 'sound-technician' ? '1493225457124-a3eb161ffa5f' :
                      '1494790108755-2616b612b786'
                    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`}
                    alt={service.title}
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
            Ready to Book Professional Staff?
          </h2>
          <p className="text-xl text-medium mb-8">
            Contact us today for a customized quote for your next event.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-white hover:bg-secondary px-8 py-4">
              Get Your Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
