import { useNavigate } from "react-router-dom";
import { Code, Video, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Practice Problems",
    description:
      "Solve curated coding challenges across data structures, algorithms, and more.",
  },
  {
    icon: Video,
    title: "Mock Interviews",
    description:
      "Simulate real interview scenarios with timed sessions and feedback.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your strengths, weaknesses, and readiness with detailed analytics.",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 to-purple-900 text-white py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Ace Your Placement
          </h1>
          <p className="text-xl opacity-90 mb-10">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-purple-700 hover:bg-gray-100 font-semibold text-base px-8 py-3 rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Everything you need to get placed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-gray-200 bg-white p-8 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 mt-auto bg-white">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Placement Prep. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
