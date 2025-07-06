import Hero from "@/components/hero";
import ServicesSection from "@/components/services-section";
import CoverageArea from "@/components/coverage-area";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <title>NORTH STAFF - Your One Stop Shop for Event Staffing Up North</title>
      <meta name="description" content="NORTH STAFF - Professional bar staff, sound technicians, brand ambassadors, stewards, security, riggers, lighting technicians, production managers, backstage crew, and merchandise staff across the North of England. Your one stop shop for event staffing up north." />
      
      <Hero />
      <ServicesSection />
      <CoverageArea />
      <Testimonials />
    </div>
  );
}
