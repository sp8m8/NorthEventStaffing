import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Clock, Award } from "lucide-react";

const stats = [
  { label: "Events Staffed", value: "500+", icon: Users },
  { label: "Professional Staff", value: "120+", icon: Users },
  { label: "Client Rating", value: "4.9/5", icon: Award },
  { label: "Years Experience", value: "5 Years", icon: Clock },
];

const features = [
  {
    icon: Shield,
    title: "Fully Licensed & Insured",
    description: "All our staff are fully licensed, certified, and covered by comprehensive insurance."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock support for urgent requests and last-minute staffing needs."
  },
  {
    icon: Award,
    title: "Local Expertise",
    description: "Deep knowledge of Yorkshire venues and event requirements across the region."
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <title>About Us - Yorkshire Events Staffing</title>
      <meta name="description" content="Learn about Yorkshire Events Staffing - West Yorkshire's trusted provider of professional event staff since 2018. Licensed, insured, and locally experienced." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Yorkshire Events Staffing
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              West Yorkshire's most trusted provider of professional event staff, connecting exceptional talent with outstanding events since 2018.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Our Story</h2>
              <p className="text-lg text-medium mb-6">
                Founded in 2018, Yorkshire Events Staffing has become the region's most trusted 
                provider of professional event staff. Based in West Yorkshire, we understand 
                the unique needs of events across the North of England.
              </p>
              <p className="text-lg text-medium mb-8">
                Our team of 120+ carefully vetted professionals includes licensed bartenders, 
                certified sound technicians, and experienced brand ambassadors, all committed 
                to making your event exceptional.
              </p>
              <p className="text-lg text-medium">
                We pride ourselves on reliability, professionalism, and local expertise. 
                Whether you're planning a corporate conference in Leeds, a wedding in the Yorkshire Dales, 
                or a music festival in Manchester, we have the right staff to make your event a success.
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
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Track Record</h2>
            <p className="text-xl text-medium">
              Numbers that speak to our experience and reliability
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
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose Us</h2>
            <p className="text-xl text-medium">
              What sets Yorkshire Events Staffing apart
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
