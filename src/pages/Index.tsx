import { MainLayout } from "@/components/layout/MainLayout";
import { QuickActions } from "@/components/home/QuickActions";
import { SearchBar } from "@/components/home/SearchBar";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedHospitals } from "@/components/home/FeaturedHospitals";

const Index = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <SearchBar />
        <QuickActions />
        <FeaturedHospitals />
        <CategoryCards />
      </div>
    </MainLayout>
  );
};

export default Index;
