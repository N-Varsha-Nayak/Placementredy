import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code2, FileText, BookMarked, User, Menu, LogOut, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/practice', label: 'Practice', icon: Code2 },
    { path: '/dashboard/assessments', label: 'Assessments', icon: FileText },
    { path: '/dashboard/resources', label: 'Resources', icon: BookMarked },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate('/');
  };

  const pageTitleMap = {
    '/dashboard': 'Dashboard',
    '/dashboard/practice': 'Practice',
    '/dashboard/assessments': 'Assessments',
    '/dashboard/resources': 'Resources',
    '/dashboard/profile': 'Profile',
  };

  const currentPageTitle = pageTitleMap[location.pathname] ?? 'Placement Prep';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } fixed left-0 top-0 z-40 h-full overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 border-b border-gray-700 bg-gray-900 p-5">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold tracking-tight">PlacementPrep</h1>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-6 py-4 shadow-sm md:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Placement Prep</p>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">{currentPageTitle}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
