import { Shield, Users, Award, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const staffCategories = [
  {
    title: "Bar Staff",
    description: "Licensed professionals for all your beverage service needs",
    requirements: ["Personal License", "Food Hygiene Level 2", "Experience in high-volume venues"],
    icon: Users,
    color: "bg-orange-500"
  },
  {
    title: "Sound Technicians", 
    description: "Certified audio engineers for perfect sound delivery",
    requirements: ["City & Guilds Audio Engineering", "Live sound experience", "Equipment knowledge"],
    icon: Award,
    color: "bg-red-600"
  },
  {
    title: "Brand Ambassadors",
    description: "Professional representatives to promote your brand",
    requirements: ["Marketing experience", "Excellent communication", "Professional presentation"],
    icon: Users,
    color: "bg-orange-500"
  },
  {
    title: "Stewards",
    description: "Qualified crowd management and safety personnel",
    requirements: ["NVQ Level 2 Spectator Safety", "Crowd control experience", "First Aid certified"],
    icon: Shield,
    color: "bg-red-600"
  },
  {
    title: "Security",
    description: "Licensed security professionals for event safety",
    requirements: ["SIA License (Door Supervision/CCTV)", "Experience in events", "Physical fitness"],
    icon: Shield,
    color: "bg-black"
  },
  {
    title: "Riggers / Stage Setup",
    description: "Certified rigging and stage construction specialists",
    requirements: ["PASMA/IPAF certification", "Working at Height qualification", "Manual handling"],
    icon: Award,
    color: "bg-orange-500"
  },
  {
    title: "Lighting Technicians",
    description: "Qualified lighting specialists for atmosphere and safety",
    requirements: ["City & Guilds Electrical", "PAT Testing certified", "Lighting design experience"],
    icon: Award,
    color: "bg-red-600"
  },
  {
    title: "Production Managers",
    description: "Experienced coordinators for seamless event execution",
    requirements: ["Event Management qualification", "Leadership experience", "Multi-tasking skills"],
    icon: Clock,
    color: "bg-black"
  },
  {
    title: "Backstage Crew",
    description: "Reliable support staff for behind-the-scenes operations",
    requirements: ["Manual handling training", "Previous event experience", "Team working skills"],
    icon: Users,
    color: "bg-orange-500"
  },
  {
    title: "Merchandise Staff",
    description: "Sales professionals for merchandise and retail operations",
    requirements: ["Retail experience", "Cash handling skills", "Customer service excellence"],
    icon: Users,
    color: "bg-red-600"
  }
];

export default function StaffPage() {
  return (
    <div className="min-h-screen">
      <title>Our Staffing Categories - NORTH STAFF</title>
      <meta name="description" content="Comprehensive event staffing across all categories - bar staff, sound technicians, security, riggers, and more across the North of England." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Comprehensive Event Staffing</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Your one stop shop for all event staffing needs across the North of England. 
              Licensed, certified, and experienced professionals in every category.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => window.location.href = '/contact'}
            >
              Get a Quote Today
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose NORTH STAFF?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide fully vetted, qualified professionals across all event staffing categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Fully Licensed & Certified</h3>
              <p className="text-gray-600">All our staff hold relevant qualifications and certifications required by UK law</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Vetted & Insured</h3>
              <p className="text-gray-600">Background checked professionals with full public liability insurance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Available 24/7</h3>
              <p className="text-gray-600">Round-the-clock staffing solutions for events of any size and duration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Staffing Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional event staff across all categories for music events and beyond
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${category.color} rounded-full w-12 h-12 flex items-center justify-center mr-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-dark">{category.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-dark mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {category.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Staff Your Event?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get in touch today for a free quote. We'll match you with the perfect team for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => window.location.href = '/contact'}
            >
              Request Quote
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => window.location.href = '/join-us'}
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}