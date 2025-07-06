
// client/src/components/communication-channel.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useCommunication } from '../hooks/use-communication';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

interface CommunicationChannelProps {
  eventId: string;
  currentUserId: string; // The ID of the currently logged-in user
  currentUserName: string; // The name of the currently logged-in user
  // In a real app, you'd pass a map of userId to userName for display
  // For this simulation, we'll just use a mock function.
}

// Mock function to get user name from ID
const getUserName = (userId: string): string => {
  switch (userId) {
    case 'client-001': return 'Alice Client';
    case 'manager-001': return 'Bob Manager';
    case 'staff-001': return 'Charlie Staff';
    case 'client-002': return 'David Client';
    case 'manager-002': return 'Eve Manager';
    default: return `User ${userId}`;
  }
};

export const CommunicationChannel: React.FC<CommunicationChannelProps> = ({
  eventId,
  currentUserId,
  currentUserName,
}) => {
  const { messages, sendMessage, loading, error } = useCommunication(eventId, currentUserId);
  const [newMessageContent, setNewMessageContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newMessageContent.trim()) {
      await sendMessage(newMessageContent);
      setNewMessageContent('');
    }
  };

  // Scroll to the bottom of the messages whenever new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return <div className="text-center py-4">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Event {eventId} Communication</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[500px]">
        <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-gray-50">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === currentUserId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    <div className="font-semibold text-sm mb-1">
                      {msg.senderId === currentUserId ? 'You' : getUserName(msg.senderId)}
                    </div>
                    <p className="text-sm">{msg.content}</p>
                    <div className="text-xs text-right mt-1 opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};
