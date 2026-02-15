import React from 'react';
import { Code2, Video, TrendingUp, Award } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import CircularProgress from '../components/CircularProgress';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';

const radarData = [
  { subject: 'DSA', A: 75 },
  { subject: 'System Design', A: 60 },
  { subject: 'Communication', A: 80 },
  { subject: 'Resume', A: 85 },
  { subject: 'Aptitude', A: 70 },
];

function ContinuePracticeCard() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Continue Practice</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <p className="font-semibold text-gray-900">Dynamic Programming</p>
          <p className="text-sm text-gray-600">3 of 10 problems completed</p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full" style={{ width: '30%' }} />
        </div>

        <div className="flex justify-end">
          <button className="btn-primary">Continue</button>
        </div>
      </CardContent>
    </Card>
  );
}

function WeeklyGoalsCard() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const active = [true, true, false, true, true, false, false];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">Problems Solved: <span className="font-semibold text-gray-900">12/20</span> this week</p>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full" style={{ width: '60%' }} />
        </div>

        <div className="flex items-center gap-3">
          {days.map((d, i) => (
            <div key={d} className="flex flex-col items-center text-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${active[i] ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'bg-gray-100 text-gray-500'}`}>
                <span className="text-xs font-semibold">{d.slice(0,1)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{d}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingAssessmentsCard() {
  const items = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.title} className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{it.title}</p>
                <p className="text-sm text-gray-600">{it.time}</p>
              </div>
              <div className="text-sm text-gray-500">&gt;</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-lg text-gray-600">Personalized overview of your placement readiness</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="flex items-center justify-center">
            <CardContent>
              <div className="flex items-center gap-6 lg:gap-12">
                <div>
                  <CircularProgress value={72} />
                </div>
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Readiness</h3>
                  <p className="text-sm text-gray-600">A holistic score based on practice, assessments, and activity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="You" dataKey="A" stroke="#6d28d9" fill="#7c3aed" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <ContinuePracticeCard />
          <WeeklyGoalsCard />
          <UpcomingAssessmentsCard />
        </div>
      </div>
    </div>
  );
}
