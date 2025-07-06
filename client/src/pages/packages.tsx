import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Star, Crown, Zap, Users, Music, Calendar, Phone } from "lucide-react";

const packages = [
  {
    id: "starter",
    name: "Starter Package",
    icon: Users,
    subtitle: "Perfect for intimate events",
    description: "Ideal for small venues, private parties, and intimate music events up to 100 guests",
    price: "From £180",
    duration: "per event (min 6 hours)",
    savings: "Save 15%",
    features: [
      "2x Bar Staff (certified)",
      "1x Sound Technician", 
      "1x Security/Steward",
      "Event coordination support",
      "Professional uniforms",
      "Basic liability insurance",
      "Setup and breakdown included",
      "6-hour minimum coverage"
    ],
    staffCount: "4 Staff Members",
    eventTypes: ["Private Parties", "Small Venues", "Corporate Events", "Wedding Receptions"],
    popular: false
  },
  {
    id: "professional",
    name: "Professional Package",
    icon: Star,
    subtitle: "Most popular choice",
    description: "Comprehensive staffing for medium-scale events, festivals, and commercial venues",
    price: "From £420",
    duration: "per event (min 8 hours)",
    savings: "Save 20%",
    features: [
      "4x Bar Staff (mixed experience levels)",
      "2x Sound Technicians",
      "2x Security Personnel (SIA licensed)",
      "2x Stewards (NVQ Level 2)",
      "1x Lighting Technician",
      "Backstage crew support",
      "Production coordination",
      "Full equipment liaison",
      "Emergency backup staff",
      "Comprehensive insurance"
    ],
    staffCount: "12 Staff Members",
    eventTypes: ["Music Festivals", "Concert Venues", "Corporate Functions", "Trade Shows"],
    popular: true
  },
  {
    id: "premium",
    name: "Premium Package",
    icon: Crown,
    subtitle: "Full-service solution",
    description: "Complete staffing solution for large-scale events, multi-day festivals, and major productions",
    price: "From £850",
    duration: "per event (min 10 hours)",
    savings: "Save 25%",
    features: [
      "8x Bar Staff (cocktail specialists)",
      "4x Sound Technicians (mixing engineers)", 
      "4x Security Team (close protection available)",
      "4x Stewards (crowd management)",
      "2x Lighting Technicians (DMX certified)",
      "4x Riggers/Stage Setup (PASMA certified)",
      "1x Production Manager",
      "4x Backstage Crew",
      "2x Brand Ambassadors",
      "2x Merchandise Staff",
      "24/7 coordination support",
      "Equipment procurement assistance",
      "Multi-day event planning",
      "Premium insurance coverage"
    ],
    staffCount: "35 Staff Members",
    eventTypes: ["Major Festivals", "Arena Events", "Multi-Day Productions", "Stadium Concerts"],
    popular: false
  }
];

const addOns = [
  {
    name: "Extended Hours",
    description: "Additional hourly coverage beyond package minimum",
    price: "£12-35/hour per staff member",
    icon: Calendar
  },
  {
    name: "Weekend Premium",
    description: "Friday-Sunday events (additional 15% on base rates)",
    price: "+15% on package price",
    icon: Star
  },
  {
    name: "Emergency Call-out",
    description: "Last-minute staffing (within 48 hours)",
    price: "+25% rush fee",
    icon: Zap
  },
  {
    name: "Multi-Day Discount",
    description: "Consecutive day events (3+ days)",
    price: "-10% per additional day",
    icon: Music
  }
];

export default function Packages() {
  return (
    <div className="min-h-screen">
      <title>Staffing Packages - NORTH STAFF</title>
      <meta name="description" content="Competitive music event staffing packages for all event scales. Starter, Professional, and Premium packages with customizable options and bulk discounts across the North of England." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Competitive Event Staffing Packages
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Professionally crafted packages to match your event scale and budget. 
              Fair pricing, flexible options, guaranteed staff quality across the North of England.
            </p>
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative overflow-hidden ${pkg.popular ? 'ring-4 ring-primary shadow-2xl scale-105' : 'shadow-lg'}`}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`rounded-full p-4 ${pkg.popular ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}>
                      <pkg.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-dark">{pkg.name}</CardTitle>
                  <p className="text-primary font-semibold">{pkg.subtitle}</p>
                  <p className="text-gray-600 text-sm mt-2">{pkg.description}</p>
                  <div className="mt-6">
                    <div className="text-4xl font-bold text-dark">{pkg.price}</div>
                    <div className="text-sm text-gray-600">{pkg.duration}</div>
                    <div className="text-sm font-semibold text-green-600 mt-1">{pkg.savings}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-100 rounded-lg">
                      <div className="font-semibold text-dark">{pkg.staffCount}</div>
                      <div className="text-sm text-gray-600">Included</div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-dark mb-2">Perfect for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.eventTypes.map((type) => (
                        <span key={type} className="bg-blue-100 text-primary text-xs px-2 py-1 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link href="/contact">
                    <Button className={`w-full ${pkg.popular ? 'bg-primary hover:bg-secondary' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
                      Get This Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Customizable Add-ons</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailor your package with additional services and flexible pricing options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon) => (
              <Card key={addon.name} className="shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <addon.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">{addon.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
                  <div className="text-primary font-semibold">{addon.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="shadow-xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-dark mb-4">Need a Custom Quote?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Every event is unique. Let us create a tailored staffing solution that fits your specific requirements and budget.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Flexible team sizing</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Custom duration options</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Volume discounts available</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Specialist role requirements</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Multi-venue coordination</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Seasonal pricing adjustments</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary text-white hover:bg-secondary">
                    Get Custom Quote
                  </Button>
                </Link>
                <a href="tel:+447706593557">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: (+44) 7706593557
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Our Packages */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose NORTH STAFF Packages?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Designed by event professionals for event professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-blue-100">No hidden fees or surprise charges. What you see is what you pay.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guaranteed Quality</h3>
              <p className="text-blue-100">All staff are vetted, certified, and experienced in music events.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
              <p className="text-blue-100">Quick quotes and fast deployment across the North of England.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Scalable Solutions</h3>
              <p className="text-blue-100">From intimate gatherings to major festivals - we scale with you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}