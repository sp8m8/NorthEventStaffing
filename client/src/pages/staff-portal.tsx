import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { StaffTimesheetForm } from "@/components/staff-timesheet-form";

// Mock data for demonstration - in real app this would come from the database
const mockShifts = [
  {
    id: 1,
    title: "Leeds Festival - Bar Staff",
    date: "2025-07-15",
    time: "14:00 - 02:00",
    location: "Bramham Park, Leeds",
    category: "bar-staff",
    hourlyRate: 18,
    status: "available",
    requirements: ["Personal License", "Food Hygiene Level 2"],
    description: "Bar service for main arena during festival weekend"
  },
  {
    id: 2,
    title: "Manchester Arena - Sound Tech",
    date: "2025-07-20",
    time: "18:00 - 00:00",
    location: "Manchester Arena",
    category: "sound-technician",
    hourlyRate: 25,
    status: "pending",
    requirements: ["City & Guilds Audio Engineering"],
    description: "Live sound mixing for concert performance"
  },
  {
    id: 3,
    title: "York Racecourse - Security",
    date: "2025-07-25",
    time: "12:00 - 20:00",
    location: "York Racecourse",
    category: "security",
    hourlyRate: 22,
    status: "confirmed",
    requirements: ["SIA License"],
    description: "Event security and crowd management"
  }
];

export default function StaffPortal() {
  const [activeTab, setActiveTab] = useState("shifts");
  const { toast } = useToast();

  const applyForShift = useMutation({
    mutationFn: async (shiftId: number) => {
      // In real implementation, this would apply for the shift
      console.log("Applying for shift:", shiftId);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 24 hours regarding your application.",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "confirmed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <title>Staff Portal - NORTH STAFF</title>
      <meta name="description" content="Access available shifts, manage confirmations, and view your schedule with NORTH STAFF portal." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-4">NORTH STAFF Portal</h1>
          <p className="text-xl text-gray-600">Manage your shifts and availability</p>
        </div>

        <div className="mb-8 text-center">
          <Link href="/staff-registration">
            <Button
              className="bg-primary text-white hover:bg-secondary"
            >
              New Staff? Register Here
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shifts">Available Shifts</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="shifts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockShifts.filter(shift => shift.status === "available").map((shift) => (
                <Card key={shift.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{shift.title}</CardTitle>
                      <Badge className={`${getStatusColor(shift.status)} text-white`}>
                        {shift.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {shift.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {shift.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {shift.location}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{shift.description}</p>
                    
                    <div>
                      <p className="text-sm font-semibold text-dark mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {shift.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-lg font-bold text-primary">£{shift.hourlyRate}/hour</span>
                      <Button
                        onClick={() => applyForShift.mutate(shift.id)}
                        disabled={applyForShift.isPending}
                        size="sm"
                        className="bg-primary text-white hover:bg-secondary"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockShifts.filter(shift => ["pending", "confirmed"].includes(shift.status)).map((shift) => (
                <Card key={shift.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{shift.title}</CardTitle>
                      <Badge className={`${getStatusColor(shift.status)} text-white flex items-center gap-1`}>
                        {getStatusIcon(shift.status)}
                        {shift.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {shift.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {shift.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {shift.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-lg font-bold text-primary">£{shift.hourlyRate}/hour</span>
                      {shift.status === "confirmed" && (
                        <Badge className="bg-green-500 text-white">
                          Confirmed
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Confirmed Shifts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockShifts.filter(shift => shift.status === "confirmed").map((shift) => (
                    <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-dark">{shift.title}</h3>
                        <p className="text-sm text-gray-600">{shift.date} • {shift.time}</p>
                        <p className="text-sm text-gray-600">{shift.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">£{shift.hourlyRate}/hour</p>
                        <Badge className="bg-green-500 text-white">
                          Confirmed
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}