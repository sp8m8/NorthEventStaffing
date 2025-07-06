import Hero from "@/components/hero";
import ServicesSection from "@/components/services-section";
import StaffProfiles from "@/components/staff-profiles";
import CoverageArea from "@/components/coverage-area";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <title>Yorkshire Events Staffing - Professional Event Staff Solutions</title>
      <meta name="description" content="Professional event staffing solutions across West Yorkshire and North England. Bar staff, sound technicians, and brand ambassadors for your events." />
      
      <Hero />
      <ServicesSection />
      <StaffProfiles />
      <CoverageArea />
      <Testimonials />
    </div>
  );
}
