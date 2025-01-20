
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import JokeGenerator from "./pages/Jokes";
import ArticleSummarizer from "./pages/ArticleSummarizer";
import SpotifyDownloader from "./pages/SpotifyDownloader";
import Home from "./pages/Home";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-black text-white py-4 px-6 shadow-lg fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white font-semibold text-2xl">
          <Link to="/">Mutli-Task...</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="block md:hidden" onClick={toggleMenu}>
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navbar Links (Desktop version) */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-gray-300 font-semibold text-2xl">
            Home
          </Link>
          <Link to="/article-summarizer" className="text-purple-700 hover:text-purple-600 font-semibold text-2xl">
            Article Summarizer
          </Link>
          <Link to="/spotify-downloader" className="text-green-600 hover:text-green-500 font-semibold text-2xl">
            Spotify Downloader
          </Link>
          <Link to="/joke-generator" className="text-orange-600 hover:text-orange-500 font-semibold text-2xl">
            Joke Generator
          </Link>
        </div>
      </div>

      {/* Mobile Menu (toggle visibility on small screens) */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 right-0 bg-black text-center space-y-4 py-4`}
      >
        <Link
          to="/"
          className="text-white hover:text-gray-300 font-semibold text-xl block"
          onClick={toggleMenu}
        >
          Home
        </Link>
        <Link
          to="/article-summarizer"
          className="text-purple-700 hover:text-purple-600 font-semibold text-xl block"
          onClick={toggleMenu}
        >
          Article Summarizer
        </Link>
        <Link
          to="/spotify-downloader"
          className="text-green-600 hover:text-green-500 font-semibold text-xl block"
          onClick={toggleMenu}
        >
          Spotify Downloader
        </Link>
        <Link
          to="/joke-generator"
          className="text-orange-600 hover:text-orange-500 font-semibold text-xl block"
          onClick={toggleMenu}
        >
          Joke Generator
        </Link>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col pt-20"> {/* Added pt-20 for the navbar height */}
        {/* Persistent Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          {/* Content Container with Full Height and Centering */}
          <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article-summarizer" element={<ArticleSummarizer />} />
              <Route path="/spotify-downloader" element={<SpotifyDownloader />} />
              <Route path="/joke-generator" element={<JokeGenerator />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
