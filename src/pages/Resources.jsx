import { BookMarked, ArrowRight, ExternalLink } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    { title: 'Data Structures Guide', category: 'Tutorial', description: 'Learn all fundamental data structures', icon: '📚' },
    { title: 'Algorithm Fundamentals', category: 'Tutorial', description: 'Master algorithm design and analysis', icon: '⚙️' },
    { title: 'System Design Patterns', category: 'Guide', description: 'Design scalable systems', icon: '🏗️' },
    { title: 'Interview Tips & Tricks', category: 'Article', description: 'Ace your interviews', icon: '💡' },
    { title: 'DSA Problem Repository', category: 'Reference', description: '500+ curated problems', icon: '📖' },
    { title: 'Company-Specific Prep', category: 'Guide', description: 'Prepare for FAANG interviews', icon: '🎯' },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Tutorial: 'bg-blue-100 text-blue-700',
      Guide: 'bg-purple-100 text-purple-700',
      Article: 'bg-green-100 text-green-700',
      Reference: 'bg-orange-100 text-orange-700',
    };
    return colors[category] || colors.Tutorial;
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Resources</h1>
        <p className="text-lg text-gray-600">Access comprehensive learning materials and study guides</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-purple-300">
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{resource.icon}</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(resource.category)}`}>
                {resource.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
            <button className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-sm transition-colors">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
