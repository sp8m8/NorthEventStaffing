import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload } from "lucide-react";
import { Link } from "wouter";

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

export default function StaffRegistration() {
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

  const onSubmit = (data: RegistrationData) => {
    registerMutation.mutate(data);
  };

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
                  <Link href="/staff-portal">
                    <Button
                      type="button"
                      variant="outline"
                    >
                      Back to Portal
                    </Button>
                  </Link>
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
