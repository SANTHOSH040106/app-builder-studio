import { Card } from "@/components/ui/card";
import { Heart, Brain, Bone, Eye, Baby, Activity, Stethoscope, Pill } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Cardiology", icon: Heart, color: "text-accent", link: "/search?specialty=cardiology" },
  { name: "Neurology", icon: Brain, color: "text-primary", link: "/search?specialty=neurology" },
  { name: "Orthopedics", icon: Bone, color: "text-primary", link: "/search?specialty=orthopedics" },
  { name: "Ophthalmology", icon: Eye, color: "text-primary", link: "/search?specialty=ophthalmology" },
  { name: "Pediatrics", icon: Baby, color: "text-accent", link: "/search?specialty=pediatrics" },
  { name: "General Medicine", icon: Stethoscope, color: "text-primary", link: "/search?specialty=general medicine" },
  { name: "Dermatology", icon: Activity, color: "text-warning", link: "/search?specialty=dermatology" },
  { name: "Pharmacy", icon: Pill, color: "text-success", link: "/pharmacy" },
];

export const CategoryCards = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Browse by Specialty</h2>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.name} to={category.link}>
            <Card className="flex flex-col items-center justify-center p-4 h-24 hover:shadow-md transition-shadow cursor-pointer">
              <category.icon className={`h-6 w-6 mb-2 ${category.color}`} />
              <span className="text-xs text-center font-medium">{category.name}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
