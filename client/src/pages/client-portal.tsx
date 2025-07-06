
// client/src/pages/client-portal.tsx

import React, { useState } from 'react';
import { CommunicationChannel } from '@/components/communication-channel';

export default function ClientPortal() {
  // Mock user state for demonstration in this portal
  const [currentUser] = useState({
    id: "client-001",
    name: "Alice Client",
    role: "client",
  });

  return (
    <div className="py-12">
      <title>NORTH STAFF - Client Portal</title>
      <h1 className="text-4xl font-bold text-center mb-8">Client Portal</h1>
      <p className="text-center mb-8">Welcome, {currentUser.name}! Here you can manage your events and communicate with our team.</p>

      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center mb-8">Your Event Communications</h2>
        <CommunicationChannel
          eventId="123" // Using a mock event ID for demonstration
          currentUserId={currentUser.id}
          currentUserName={currentUser.name}
        />
        {/* In a real application, you would list events and allow selection */}
      </section>
    </div>
  );
}
