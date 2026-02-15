import { TrendingUp, Code2, Video, Award } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Problems Solved', value: '0', icon: Code2, color: 'from-blue-500 to-blue-600' },
    { label: 'Interviews Completed', value: '0', icon: Video, color: 'from-purple-500 to-purple-600' },
    { label: 'Current Streak', value: '0 days', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    { label: 'Achievements', value: '0', icon: Award, color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back! Here's your placement preparation overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-gray-500">This month</span>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-100 p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Activity #{i}</p>
                  <p className="text-sm text-gray-600">No activities yet. Start practicing to see your progress here!</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-6">Quick Start</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-left flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Start Coding Challenge
            </button>
            <button className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-colors text-left flex items-center gap-2">
              <Video className="w-5 h-5" />
              Mock Interview
            </button>
            <button className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-colors text-left flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              View Analytics
            </button>
          </div>

          {/* Progress */}
          <div className="mt-8 pt-8 border-t border-purple-500">
            <p className="text-sm text-purple-100 mb-3">Today's Progress</p>
            <div className="w-full bg-purple-500 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-0"></div>
            </div>
            <p className="text-sm text-purple-100 mt-2">0/10 tasks completed</p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Learning Path</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Fundamentals', progress: 0, items: 15 },
            { title: 'Intermediate', progress: 0, items: 20 },
            { title: 'Advanced', progress: 0, items: 25 },
          ].map((path, i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-4">
              <p className="font-semibold text-gray-900 mb-2">{path.title}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-full h-2 transition-all"
                  style={{ width: `${path.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{path.progress}% complete ({path.items} items)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
