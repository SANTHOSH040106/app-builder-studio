import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 md:pb-4">{children}</main>
      <BottomNavigation />
    </div>
  );
};
