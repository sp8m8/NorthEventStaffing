import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { insertStaffApplicationSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Users, Star, Award, Clock } from "lucide-react";

const formSchema = insertStaffApplicationSchema.extend({
  category: z.string().min(1, "Please select a category"),
  rightToWork: z.boolean().refine(val => val === true, "You must have the right to work in the UK"),
});

type FormData = z.infer<typeof formSchema>;

const categoryOptions = [
  { value: "bar-staff", label: "Bar Staff", requirements: "Personal License, Food Hygiene Level 2" },
  { value: "sound-technician", label: "Sound Technician", requirements: "City & Guilds Audio Engineering" },
  { value: "brand-ambassador", label: "Brand Ambassador", requirements: "Marketing experience preferred" },
  { value: "steward", label: "Steward", requirements: "NVQ Level 2 Spectator Safety" },
  { value: "security", label: "Security", requirements: "SIA License (Door Supervision/CCTV)" },
  { value: "rigger", label: "Riggers / Stage Setup", requirements: "PASMA/IPAF certification, Working at Height" },
  { value: "lighting-technician", label: "Lighting Technician", requirements: "City & Guilds Electrical, PAT Testing" },
  { value: "production-manager", label: "Production Manager", requirements: "Event Management qualification preferred" },
  { value: "backstage-crew", label: "Backstage Crew", requirements: "Manual handling training preferred" },
  { value: "merchandise", label: "Merchandise Staff", requirements: "Retail experience preferred" },
];

const benefits = [
  "Competitive hourly rates",
  "Flexible working hours",
  "Regular work opportunities",
  "Professional development",
  "Friendly team environment",
  "Training provided"
];

export default function JoinUs() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      postcode: "",
      category: "",
      experience: "",
      siaLicenseNumber: "",
      siaLicenseExpiry: "",
      firstAidCertified: false,
      foodHygieneCertified: false,
      rightToWork: false,
      availableWeekdays: false,
      availableWeekends: false,
      availableEvenings: false,
      expectedHourlyRate: undefined,
      previousExperience: "",
      references: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/staff-applications", data);
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and contact you within 48 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/staff-applications"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const selectedCategory = form.watch("category");
  const showSiaFields = selectedCategory === "security";

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <title>Join Our Team - NORTH STAFF</title>
      <meta name="description" content="Join NORTH STAFF's team of professional event staff. Apply for bar staff, sound technician, brand ambassador, steward, or security positions." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Professional Team
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Be part of the North's premier event staffing agency. Competitive rates, flexible hours, and exciting opportunities await.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="bg-light shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-dark mb-6">Staff Application Form</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your first name" {...field} />
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
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
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
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+44 7xxx xxxxxx" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="postcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postcode *</FormLabel>
                              <FormControl>
                                <Input placeholder="LS1 4TN" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full address" {...field} />
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
                            <FormLabel>Position Applied For *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoryOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {selectedCategory && (
                              <FormDescription>
                                Requirements: {categoryOptions.find(c => c.value === selectedCategory)?.requirements}
                              </FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Summary *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 3 years bartending experience, cocktail specialist" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {showSiaFields && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="siaLicenseNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SIA License Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="SIA-123456789" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="siaLicenseExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>SIA License Expiry</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-dark">Certifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstAidCertified"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  First Aid Certified
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="foodHygieneCertified"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Food Hygiene Certified
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-dark">Availability</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="availableWeekdays"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Weekdays
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="availableWeekends"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Weekends
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="availableEvenings"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Evenings
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="expectedHourlyRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Hourly Rate (£)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 18" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="previousExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Previous Experience</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your relevant work experience..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="references"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>References</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide contact details for two professional references..."
                                className="min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rightToWork"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                I confirm that I have the right to work in the UK *
                              </FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-center">
                        <Button 
                          type="submit" 
                          size="lg"
                          className="bg-primary text-white hover:bg-secondary px-8 py-4"
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                        <p className="text-sm text-medium mt-4">
                          We'll review your application and contact you within 48 hours
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-8">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-6">Why Work With Us?</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-6">Our Standards</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Award className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-dark">Professional Excellence</p>
                        <p className="text-medium text-sm">All staff are fully vetted and certified</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-dark">Reliable Service</p>
                        <p className="text-medium text-sm">Punctuality and reliability are essential</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-dark">Team Support</p>
                        <p className="text-medium text-sm">Ongoing training and development provided</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Questions?</h3>
                  <p className="mb-4">
                    Get in touch with our recruitment team
                  </p>
                  <p className="text-sm">
                    📞 0113 456 7890<br />
                    ✉️ recruitment@northstaff.co.uk
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}