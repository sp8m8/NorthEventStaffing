import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Clock, Award } from "lucide-react";

const stats = [
  { label: "Staff Categories", value: "10+", icon: Users },
  { label: "Professional Network", value: "Growing", icon: Users },
  { label: "Response Time", value: "24hrs", icon: Clock },
  { label: "Founded", value: "2025", icon: Award },
];

const features = [
  {
    icon: Shield,
    title: "Fair & Affordable",
    description: "Competitive rates that provide fair compensation for staff while remaining affordable for event organisers."
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Expedited staffing process with quick turnaround times for urgent music event requirements."
  },
  {
    icon: Award,
    title: "Music Event Specialists",
    description: "Focused expertise in music events with comprehensive knowledge of industry requirements and regulations."
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <title>About Us - NORTH STAFF</title>
      <meta name="description" content="Learn about NORTH STAFF - founded in 2025 to provide fair, affordable, and comprehensive music event staffing solutions across the North of England." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About NORTH STAFF
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your one stop shop for event staffing up north - providing fair, affordable, and comprehensive music event staffing solutions across the North of England since 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Our Vision</h2>
              <p className="text-lg text-medium mb-6">
                Founded in 2025, NORTH STAFF was created with a clear vision: to provide fair-to-staff 
                and affordable one-stop-shop music event staffing solutions that expedite the process 
                of acquiring professional yet affordable high-quality event staff in the North of England.
              </p>
              <p className="text-lg text-medium mb-8">
                We recognised that the events industry needed a comprehensive staffing solution that 
                benefits both event organisers and staff members. Our platform connects skilled 
                professionals across all essential event roles - from bar staff and sound technicians 
                to riggers, security, and production managers.
              </p>
              <p className="text-lg text-medium">
                Music events require specialised knowledge and diverse skill sets. By focusing on 
                this sector and ensuring every staff member meets UK regulatory requirements, we've 
                created a trusted network that event organisers can rely on for exceptional service 
                and professionalism.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Yorkshire Events Staffing team" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">At a Glance</h2>
            <p className="text-xl text-medium">
              Key facts about NORTH STAFF's comprehensive music event staffing service
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-white shadow-lg text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose NORTH STAFF</h2>
            <p className="text-xl text-medium">
              What makes us the one-stop shop for music event staffing up north
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-light shadow-lg">
                <CardContent className="p-8 text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-dark mb-4">{feature.title}</h3>
                  <p className="text-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">Our Mission</h2>
          <p className="text-xl text-medium leading-relaxed">
            To provide exceptional event staffing solutions that exceed expectations, 
            while supporting the growth of Yorkshire's vibrant events industry. 
            We believe that every event, no matter the size, deserves professional, 
            reliable staff who are passionate about creating memorable experiences.
          </p>
        </div>
      </section>
    </div>
  );
}
