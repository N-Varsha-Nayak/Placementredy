// src/pages/DashboardLayout.jsx
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
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'} fixed left-0 top-0 z-40 h-full bg-gray-900 text-white`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-sm font-semibold">PlacementPrep</h1>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full gap-3 px-3 py-3 rounded-md text-sm text-left ${
                  active ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-3 py-3 rounded-md text-sm text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-gray-200">
          <div className="app-container flex items-center justify-between py-4">
            <div>
              <p className="text-xs text-gray-500">Placement Prep</p>
              <h2 className="text-lg font-semibold text-gray-900">{currentPageTitle}</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-700">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <div className="app-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}