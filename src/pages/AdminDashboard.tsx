import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRevenueSummary, useUpcomingFollowups } from "@/hooks/useAdminDashboard";
import { Users, Ticket, DollarSign, TrendingUp, CalendarCheck, Crown } from "lucide-react";
import { format } from "date-fns";

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data: revenue, isLoading: revenueLoading } = useRevenueSummary(selectedDate);
  const { data: followups = [], isLoading: followupsLoading } = useUpcomingFollowups(14);

  const stats = [
    {
      label: "Total Patients",
      value: revenue?.total_patients ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Normal Tokens",
      value: revenue?.normal_tokens ?? 0,
      icon: Ticket,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Priority Tokens",
      value: revenue?.priority_tokens ?? 0,
      icon: Crown,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Consultation Income",
      value: `₹${revenue?.total_consultation_income ?? 0}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Priority Income",
      value: `₹${revenue?.total_priority_income ?? 0}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Overall Revenue",
      value: `₹${revenue?.overall_revenue ?? 0}`,
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <MainLayout>
      <div className="container py-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Label htmlFor="date" className="text-sm">Date:</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>

        {/* Revenue Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">
                      {revenueLoading ? "..." : stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Follow-ups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Upcoming Follow-ups (Next 14 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {followupsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : followups.length === 0 ? (
              <p className="text-muted-foreground">No upcoming follow-ups</p>
            ) : (
              <div className="space-y-3">
                {followups.map((f: any) => (
                  <div
                    key={f.appointment_id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">{f.patient_name || "Unknown Patient"}</p>
                      <p className="text-sm text-muted-foreground">
                        Dr. {f.doctor_name}
                      </p>
                      {f.consultation_notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {f.consultation_notes}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline">
                      {format(new Date(f.follow_up_date), "MMM dd, yyyy")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
