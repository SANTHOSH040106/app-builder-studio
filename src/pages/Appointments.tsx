import { MainLayout } from "@/components/layout/MainLayout";

const Appointments = () => {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
        <div className="text-center py-12 text-muted-foreground">
          <p>No appointments yet. Book your first appointment!</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Appointments;
