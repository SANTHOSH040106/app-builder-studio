import { MainLayout } from "@/components/layout/MainLayout";
import { QuickActions } from "@/components/home/QuickActions";
import { SearchBar } from "@/components/home/SearchBar";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedHospitals } from "@/components/home/FeaturedHospitals";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Stethoscope, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const PatientFollowUp = ({ userId }: { userId: string }) => {
  const { data: nextFollowUp } = useQuery({
    queryKey: ["patient-followup", userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("appointments")
        .select("follow_up_date, doctors:doctors(name)")
        .eq("user_id", userId)
        .not("follow_up_date", "is", null)
        .gte("follow_up_date", new Date().toISOString().split("T")[0])
        .order("follow_up_date", { ascending: true })
        .limit(1)
        .maybeSingle();
      return data;
    },
    enabled: !!userId,
  });

  if (!nextFollowUp) return null;

  return (
    <Card className="mx-4 mb-4 border-primary/20 bg-primary/5">
      <CardContent className="pt-4 pb-4 flex items-center gap-3">
        <CalendarCheck className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium">Next Follow-up Visit</p>
          <p className="text-xs text-muted-foreground">
            Dr. {(nextFollowUp.doctors as any)?.name} — {format(new Date(nextFollowUp.follow_up_date!), "MMM dd, yyyy")}
          </p>
        </div>
        <Badge variant="outline">Upcoming</Badge>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  useProfileCompletion();
  const { isAdmin, isDoctor, user, loading } = useUserRole();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Role-based quick access */}
        {!loading && (isAdmin || isDoctor) && (
          <div className="flex gap-2 px-4 pt-4">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate("/admin")} className="gap-1">
                <Shield className="h-4 w-4" /> Admin Dashboard
              </Button>
            )}
            {isDoctor && (
              <Button variant="outline" size="sm" onClick={() => navigate("/doctor-dashboard")} className="gap-1">
                <Stethoscope className="h-4 w-4" /> My Queue
              </Button>
            )}
          </div>
        )}

        {/* Patient follow-up reminder */}
        {user && <PatientFollowUp userId={user.id} />}

        <SearchBar />
        <QuickActions />
        <FeaturedHospitals />
        <CategoryCards />
      </div>
    </MainLayout>
  );
};

export default Index;
