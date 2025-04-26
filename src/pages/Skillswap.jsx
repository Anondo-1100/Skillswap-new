import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { skillCategories } from "../data/skillsList";
import "../index.css"; // For custom CSS that can't be done with Tailwind

const SkillSwap = () => {
  return (
    <div className="relative">
      <Loader />
      <FixedImage />
      <Main />
      <Footer />
    </div>
  );
};

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed w-full h-full bg-black z-50 flex items-center justify-center transition-all duration-700 ${
        show ? "top-0" : "-top-full"
      }`}
    >
      <h1 className="loader-text absolute text-4xl md:text-4xl">SHARE</h1>
      <h1 className="loader-text absolute text-4xl md:text-4xl animation-delay-2">
        LEARN
      </h1>
      <h1 className="loader-text absolute text-4xl md:text-4xl animation-delay-3">
        CONNECT
      </h1>
    </div>
  );
};

const FixedImage = () => {
  const [display, setDisplay] = useState("none");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div
      id="fixed-image"
      className="fixed h-72 w-64 md:h-96 md:w-80 rounded-lg z-40 left-1/2 top-1/4 bg-cover bg-center"
      style={{ display, backgroundImage: `url(${imageUrl})` }}
      data-image-url={imageUrl}
    />
  );
};

const Main = () => {
  return (
    <div id="main" className="relative z-10">
      <Page1 />
      <Page2 />
      <Page3 />
      <SkillCategories />
      <CtaSection />
      <FullScreen />
    </div>
  );
};

const Page1 = () => {
  return (
    <div id="page1" className="min-h-screen w-full bg-[#EFEAE3] relative px-2">
      <Navigation />
      <Center />
      <HeroShape />
      <video
        autoPlay
        loop
        muted
        className="relative rounded-lg md:rounded-3xl mt-16 w-full"
        src="/api/placeholder/800/500" // Replace with actual video path
      />
    </div>
  );
};

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    // This will be connected to the FullScreen component
    const fullScr = document.querySelector("#full-scr");
    const navImg = document.querySelector("nav img");

    if (!menuOpen) {
      fullScr.style.top = "0";
      navImg.style.opacity = "0";
    } else {
      fullScr.style.top = "-100%";
      navImg.style.opacity = "1";
    }
  };

  return (
    <nav className="py-8 w-full flex items-center relative z-40 justify-between">
      <div className="text-2xl font-bold text-[#FE320A]">SkillSwap</div>
      <div id="nav-part2" className="hidden md:flex items-center gap-4">
        <h4 className="px-5 py-2 border border-[#0000003c] rounded-full font-medium text-[#000000bb] transition-all duration-400 relative overflow-hidden group">
          <Link to="/skills" className="relative z-10 group-hover:text-white">
            Skills
          </Link>
        </h4>
        <h4 className="px-5 py-2 border border-[#0000003c] rounded-full font-medium text-[#000000bb] transition-all duration-400 relative overflow-hidden group">
          <Link to="/about" className="relative z-10 group-hover:text-white">
            About
          </Link>
        </h4>
        <h4 className="px-5 py-2 border border-[#0000003c] rounded-full font-medium text-[#000000bb] transition-all duration-400 relative overflow-hidden group">
          <Link to="/contact" className="relative z-10 group-hover:text-white">
            Contact
          </Link>
        </h4>
      </div>
      <h3
        onClick={handleMenuClick}
        className="md:hidden block px-6 py-3 border border-gray-400 rounded-full text-base font-light pl-10"
      >
        Menu
      </h3>
    </nav>
  );
};

const Center = () => {
  return (
    <div
      id="center"
      className="h-64 md:h-[65vh] w-full flex md:flex-row flex-col-reverse items-end justify-between border-b border-[#0000003c] pb-10 md:pb-10 px-5 md:px-0 relative z-10"
    >
      <div id="left" className="md:w-1/4">
        <h3 className="md:text-xl text-lg md:w-full w-4/5 md:leading-8 leading-6">
          Join thousands of learners and experts sharing knowledge in our
          vibrant community. Teach what you know, learn what you love.
        </h3>
      </div>
      <div id="right">
        <h1 className="md:text-8xl text-6xl text-right md:leading-tight leading-snug">
          UNLOCK <br />
          YOUR <br />
          POTENTIAL
        </h1>
      </div>
    </div>
  );
};

const HeroShape = () => {
  return (
    <div
      id="hero-shape"
      className="absolute w-[46vw] h-[36vw] right-0 top-[65vh] md:block hidden"
    >
      <div
        id="hero-1"
        className="bg-[#FE320A] h-full w-full rounded-l-full absolute blur-md"
      ></div>
      <div
        id="hero-2"
        className="bg-gradient-to-tr from-[#FE320A] to-[#fe3f0a] h-[30vw] w-[30vw] rounded-full absolute blur-xl hero-animation-2"
      ></div>
      <div
        id="hero-3"
        className="bg-gradient-to-tr from-[#FE320A] to-[#fe3f0a] h-[30vw] w-[30vw] rounded-full absolute blur-xl hero-animation-1"
      ></div>
    </div>
  );
};

const Page2 = () => {
  return (
    <div
      id="page2"
      className="min-h-screen w-full bg-[#EFEAE3] py-16 md:py-32 relative"
    >
      <MovingText />
      <StatsSection />
      <div
        id="gooey"
        className="absolute h-64 w-64 md:h-[32vw] md:w-[32vw] rounded-full bg-gradient-to-tr from-[#ff2d03] to-[#ff5c0b] top-[58%] left-1/4 blur-lg gooey-animation"
      ></div>
    </div>
  );
};

const MovingText = () => {
  return (
    <div id="moving-text" className="overflow-x-auto whitespace-nowrap">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="whitespace-nowrap inline-block moving-text-animation"
        >
          <h1 className="text-6xl md:text-8xl inline-block">SHARE</h1>
          <div className="h-6 w-6 md:h-16 md:w-16 rounded-full bg-[#FE320A] inline-block mx-8"></div>
          <h1 className="text-6xl md:text-8xl inline-block">LEARN</h1>
          <div className="h-6 w-6 md:h-16 md:w-16 rounded-full bg-[#FE320A] inline-block mx-8"></div>
          <h1 className="text-6xl md:text-8xl inline-block">CONNECT</h1>
          <div className="h-6 w-6 md:h-16 md:w-16 rounded-full bg-[#FE320A] inline-block mx-8"></div>
        </div>
      ))}
    </div>
  );
};

const StatsSection = () => {
  return (
    <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto mb-20 max-w-4xl px-4 md:px-0 mt-20">
      <div className="bg-[#EFEAE3] shadow-lg p-8 rounded-xl text-center hover:scale-105 transition-all transform border border-[#0000001c]">
        <div className="mb-2 font-bold text-[#FE320A] text-4xl">1000+</div>
        <div className="text-gray-600">Active Users</div>
      </div>
      <div className="bg-[#EFEAE3] shadow-lg p-8 rounded-xl text-center hover:scale-105 transition-all transform border border-[#0000001c]">
        <div className="mb-2 font-bold text-[#FE320A] text-4xl">500+</div>
        <div className="text-gray-600">Skills Shared</div>
      </div>
      <div className="bg-[#EFEAE3] shadow-lg p-8 rounded-xl text-center hover:scale-105 transition-all transform border border-[#0000001c]">
        <div className="mb-2 font-bold text-[#FE320A] text-4xl">2000+</div>
        <div className="text-gray-600">Connections Made</div>
      </div>
    </div>
  );
};

const Page3 = () => {
  return (
    <div
      id="page3"
      className="min-h-screen w-full bg-[#EFEAE3] py-16 px-4 md:px-16"
    >
      <h2 className="mb-12 font-bold text-gray-900 text-3xl text-center">
        Our Features
      </h2>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-20">
        <div className="bg-[#EFEAE3] shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow border border-[#0000001c]">
          <div className="mb-4 text-[#FE320A]">
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
            Transform your knowledge into opportunities. Help others grow while
            building your teaching portfolio.
          </p>
        </div>
        <div className="bg-[#EFEAE3] shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow border border-[#0000001c]">
          <div className="mb-4 text-[#FE320A]">
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
        <div className="bg-[#EFEAE3] shadow-lg hover:shadow-xl p-8 rounded-xl transition-shadow border border-[#0000001c]">
          <div className="mb-4 text-[#FE320A]">
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
          </div>
          <h3 className="mb-4 font-semibold text-xl">Connect & Grow</h3>
          <p className="text-gray-600">
            Exchange skills and grow together in our vibrant community of
            passionate learners and teachers.
          </p>
        </div>
      </div>
    </div>
  );
};

const SkillCategories = () => {
  return (
    <div className="mb-20 bg-[#EFEAE3] px-4 md:px-16 py-16">
      <h2 className="mb-12 font-bold text-gray-900 text-3xl text-center">
        Explore Skills by Category
      </h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div
            key={category}
            className="bg-[#EFEAE3] shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow border border-[#0000001c]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900 text-xl">
                {category}
              </h3>
              <span className="font-medium text-[#FE320A] text-sm">
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
              className="inline-block mt-4 font-medium text-[#FE320A] hover:text-[#ff5c0b]"
            >
              View all {category} skills →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const CtaSection = () => {
  return (
    <div className="bg-[#EFEAE3] mb-20 px-4 md:px-16 pb-16">
      <div className="bg-[#f8f4ed] p-12 rounded-2xl text-center border border-[#0000001c] shadow-lg">
        <h2 className="mb-6 font-bold text-gray-900 text-3xl">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600">
          Join our community today and start exchanging skills with passionate
          learners and teachers from around the world.
        </p>
        <Link
          to="/register"
          className="inline-block bg-[#FE320A] hover:bg-[#ff5c0b] px-8 py-4 rounded-lg font-semibold text-white transition-colors shadow-lg"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

const FullScreen = () => {
  return (
    <div
      id="full-scr"
      className="h-screen w-full bg-black bg-opacity-40 fixed z-40 -top-full transition-all duration-500"
    >
      <div id="full-div1" className="h-1/2 w-full bg-[#EFEAE3] rounded-b-lg">
        <div className="p-10">
          <Link
            to="/skills"
            className="block text-3xl mb-4 hover:text-[#FE320A]"
          >
            Skills
          </Link>
          <Link
            to="/register"
            className="block text-3xl mb-4 hover:text-[#FE320A]"
          >
            Register
          </Link>
          <Link
            to="/about"
            className="block text-3xl mb-4 hover:text-[#FE320A]"
          >
            About
          </Link>
          <Link to="/contact" className="block text-3xl hover:text-[#FE320A]">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div
      id="footer"
      className="fixed h-[105vh] w-full bg-black text-white z-[9] bottom-0 flex justify-end flex-col p-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
          <h3 className="text-2xl mb-4">About SkillSwap</h3>
          <p className="text-gray-400">
            SkillSwap is a vibrant community platform where you can teach what
            you know and learn what you love.
          </p>
        </div>
        <div>
          <h3 className="text-2xl mb-4">Quick Links</h3>
          <Link
            to="/skills"
            className="block text-gray-400 hover:text-white mb-2"
          >
            Browse Skills
          </Link>
          <Link
            to="/about"
            className="block text-gray-400 hover:text-white mb-2"
          >
            About Us
          </Link>
          <Link to="/contact" className="block text-gray-400 hover:text-white">
            Contact
          </Link>
        </div>
        <div>
          <h3 className="text-2xl mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <h1 className="text-8xl md:text-[23vw] text-[#FE320A]">SkillSwap</h1>
      <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
        © 2025 SkillSwap. All rights reserved.
      </div>
    </div>
  );
};

export default SkillSwap;
