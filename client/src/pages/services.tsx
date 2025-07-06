import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Martini, Volume2, Handshake, Shield, Users, Settings, Zap, Clock, ShoppingBag, Check } from "lucide-react";

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
      "Personal License holders",
      "Food Hygiene Level 2 certified"
    ],
    baseRate: 18,
    category: "bar-staff"
  },
  {
    icon: Volume2,
    title: "Sound Technicians",
    description: "Expert audio engineers and sound technicians for flawless event audio.",
    features: [
      "City & Guilds Audio Engineering qualified",
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
  },
  {
    icon: Shield,
    title: "Stewards",
    description: "Qualified crowd management and safety personnel for safe events.",
    features: [
      "NVQ Level 2 Spectator Safety qualified",
      "Crowd control and management",
      "Health & Safety compliance",
      "Emergency procedures training",
      "First Aid certified staff available",
      "Experience with music festivals",
      "Event risk assessment support",
      "Professional uniform provided"
    ],
    baseRate: 14,
    category: "steward"
  },
  {
    icon: Shield,
    title: "Security",
    description: "Licensed security professionals for comprehensive event safety.",
    features: [
      "SIA licensed operatives (Door Supervision/CCTV)",
      "Door supervision specialists",
      "CCTV monitoring and surveillance",
      "Close protection services",
      "Conflict resolution training",
      "Emergency response protocols",
      "Event security planning",
      "Physical fitness requirements met"
    ],
    baseRate: 22,
    category: "security"
  },
  {
    icon: Settings,
    title: "Riggers / Stage Setup",
    description: "Certified rigging and stage construction specialists for safe setups.",
    features: [
      "PASMA/IPAF certification holders",
      "Working at Height qualifications",
      "Stage construction and rigging",
      "Equipment installation and removal",
      "Safety inspection and compliance",
      "Heavy lifting and manual handling",
      "Structural assembly expertise",
      "Festival and concert experience"
    ],
    baseRate: 28,
    category: "rigger"
  },
  {
    icon: Zap,
    title: "Lighting Technicians",
    description: "Qualified lighting specialists for atmosphere and safety lighting.",
    features: [
      "City & Guilds Electrical qualified",
      "PAT Testing certified",
      "Lighting design and programming",
      "LED and conventional lighting systems",
      "DMX control and operation",
      "Emergency lighting compliance",
      "Concert and festival experience",
      "Equipment maintenance knowledge"
    ],
    baseRate: 24,
    category: "lighting-technician"
  },
  {
    icon: Clock,
    title: "Production Managers",
    description: "Experienced coordinators for seamless event execution and management.",
    features: [
      "Event Management qualifications preferred",
      "Multi-team coordination experience",
      "Timeline and schedule management",
      "Problem-solving and decision making",
      "Budget oversight capabilities",
      "Vendor and supplier coordination",
      "Risk management experience",
      "Strong communication skills"
    ],
    baseRate: 35,
    category: "production-manager"
  },
  {
    icon: Users,
    title: "Backstage Crew",
    description: "Reliable support staff for behind-the-scenes operations and logistics.",
    features: [
      "Manual handling training",
      "Equipment setup and breakdown",
      "Artist and performer assistance",
      "Backstage area management",
      "Equipment transportation",
      "General event logistics support",
      "Flexible and adaptable approach",
      "Previous event experience"
    ],
    baseRate: 16,
    category: "backstage-crew"
  },
  {
    icon: ShoppingBag,
    title: "Merchandise Staff",
    description: "Sales professionals for merchandise and retail operations at events.",
    features: [
      "Retail sales experience",
      "Cash handling and POS systems",
      "Customer service excellence",
      "Inventory management",
      "Product knowledge development",
      "Sales target achievement",
      "Queue management skills",
      "End-of-day reconciliation"
    ],
    baseRate: 14,
    category: "merchandise"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <title>Our Services - NORTH STAFF</title>
      <meta name="description" content="Comprehensive music event staffing across all categories - bar staff, sound technicians, security, riggers, lighting technicians, production managers, backstage crew, stewards, brand ambassadors, and merchandise staff across the North of England." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Music Event Staffing
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Your one stop shop for professional music event staff across the North of England. 
              Fair rates, fast response, full UK regulatory compliance across all categories.
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
                  <Card className="bg-gray-50 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <service.icon className="w-12 h-12 text-primary mr-4" />
                        <div>
                          <h2 className="text-3xl font-bold text-dark">{service.title}</h2>
                          <p className="text-2xl font-bold text-primary mt-2">From £{service.baseRate}/hour</p>
                        </div>
                      </div>
                      <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <img 
                    src={`https://images.unsplash.com/photo-${getServiceImage(service.category)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`} 
                    alt={`${service.title} professionals at work`} 
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose NORTH STAFF?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive music event staffing solutions with full UK regulatory compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">Fair & Affordable</h3>
                <p className="text-gray-600">Competitive rates that provide fair compensation for staff while remaining affordable for event organisers.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">Fast Response</h3>
                <p className="text-gray-600">Expedited staffing process with quick turnaround times for urgent music event requirements.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg text-center">
              <CardContent className="p-8">
                <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">Fully Compliant</h3>
                <p className="text-gray-600">All staff hold relevant UK qualifications and certifications required by law for their respective roles.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Staff Your Event?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get in touch today for a free quote. We'll match you with the perfect team for your music event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Get Free Quote
              </Button>
            </Link>
            <Link href="/staff-portal">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                Staff Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function getServiceImage(category: string): string {
  const imageMap: { [key: string]: string } = {
    "bar-staff": "1514933377-03dcf7cd48eb",
    "sound-technician": "1493225457124-60c1ad8b3b6b",
    "brand-ambassador": "1556745757-19fc8ad91e9b",
    "steward": "1511795409834-ef04bbd61622",
    "security": "1571019613454-1cb2f99b2d84",
    "rigger": "1581094271901-8022df4466f2",
    "lighting-technician": "1516450360452-9312f5e906db",
    "production-manager": "1556157382-d5a75bbea47e",
    "backstage-crew": "1493225457124-60c1ad8b3b6b",
    "merchandise": "1556745730-dd4a01c7edd9"
  };
  return imageMap[category] || "1511795409834-ef04bbd61622";
}