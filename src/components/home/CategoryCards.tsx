import { Card } from "@/components/ui/card";
import { Heart, Brain, Bone, Eye, Baby, Activity, Stethoscope, Pill } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Cardiology", icon: Heart, color: "text-red-500" },
  { name: "Neurology", icon: Brain, color: "text-purple-500" },
  { name: "Orthopedics", icon: Bone, color: "text-blue-500" },
  { name: "Ophthalmology", icon: Eye, color: "text-cyan-500" },
  { name: "Pediatrics", icon: Baby, color: "text-pink-500" },
  { name: "General Medicine", icon: Stethoscope, color: "text-primary" },
  { name: "Dermatology", icon: Activity, color: "text-orange-500" },
  { name: "Pharmacy", icon: Pill, color: "text-green-500" },
];

export const CategoryCards = () => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Browse by Specialty</h2>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.name} to={`/search?specialty=${category.name.toLowerCase()}`}>
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
