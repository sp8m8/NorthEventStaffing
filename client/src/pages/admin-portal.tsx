import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Plus, 
  Users, 
  Clock, 
  MapPin, 
  DollarSign, 
  Settings,
  Bell,
  FileText,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

// Mock data for demonstration
const upcomingShifts = [
  {
    id: 1,
    eventName: "Summer Music Festival",
    date: "2025-07-15",
    time: "14:00 - 23:00",
    venue: "Yorkshire Event Park",
    staffNeeded: 12,
    staffAssigned: 8,
    roles: ["Bar Staff", "Security", "Sound Tech"],
    status: "partially-filled"
  },
  {
    id: 2,
    eventName: "Corporate Gala",
    date: "2025-07-18",
    time: "18:00 - 01:00",
    venue: "Leeds Convention Centre",
    staffNeeded: 6,
    staffAssigned: 6,
    roles: ["Bar Staff", "Brand Ambassador"],
    status: "fully-staffed"
  },
  {
    id: 3,
    eventName: "Private Wedding",
    date: "2025-07-20",
    time: "16:00 - 02:00",
    venue: "Harewood House",
    staffNeeded: 4,
    staffAssigned: 0,
    roles: ["Bar Staff", "Steward"],
    status: "urgent"
  }
];

const staffStats = {
  totalActive: 156,
  availableToday: 89,
  onShift: 23,
  pendingApplications: 12
};

const recentActivity = [
  {
    id: 1,
    type: "shift_assignment",
    message: "Sarah Johnson assigned to Summer Music Festival - Bar Staff",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "application",
    message: "New staff application from Michael Brown - Sound Technician",
    time: "4 hours ago"
  },
  {
    id: 3,
    type: "shift_reminder",
    message: "24h reminder sent for Corporate Gala event",
    time: "6 hours ago"
  }
];

export default function AdminPortal() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "fully-staffed":
        return <Badge className="bg-green-100 text-green-800">Fully Staffed</Badge>;
      case "partially-filled":
        return <Badge className="bg-yellow-100 text-yellow-800">Partially Filled</Badge>;
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <title>Admin Portal - NORTH STAFF</title>
      <meta name="description" content="Administrative dashboard for managing events, staff assignments, schedules, and operations at NORTH STAFF." />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-dark">Admin Portal</h1>
              <p className="text-gray-600 mt-1">Manage events, staff, and operations</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-white hover:bg-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
              <Button className="bg-secondary text-white hover:bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Shift
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Active Staff</p>
                  <p className="text-3xl font-bold text-dark">{staffStats.totalActive}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Today</p>
                  <p className="text-3xl font-bold text-dark">{staffStats.availableToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Currently On Shift</p>
                  <p className="text-3xl font-bold text-dark">{staffStats.onShift}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-3xl font-bold text-dark">{staffStats.pendingApplications}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="shifts">Shifts</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar Widget */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Shift Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Interactive calendar view would be implemented here</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Shows all shifts, events, and staff assignments by date
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Shifts Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Shifts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingShifts.map((shift) => (
                    <div key={shift.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm">{shift.eventName}</h4>
                        {getStatusBadge(shift.status)}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {shift.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {shift.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {shift.venue}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {shift.staffAssigned}/{shift.staffNeeded} staff
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {shift.roles.map((role) => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shifts Tab */}
          <TabsContent value="shifts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Shift Management</CardTitle>
                  <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Shift
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingShifts.map((shift) => (
                    <div key={shift.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{shift.eventName}</h3>
                          <p className="text-gray-600">{shift.venue}</p>
                        </div>
                        {getStatusBadge(shift.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {shift.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {shift.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-2" />
                          {shift.staffAssigned}/{shift.staffNeeded} assigned
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {shift.roles.map((role) => (
                            <Badge key={role} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4 mr-2" />
                            Assign Staff
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bell className="w-4 h-4 mr-2" />
                            Send Reminder
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Management Tab */}
          <TabsContent value="staff" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Active Staff Members</h4>
                        <p className="text-sm text-gray-600">Currently available for shifts</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{staffStats.totalActive}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Pending Applications</h4>
                        <p className="text-sm text-gray-600">Awaiting review and approval</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">{staffStats.pendingApplications}</Badge>
                    </div>
                    
                    <Button className="w-full bg-primary text-white">
                      <Users className="w-4 h-4 mr-2" />
                      View All Staff
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {activity.type === "shift_assignment" && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {activity.type === "application" && (
                            <FileText className="w-5 h-5 text-blue-500" />
                          )}
                          {activity.type === "shift_reminder" && (
                            <Bell className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Event Management</CardTitle>
                  <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Management System</h3>
                  <p className="text-gray-600 mb-4">
                    Create and manage events, track client details, and coordinate staffing requirements.
                  </p>
                  <Button className="bg-primary text-white">
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Staff Performance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Financial Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Hours Worked Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Staffing Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-primary text-white justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Send Bulk Reminder
                    </Button>
                    <Button className="w-full bg-secondary text-white justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Export Timesheet
                    </Button>
                    <Button className="w-full bg-accent text-white justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Staff Availability Check
                    </Button>
                    <Button className="w-full bg-gray-600 text-white justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}