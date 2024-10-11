import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../App";
import netflixLogo from "../../../stocks/image/netflix_logo.png";
import { NavLink } from "react-router-dom";
import { SearchContext } from "../Home";

function Header() {
  const { user, signOutUser } = useContext(UserContext);
  const { handleSearch } = useContext(SearchContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 800) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleLogout = () => {
    signOutUser();
    setIsDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-5">
        <div className="flex items-center space-x-8">
          <NavLink to="/">
            <img src={netflixLogo} alt="Netflix Logo" className="w-44" />
          </NavLink>
          <ul className="flex space-x-6 text-white">
            <li className="cursor-pointer hover:text-gray-300">Popular</li>
            <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300">Movies</li>
            <li className="cursor-pointer hover:text-gray-300">My List</li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
            className="px-4 py-2 rounded bg-gray-700 text-white"
          />
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="User Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute px-3 py-10 top-14 right-0 mt-2 w-48 bg-gray-900 rounded shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block bg-red-600 rounded-lg  text-white p-3 w-full"
                >
                Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
