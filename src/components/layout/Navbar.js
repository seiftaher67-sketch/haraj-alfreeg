import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../../services/api';

export default function Navbar({ onLoginClick }) {
  const [user, setUser] = useState(null);

  // Fetch user profile data from API
  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        // Update localStorage with latest data
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    },
    enabled: !!localStorage.getItem('token'), // Only fetch if user is logged in
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen for user updates (when profile is updated)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener('userUpdated', () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
      // Refetch profile data to ensure navbar is up to date
      if (localStorage.getItem('token')) {
        refetchProfile();
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userUpdated', () => {
        const updatedUser = localStorage.getItem('user');
        if (updatedUser) {
          setUser(JSON.parse(updatedUser));
        }
        // Refetch profile data to ensure navbar is up to date
        if (localStorage.getItem('token')) {
          refetchProfile();
        }
      });
    };
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNavItem, setSelectedNavItem] = useState("");
  const location = useLocation();

  // Update selected nav item based on current route
  useEffect(() => {
    const path = location.pathname;
    setSelectedNavItem(path);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);



  const handleNavItemClick = (path, e) => {
    // Update selected nav item
    setSelectedNavItem(path);

    // Close mobile menu when navigating
    if (isMenuOpen) {
      closeMenu();
    }
  };

  // Check if a nav item is active
  const isNavItemActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full">
      {/* top black bar */}
      <div className="bg-[#0b0b0b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto min-h-20 flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          {/* logo and search on small screens, logo on large */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/assets/images/images/55PNG.PNG"
                alt="الفريج"
                className="h-12 w-auto object-contain"
              />
            </Link>
            {/* search on small screens */}
            <div className="flex-1 sm:hidden">
              <div className="relative">
                <input
                  id="site-search"
                  placeholder="البحث في 500 شاحنة"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-black bg-white rounded-full py-2 px-3 pr-10 pl-10 shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-[#f2b400]/30"
                />
                {/* magnifier icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* centered search on large screens */}
          <div className="hidden sm:flex justify-center flex-1">
            <div className="w-full max-w-2xl px-4">
              <div className="relative">
                <input
                  id="site-search"
                  placeholder="البحث في 500 شاحنة"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-black bg-white rounded-full py-3 px-4 pr-12 pl-12 shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-[#f2b400]/30"
                />
                {/* magnifier icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* utility buttons */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
            {user ? (
              <span className="text-sm text-white whitespace-nowrap">
                أهلاً {user.name}
              </span>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-sm hover:text-white whitespace-nowrap"
              >
                تسجيل الدخول
              </button>
            )}
            <button className="flex items-center gap-1 text-sm text-white/90 hover:text-white whitespace-nowrap">
              <span>EN</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
             <Link
    to="/profile"
    className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:opacity-90 transition"
  >
    {user?.avatar ? (
      <img
        src={user.avatar.startsWith('http') ? user.avatar : `http://localhost:8000${user.avatar}`}
        alt="Profile"
        className="object-cover w-full h-full"
      />
    ) : (
      <img
        src="/assets/images/images/Frame 755.png"
        alt="Profile"
        className="object-cover w-full h-full"
      />
    )}
  </Link>
          </div>
        </div>
      </div>

      {/* yellow nav strip */}
      <nav className="bg-[#f2b400]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* main links */}
            <div className="hidden lg:flex items-center gap-8 text-[#0b0b0b] font-semibold">
              <Link
                to="/categories"
                onClick={(e) => handleNavItemClick("/categories", e)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isNavItemActive("/categories")
                    ? "bg-[#0b0b0b] text-white"
                    : "hover:bg-[#0b0b0b]/10"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                الفئات
              </Link>
              <Link
                to="/auctions"
                onClick={(e) => handleNavItemClick("/auctions", e)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isNavItemActive("/auctions")
                    ? "bg-[#0b0b0b] text-white"
                    : "hover:bg-[#0b0b0b]/10"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                المزادات
              </Link>
              <Link
                to="/live-broadcast"
                onClick={(e) => handleNavItemClick("/live-broadcast", e)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isNavItemActive("/live-broadcast") ||
                  (location.pathname === "/" &&
                    selectedNavItem === "/live-broadcast")
                    ? "bg-[#0b0b0b] text-white"
                    : "hover:bg-[#0b0b0b]/10"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                البث المباشر
              </Link>
              <Link
                to="/exhibitions"
                onClick={(e) => handleNavItemClick("/exhibitions", e)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isNavItemActive("/exhibitions")
                    ? "bg-[#0b0b0b] text-white"
                    : "hover:bg-[#0b0b0b]/10"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                المعروضات
              </Link>
              {user && (
                <Link
                  to="/advertisement"
                  onClick={(e) => handleNavItemClick("/advertisement", e)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isNavItemActive("/advertisement")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  إعلانات
                </Link>
              )}
              <Link
                to="/about"
                onClick={(e) => handleNavItemClick("/about", e)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isNavItemActive("/about")
                    ? "bg-[#0b0b0b] text-white"
                    : "hover:bg-[#0b0b0b]/10"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                من نحن
              </Link>
              {user && (
                <Link
                  to="/saved"
                  onClick={(e) => handleNavItemClick("/saved", e)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isNavItemActive("/saved")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  المفضلة
                </Link>
              )}
            </div>

            {/* hamburger menu button for mobile */}
            <button
              onClick={toggleMenu}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 text-[#0b0b0b] hover:opacity-80"
              aria-label="فتح القائمة"
            >
              <span
                className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                }`}
              ></span>
            </button>

            {/* left side (location or toggle) */}
            <div className="flex items-center gap-6 text-[#0b0b0b]">
              <a
                href="https://maps.app.goo.gl/XL6Jp84W9SLgSeoQ7?g_st=awb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 11.5a3 3 0 100-6 3 3 0 000 6z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 11.5c0 6-8.5 11.5-8.5 11.5S3.5 17.5 3.5 11.5a8.5 8.5 0 1117 0z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-bold">الموقع</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMenu}
          ></div>

          {/* menu panel */}
          <div className="absolute top-0 right-0 h-full w-80 bg-[#f2b400] shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col pt-20 px-6">
              {/* close button */}
              <button
                onClick={closeMenu}
                className="self-end mb-8 text-[#0b0b0b] hover:opacity-80"
                aria-label="إغلاق القائمة"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* menu links */}
              <nav className="flex flex-col space-y-6 text-[#0b0b0b] font-semibold">
                <Link
                  to="/categories"
                  onClick={(e) => {
                    handleNavItemClick("/categories", e);
                    closeMenu();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                    isNavItemActive("/categories")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  الفئات
                </Link>
                <Link
                  to="/auctions"
                  onClick={(e) => {
                    handleNavItemClick("/auctions", e);
                    closeMenu();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                    isNavItemActive("/auctions")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  المزادات
                </Link>
                <Link
                  to="/live-broadcast"
                  onClick={(e) => {
                    handleNavItemClick("/live-broadcast", e);
                    closeMenu();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                    isNavItemActive("/live-broadcast") ||
                    (location.pathname === "/" &&
                      selectedNavItem === "/live-broadcast")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  البث المباشر
                </Link>
                <Link
                  to="/exhibitions"
                  onClick={(e) => {
                    handleNavItemClick("/exhibitions", e);
                    closeMenu();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                    isNavItemActive("/exhibitions")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  المعروضات
                </Link>
                {user && (
                  <Link
                    to="/advertisement"
                    onClick={(e) => {
                      handleNavItemClick("/advertisement", e);
                      closeMenu();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                      isNavItemActive("/advertisement")
                        ? "bg-[#0b0b0b] text-white"
                        : "hover:bg-[#0b0b0b]/10"
                    }`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                    إعلانات
                  </Link>
                )}
                <Link
                  to="/about"
                  onClick={(e) => {
                    handleNavItemClick("/about", e);
                    closeMenu();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                    isNavItemActive("/about")
                      ? "bg-[#0b0b0b] text-white"
                      : "hover:bg-[#0b0b0b]/10"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  من نحن
                </Link>
                {user && (
                  <Link
                    to="/saved"
                    onClick={(e) => {
                      handleNavItemClick("/saved", e);
                      closeMenu();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-lg ${
                      isNavItemActive("/saved")
                        ? "bg-[#0b0b0b] text-white"
                        : "hover:bg-[#0b0b0b]/10"
                    }`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    المفضلة
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
