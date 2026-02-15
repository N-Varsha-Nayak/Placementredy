import { FileText, Zap, CheckCircle, Clock } from 'lucide-react';

export default function AssessmentsPage() {
  const assessments = [
    { id: 1, title: 'DSA Fundamentals', duration: '60 min', questions: 20, difficulty: 'Easy', status: 'available' },
    { id: 2, title: 'Data Structures Deep Dive', duration: '90 min', questions: 30, difficulty: 'Medium', status: 'available' },
    { id: 3, title: 'Algorithm Mastery', duration: '120 min', questions: 40, difficulty: 'Hard', status: 'available' },
  ];

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Assessments</h1>
        <p className="text-lg text-gray-600">Evaluate your readiness with comprehensive assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                Available
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{assessment.title}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>{assessment.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <FileText className="w-4 h-4" />
                <span>{assessment.questions} Questions</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                  {assessment.difficulty}
                </span>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
              Start Assessment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
