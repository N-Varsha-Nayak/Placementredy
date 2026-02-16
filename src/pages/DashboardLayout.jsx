import { Outlet, useLocation, NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, ClipboardCheck, FolderOpen, User, ClipboardList, Rocket } from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Practice", path: "/dashboard/practice", icon: BookOpen },
  { title: "Assessments", path: "/dashboard/assessments", icon: ClipboardCheck },
  { title: "Resources", path: "/dashboard/resources", icon: FolderOpen },
  { title: "Profile", path: "/dashboard/profile", icon: User },
  { title: "Test Checklist", path: "/dashboard/test", icon: ClipboardList },
  { title: "Ship", path: "/dashboard/ship", icon: Rocket },
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <h2 className="text-lg font-bold">Placement Prep</h2>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-8 bg-white shrink-0">
          <h1 className="text-lg font-semibold text-gray-900">
            Placement Prep
          </h1>

          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
