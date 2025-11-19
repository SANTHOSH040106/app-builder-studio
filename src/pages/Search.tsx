import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { SearchBar } from "@/components/home/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { HospitalCard } from "@/components/search/HospitalCard";
import { DoctorCard } from "@/components/search/DoctorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const specialtyParam = searchParams.get("specialty");
  
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    specialtyParam ? [specialtyParam] : []
  );
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("rating");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedSpecialties, selectedCities, sortBy, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    
    let hospitalsQuery = supabase.from("hospitals").select("*");
    let doctorsQuery = supabase.from("doctors").select("*, hospitals(name)");

    // Apply filters
    if (selectedSpecialties.length > 0) {
      hospitalsQuery = hospitalsQuery.overlaps("specialties", selectedSpecialties);
      doctorsQuery = doctorsQuery.in("specialization", selectedSpecialties);
    }

    if (selectedCities.length > 0) {
      hospitalsQuery = hospitalsQuery.in("city", selectedCities);
    }

    // Apply sorting
    const orderColumn = sortBy === "rating" ? "rating" : "name";
    const ascending = sortBy === "name";
    
    hospitalsQuery = hospitalsQuery.order(orderColumn, { ascending });
    doctorsQuery = doctorsQuery.order(orderColumn, { ascending });

    const [hospitalsResult, doctorsResult] = await Promise.all([
      hospitalsQuery,
      doctorsQuery,
    ]);

    if (hospitalsResult.data) setHospitals(hospitalsResult.data);
    if (doctorsResult.data) setDoctors(doctorsResult.data);
    
    setLoading(false);
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleCityToggle = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city)
        ? prev.filter((c) => c !== city)
        : [...prev, city]
    );
  };

  const handleClearFilters = () => {
    setSelectedSpecialties([]);
    setSelectedCities([]);
  };

  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Search Hospitals & Doctors</h1>
          <p className="text-muted-foreground">Find the best healthcare providers near you</p>
        </div>

        <SearchBar />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <SearchFilters
            selectedSpecialties={selectedSpecialties}
            selectedCities={selectedCities}
            onSpecialtyToggle={handleSpecialtyToggle}
            onCityToggle={handleCityToggle}
            onClearFilters={handleClearFilters}
          />

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="hospitals" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hospitals">Hospitals ({hospitals.length})</TabsTrigger>
            <TabsTrigger value="doctors">Doctors ({doctors.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hospitals" className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))
            ) : hospitals.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No hospitals found matching your criteria</p>
              </div>
            ) : (
              hospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  id={hospital.id}
                  name={hospital.name}
                  address={hospital.address}
                  city={hospital.city}
                  specialties={hospital.specialties}
                  rating={hospital.rating}
                  totalReviews={hospital.total_reviews}
                  image={hospital.images[0] || "/placeholder.svg"}
                />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="doctors" className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))
            ) : doctors.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No doctors found matching your criteria</p>
              </div>
            ) : (
              doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  id={doctor.id}
                  name={doctor.name}
                  photo={doctor.photo || "/placeholder.svg"}
                  specialization={doctor.specialization}
                  qualification={doctor.qualification}
                  experience={doctor.experience}
                  consultationFee={doctor.consultation_fee}
                  rating={doctor.rating}
                  totalReviews={doctor.total_reviews}
                  availabilityStatus={doctor.availability_status}
                  hospitalName={doctor.hospitals?.name}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Search;
