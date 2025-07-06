import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Filter } from "lucide-react";
import type { Staff } from "@shared/schema";

const categories = [
  { value: 'all', label: 'All Staff' },
  { value: 'bar-staff', label: 'Bar Staff' },
  { value: 'sound-technician', label: 'Sound Technicians' },
  { value: 'brand-ambassador', label: 'Brand Ambassadors' },
];

export default function StaffPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: allStaff, isLoading } = useQuery<Staff[]>({
    queryKey: ['/api/staff'],
  });

  const filteredStaff = selectedCategory === 'all' 
    ? allStaff 
    : allStaff?.filter(staff => staff.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-medium">Loading staff profiles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <title>Our Professional Staff - Yorkshire Events Staffing</title>
      <meta name="description" content="Meet our team of professional bar staff, sound technicians, and brand ambassadors across West Yorkshire and North England." />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Professional Team
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet the experienced professionals who make events exceptional across West Yorkshire and the North of England.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-medium" />
              <span className="text-medium font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "bg-primary text-white" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-medium">
              Showing {filteredStaff?.length || 0} staff members
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
            </p>
          </div>

          {filteredStaff && filteredStaff.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStaff.map((member) => (
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
                    
                    {member.specializations && member.specializations.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-dark mb-2">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.specializations.slice(0, 2).map((spec) => (
                            <span key={spec} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                          {member.specializations.length > 2 && (
                            <span className="text-xs text-medium">
                              +{member.specializations.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center mb-4">
                      {[...Array(member.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-medium">
                        {member.rating}.0 ({member.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-medium mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {member.location}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">£{member.hourlyRate}/hour</p>
                      <Button size="sm" className="bg-primary text-white hover:bg-secondary">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-medium text-lg">No staff members found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
