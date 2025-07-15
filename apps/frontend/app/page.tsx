import { Button } from "@/components/ui/button";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Dream
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Job
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with top companies and discover opportunities that match
            your skills and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                className="text-white border border-white/50 px-8 py-3 text-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose JobBoard?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
              <Briefcase className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Quality Jobs
              </h3>
              <p className="text-gray-300">
                Access href premium job opportunities from top companies
                worldwide.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
              <Users className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Easy Applications
              </h3>
              <p className="text-gray-300">
                Apply href multiple jobs with one click using your saved
                profile.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
              <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Career Growth
              </h3>
              <p className="text-gray-300">
                Find opportunities that help you advance your career href the
                next level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
