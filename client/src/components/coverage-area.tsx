import { MapPin } from "lucide-react";

const primaryAreas = [
  "Leeds", "Bradford", "Sheffield", "York",
  "Harrogate", "Wakefield", "Huddersfield", "Halifax"
];

export default function CoverageArea() {
  return (
    <section className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Coverage Area</h2>
          <p className="text-xl text-medium max-w-3xl mx-auto">
            Serving events across West Yorkshire and throughout the North of England
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Map of Yorkshire service area" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-dark mb-6">Primary Service Areas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {primaryAreas.map((area) => (
                <div key={area} className="flex items-center text-medium">
                  <MapPin className="w-4 h-4 text-primary mr-3" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-light rounded-lg p-6">
              <h4 className="font-bold text-dark mb-3">Extended Coverage</h4>
              <p className="text-muted-foreground">
                We also provide staffing services across Manchester, Liverpool, Newcastle, 
                and other major cities in the North of England for larger events.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}
