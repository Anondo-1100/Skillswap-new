import { Link } from "react-router-dom";
import { skillCategories } from "../data/skillsList";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div className="mx-auto px-4 py-16 container">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="mb-6 font-bold text-gray-900 text-6xl leading-tight">
            Unlock Your Potential with{" "}
            <span className="text-indigo-600">SkillSwap</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-gray-600 text-xl leading-relaxed">
            Join thousands of learners and experts sharing knowledge in our
            vibrant community. Teach what you know, learn what you love.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 shadow-lg px-8 py-4 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all transform"
            >
              Get Started Free
            </Link>
            <Link
              to="/skills"
              className="inline-block bg-white hover:bg-indigo-50 shadow-lg px-8 py-4 border-2 border-indigo-600 rounded-lg font-semibold text-indigo-600 text-lg hover:scale-105 transition-all transform"
            >
              Explore Skills
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto mb-20 max-w-4xl">
          <div className="bg-white shadow-lg p-8 rounded-xl text-center hover:scale-105 transition-all transform">
            <div className="mb-2 font-bold text-indigo-600 text-4xl">1000+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-xl text-center hover:scale-105 transition-all transform">
            <div className="mb-2 font-bold text-indigo-600 text-4xl">500+</div>
            <div className="text-gray-600">Skills Shared</div>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-xl text-center hover:scale-105 transition-all transform">
            <div className="mb-2 font-bold text-indigo-600 text-4xl">2000+</div>
            <div className="text-gray-600">Connections Made</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-20">
          <div className="bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow">
            <div className="mb-4 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="mb-4 font-semibold text-xl">Share Your Expertise</h3>
            <p className="text-gray-600">
              Transform your knowledge into opportunities. Help others grow
              while building your teaching portfolio.
            </p>
          </div>
          <div className="bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow">
            <div className="mb-4 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-4 font-semibold text-xl">Learn New Skills</h3>
            <p className="text-gray-600">
              Access a diverse range of skills taught by experts. Learn at your
              own pace through direct interactions.
            </p>
          </div>
          <div className="bg-white shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow">
            <div className="mb-4 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-bold text-indigo-600">4</span>
            </div>
            <h3 className="mb-2 font-semibold">Learn & Teach</h3>
            <p className="text-gray-600">Exchange skills and grow together</p>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <h2 className="mb-12 font-bold text-gray-900 text-3xl text-center">
            Explore Skills by Category
          </h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div
                key={category}
                className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900 text-xl">
                    {category}
                  </h3>
                  <span className="font-medium text-indigo-600 text-sm">
                    {skills.length} skills
                  </span>
                </div>
                <div className="space-y-2">
                  {skills.slice(0, 3).map((skill) => (
                    <p key={skill} className="text-gray-600">
                      {skill}
                    </p>
                  ))}
                </div>
                <Link
                  to={`/skills?category=${category}`}
                  className="inline-block mt-4 font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View all {category} skills →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-50 mb-20 p-12 rounded-2xl text-center">
          <h2 className="mb-6 font-bold text-gray-900 text-3xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Join our community today and start exchanging skills with passionate
            learners and teachers from around the world.
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-semibold text-white transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
