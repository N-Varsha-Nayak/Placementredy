import { useNavigate } from 'react-router-dom';
import { BookOpen, Video, TrendingUp, ArrowRight, Check } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Practice Problems',
      description: 'Solve curated coding problems to sharpen your skills and prepare for technical rounds',
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Practice real-world interview scenarios with AI to boost your confidence',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and performance metrics',
    },
  ];

  const benefits = [
    'Personalized learning paths',
    'Real-time feedback and guidance',
    'Interview preparation guides',
    'Community support and resources',
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">PlacementPrep</h1>
          </div>
          <button
            onClick={handleGetStarted}
            className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
              Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Placement</span>
            </h1>
            <p className="mb-10 max-w-xl text-xl leading-relaxed text-gray-600">
              Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform. Get expert-level preparation tools at your fingertips.
            </p>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleGetStarted}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-purple-700 hover:to-purple-800 hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg border-2 border-gray-300 px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:border-purple-600 hover:text-purple-600"
              >
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:max-w-lg">
              <div>
                <p className="text-3xl font-bold text-gray-900">10K+</p>
                <p className="text-gray-600">Students Prepared</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">95%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-gray-600">Problems</p>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative md:pl-6">
            <div className="absolute inset-0 rotate-2 rounded-3xl bg-gradient-to-r from-purple-200 to-purple-100"></div>
            <div className="relative rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-7 text-white shadow-2xl sm:p-8">
              <div className="space-y-5">
                <div className="flex items-center gap-4 rounded-xl bg-white/10 p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">500+ Problems</p>
                    <p className="text-sm text-purple-200">Fully solved</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white/10 p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">200+ Interviews</p>
                    <p className="text-sm text-purple-200">Mock practice</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white/10 p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Real Analytics</p>
                    <p className="text-sm text-purple-200">Track progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100/70 py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Why Choose PlacementPrep?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to land your dream job
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
              Everything You Need to Succeed
            </h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-8 md:p-12">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <p className="text-gray-600 mb-4">
                Join thousands of students who have successfully landed placements at top companies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">95%</p>
                  <p className="text-sm text-gray-600">Pass Rate</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">10K+</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">500+</p>
                  <p className="text-sm text-gray-600">Problems</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-purple-600">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
        <div className="mx-auto w-full max-w-7xl px-5 text-center md:px-8">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white">
            Ready to Ace Your Placement?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Start your preparation journey today and get one step closer to your dream job.
          </p>
          <button
            onClick={handleGetStarted}
            className="rounded-lg bg-white px-10 py-4 font-semibold text-purple-600 shadow-lg transition-colors duration-300 hover:bg-gray-50 hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-400">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2026 PlacementPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
