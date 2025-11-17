import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    rating: 4.5,
    distance: "2.3 km",
    specialties: ["Cardiology", "Neurology"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Medicare Center",
    rating: 4.8,
    distance: "3.1 km",
    specialties: ["Pediatrics", "General Medicine"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Health Plus Clinic",
    rating: 4.3,
    distance: "1.8 km",
    specialties: ["Orthopedics", "Dermatology"],
    image: "/placeholder.svg",
  },
];

export const FeaturedHospitals = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Featured Hospitals</h2>
        <a href="/search" className="text-sm text-primary hover:underline">
          View All
        </a>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {hospitals.map((hospital) => (
            <CarouselItem key={hospital.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <div className="h-40 bg-muted relative">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-background/90">
                    <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
                    {hospital.rating}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{hospital.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hospital.distance}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};
