import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Clock, MapPin, Users, Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react";

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

const registrationSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  category: z.string().min(1, "Please select a category"),
  personalLicense: z.instanceof(FileList).optional(),
  siaLicense: z.instanceof(FileList).optional(),
  foodHygiene: z.instanceof(FileList).optional(),
  audioEngineering: z.instanceof(FileList).optional(),
  pasmaCert: z.instanceof(FileList).optional(),
  firstAidCert: z.instanceof(FileList).optional(),
});

type RegistrationData = z.infer<typeof registrationSchema>;

const categoryRequirements = {
  "bar-staff": ["personalLicense", "foodHygiene"],
  "sound-technician": ["audioEngineering"],
  "security": ["siaLicense"],
  "steward": ["firstAidCert"],
  "rigger": ["pasmaCert"],
  "lighting-technician": ["audioEngineering"],
  "production-manager": [],
  "backstage-crew": [],
  "brand-ambassador": [],
  "merchandise": []
};

export default function StaffPortal() {
  const [activeTab, setActiveTab] = useState("shifts");
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      category: "",
    },
  });

  const selectedCategory = form.watch("category");
  const requiredCerts = categoryRequirements[selectedCategory as keyof typeof categoryRequirements] || [];

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationData) => {
      // In real implementation, this would upload files and register user
      console.log("Registration data:", data);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "Welcome to NORTH STAFF. You can now browse available shifts.",
      });
      setIsRegistering(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

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

  const onSubmit = (data: RegistrationData) => {
    registerMutation.mutate(data);
  };

  if (isRegistering) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <title>Staff Registration - NORTH STAFF</title>
        <meta name="description" content="Register as a professional staff member with NORTH STAFF. Upload your certifications and access available shifts." />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-dark mb-4">Join NORTH STAFF</h1>
            <p className="text-xl text-gray-600">Register as a professional staff member and access available shifts</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Staff Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Category</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full p-2 border rounded">
                              <option value="">Select category</option>
                              <option value="bar-staff">Bar Staff</option>
                              <option value="sound-technician">Sound Technician</option>
                              <option value="security">Security</option>
                              <option value="steward">Steward</option>
                              <option value="rigger">Rigger / Stage Setup</option>
                              <option value="lighting-technician">Lighting Technician</option>
                              <option value="production-manager">Production Manager</option>
                              <option value="backstage-crew">Backstage Crew</option>
                              <option value="brand-ambassador">Brand Ambassador</option>
                              <option value="merchandise">Merchandise Staff</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {requiredCerts.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-dark">Required Certifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {requiredCerts.map((cert) => (
                          <FormField
                            key={cert}
                            control={form.control}
                            name={cert as keyof RegistrationData}
                            render={({ field: { onChange, value, ...field } }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Upload className="w-4 h-4" />
                                  {cert === "personalLicense" && "Personal License"}
                                  {cert === "siaLicense" && "SIA License"}
                                  {cert === "foodHygiene" && "Food Hygiene Certificate"}
                                  {cert === "audioEngineering" && "Audio Engineering Certificate"}
                                  {cert === "pasmaCert" && "PASMA/IPAF Certificate"}
                                  {cert === "firstAidCert" && "First Aid Certificate"}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => onChange(e.target.files)}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsRegistering(false)}
                    >
                      Back to Portal
                    </Button>
                    <Button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="bg-primary text-white hover:bg-secondary"
                    >
                      {registerMutation.isPending ? "Registering..." : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <Button
            onClick={() => setIsRegistering(true)}
            className="bg-primary text-white hover:bg-secondary"
          >
            New Staff? Register Here
          </Button>
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