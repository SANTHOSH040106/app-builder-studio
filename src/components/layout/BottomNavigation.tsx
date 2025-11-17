import { Home, Calendar, Search, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/appointments", icon: Calendar, label: "Appointments" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/profile", icon: User, label: "Profile" },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5", isActive && "fill-primary")} />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
