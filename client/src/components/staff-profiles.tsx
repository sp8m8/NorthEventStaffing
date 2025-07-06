import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";
import type { Staff } from "@shared/schema";

export default function StaffProfiles() {
  const { data: staff, isLoading } = useQuery<Staff[]>({
    queryKey: ['/api/staff'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-medium">Loading staff profiles...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show first 3 staff members
  const featuredStaff = staff?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Meet Our Professional Team</h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            Experienced professionals ready to make your event exceptional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStaff.map((member) => (
            <Card key={member.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-dark mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-2 capitalize">
                  {member.category.replace('-', ' ')}
                </p>
                <p className="text-medium mb-4">{member.experience}</p>
                <div className="flex items-center mb-4">
                  {[...Array(member.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-medium">
                    {member.rating}.0 ({member.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center text-sm text-medium">
                  <MapPin className="w-4 h-4 mr-1" />
                  {member.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/staff">
            <Button className="bg-primary text-white hover:bg-secondary px-8 py-3">
              View All {staff?.length || 0}+ Staff Members
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
