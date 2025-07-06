import React, { useState } from "react";
import Hero from "@/components/hero";
import ServicesSection from "@/components/services-section";
import CoverageArea from "@/components/coverage-area";
import Testimonials from "@/components/testimonials";
import { CommunicationChannel } from "@/components/communication-channel"; // Import the new component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function Home() {
  // Mock user state for demonstration
  const [currentUser, setCurrentUser] = useState({
    id: "client-001",
    name: "Alice Client",
    role: "client",
  });

  const toggleUserRole = () => {
    setCurrentUser((prevUser) =>
      prevUser.role === "client"
        ? { id: "manager-001", name: "Bob Manager", role: "manager" }
        : { id: "client-001", name: "Alice Client", role: "client" }
    );
  };

  return (
    <div>
      <title>NORTH STAFF - Your One Stop Shop for Event Staffing Up North</title>
      <meta name="description" content="NORTH STAFF - Professional bar staff, sound technicians, brand ambassadors, stewards, security, riggers, lighting technicians, production managers, backstage crew, and merchandise staff across the North of England. Your one stop shop for event staffing up north." />
      
      <Hero />
      <ServicesSection />
      <CoverageArea />
      <Testimonials />

      {/* Demonstration of CommunicationChannel */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Real-Time Communication Demo</h2>
          <div className="flex justify-center mb-4">
            <Button onClick={toggleUserRole}>
              Switch to {currentUser.role === "client" ? "Manager" : "Client"} View
            </Button>
          </div>
          <p className="text-center mb-4">
            Current User: <span className="font-semibold">{currentUser.name} ({currentUser.role})</span>
          </p>
          <CommunicationChannel
            eventId="123" // Using a mock event ID for demonstration
            currentUserId={currentUser.id}
            currentUserName={currentUser.name}
          />
        </div>
      </section>
    </div>
  );
}
