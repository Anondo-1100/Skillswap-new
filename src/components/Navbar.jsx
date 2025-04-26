import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../hooks/useNotifications";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-2xl">
              SkillSwap
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 ml-10">
              <Link
                to="/skills"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Browse Skills
              </Link>
              <Link
                to="/skillswap"
                className="hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Sundown
              </Link>
              {user ? (
                <>
                  <Link
                    to="/messages"
                    className="relative hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    Messages
                    {unreadCount > 0 && (
                      <span className="-top-1 -right-1 absolute bg-red-500 px-2 py-1 rounded-full text-white text-xs">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hover:bg-indigo-500 px-3 py-2 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white hover:bg-indigo-50 px-3 py-2 rounded-md text-indigo-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex justify-center items-center hover:bg-indigo-500 p-2 rounded-md focus:outline-none hover:text-white"
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 sm:px-3 pt-2 pb-3">
            <Link
              to="/skills"
              className="block hover:bg-indigo-500 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Skills
            </Link>
            {user ? (
              <>
                <Link
                  to="/messages"
                  className="block relative hover:bg-indigo-500 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                  {unreadCount > 0 && (
                    <span className="bg-red-500 ml-2 px-2 py-1 rounded-full text-white text-xs">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="block hover:bg-indigo-500 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block hover:bg-indigo-500 px-3 py-2 rounded-md w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:bg-indigo-500 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white hover:bg-indigo-50 px-3 py-2 rounded-md text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
