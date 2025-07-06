import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { insertServiceRequestSchema } from "@shared/schemas/service-requests";
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
} from "@/components/ui/form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const formSchema = insertServiceRequestSchema.extend({
  staffTypes: z.array(z.string()).min(1, "Please select at least one staff type"),
});

type FormData = z.infer<typeof formSchema>;

const staffTypeOptions = [
  { id: "bar-staff", label: "Bar Staff" },
  { id: "sound-technician", label: "Sound Technicians" },
  { id: "brand-ambassador", label: "Brand Ambassadors" },
  { id: "steward", label: "Stewards" },
  { id: "security", label: "Security" },
  { id: "rigger", label: "Riggers / Stage Setup" },
  { id: "lighting-technician", label: "Lighting Technicians" },
  { id: "production-manager", label: "Production Managers" },
  { id: "backstage-crew", label: "Backstage Crew" },
  { id: "merchandise", label: "Merchandise Staff" },
];

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      eventDate: "",
      eventLocation: "",
      staffTypes: [],
      staffCount: "",
      eventDuration: "",
      eventDetails: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/service-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll respond within 2 hours with a customized quote.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/service-requests"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <title>Contact Us - NORTH STAFF</title>
      <meta name="description" content="Get a quote for professional event staff across the North of England. Bar staff, sound technicians, brand ambassadors, stewards, and security available. Fast response guaranteed." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Request Event Staffing
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tell us about your event and we'll provide a tailored staffing solution within 2 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-light shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-dark mb-6">Service Request Form</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company name" {...field} />
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
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
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
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Date *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="eventLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Location *</FormLabel>
                              <FormControl>
                                <Input placeholder="Leeds, Sheffield, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="staffTypes"
                        render={() => (
                          <FormItem>
                            <FormLabel>Staff Required *</FormLabel>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {staffTypeOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="staffTypes"
                                  render={({ field }) => {
                                    return (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== option.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="staffCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Staff Needed</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select quantity" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1-3">1-3 staff</SelectItem>
                                  <SelectItem value="4-6">4-6 staff</SelectItem>
                                  <SelectItem value="7-10">7-10 staff</SelectItem>
                                  <SelectItem value="10+">10+ staff</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="eventDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Duration</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="half-day">Half day (4 hours)</SelectItem>
                                  <SelectItem value="full-day">Full day (8 hours)</SelectItem>
                                  <SelectItem value="evening">Evening (5-6 hours)</SelectItem>
                                  <SelectItem value="multi-day">Multiple days</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="eventDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your event, specific requirements, dress code, etc."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
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
                          {mutation.isPending ? "Submitting..." : "Submit Staffing Request"}
                        </Button>
                        <p className="text-sm text-medium mt-4">
                          We'll respond within 2 hours with a customized quote
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-semibold text-dark">Phone</p>
                        <a href="tel:+447706593557" className="text-medium hover:text-primary">Tel: (+44) 7706593557</a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-semibold text-dark">Email</p>
                        <p className="text-medium">hello@northstaff.co.uk</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                      <div>
                        <p className="font-semibold text-dark">Address</p>
                        <p className="text-medium">
                          Leeds Business Centre<br />
                          West Yorkshire, LS1 4TN
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-semibold text-dark">Response Time</p>
                        <p className="text-medium">Within 2 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Emergency Staffing</h3>
                  <p className="mb-4">
                    Need staff urgently? Call us directly for same-day bookings and emergency staffing requirements.
                  </p>
                  <a href="tel:+447706593557">
                    <Button variant="outline" className="w-full border-primary bg-white text-primary hover:bg-primary hover:text-white">
                      Call Now: (+44) 7706593557
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
