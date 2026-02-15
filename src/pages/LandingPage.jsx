// src/pages/LandingPage.jsx
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
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="app-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-md flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">PlacementPrep</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGetStarted}
              className="btn btn-primary"
              aria-label="Sign in"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-16">
        <div className="app-container grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Ace Your <span className="text-purple-600">Placement</span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Practice, assess, and prepare for your dream job with a focused placement readiness platform designed for professionals.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="btn btn-primary px-6 py-3"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={() => document.getElementById('features')?.scrollIntoView()}
                className="btn border border-gray-300 bg-white text-gray-800 px-6 py-3"
              >
                Learn More
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-sm text-gray-600">Students Prepared</p>
              </div>
              <div>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-gray-600">Problems</p>
              </div>
            </div>
          </div>

          {/* Right-side summary cards */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-lg p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-md flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">500+ Problems</p>
                  <p className="text-xs text-gray-500">Fully solved</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-md flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">200+ Interviews</p>
                  <p className="text-xs text-gray-500">Mock practice</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-md flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Real Analytics</p>
                  <p className="text-xs text-gray-500">Track progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="app-container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-3xl font-semibold">Why Choose PlacementPrep?</h3>
            <p className="mt-3 text-gray-600">Everything you need to land your dream job</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-lg p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-md flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{feature.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits & Stats */}
      <section className="py-16">
        <div className="app-container grid gap-10 md:grid-cols-2 items-start">
          <div>
            <h4 className="text-2xl font-semibold mb-4">Everything You Need to Succeed</h4>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-sm text-gray-700">{benefit}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-4">
                Join thousands of learners who have successfully landed placements at top companies.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-md p-4">
                  <p className="text-2xl font-semibold text-purple-600">95%</p>
                  <p className="text-sm text-gray-600">Pass Rate</p>
                </div>
                <div className="bg-purple-50 rounded-md p-4">
                  <p className="text-2xl font-semibold text-purple-600">10K+</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="bg-purple-50 rounded-md p-4">
                  <p className="text-2xl font-semibold text-purple-600">500+</p>
                  <p className="text-sm text-gray-600">Problems</p>
                </div>
                <div className="bg-purple-50 rounded-md p-4">
                  <p className="text-2xl font-semibold text-purple-600">24/7</p>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="app-container">
          <div className="bg-purple-600 rounded-lg p-8 text-center text-white">
            <h4 className="text-2xl font-semibold">Ready to Ace Your Placement?</h4>
            <p className="mt-2 text-sm text-purple-100 max-w-2xl mx-auto">
              Start your preparation journey today and get one step closer to your dream job.
            </p>

            <div className="mt-6">
              <button
                onClick={handleGetStarted}
                className="btn bg-white text-purple-600 px-6 py-3 font-semibold rounded-md"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="app-container py-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h5 className="text-sm font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#">Guide</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            &copy; 2026 PlacementPrep. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}