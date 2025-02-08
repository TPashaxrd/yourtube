import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            id="menu-toggle"
            className="lg:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="flex">
          <img src="https://cdn.discordapp.com/attachments/1284196060692217867/1337465381857525770/YOURTUBE.png?ex=67a78b33&is=67a639b3&hm=64d7e6cddfe647936fca349875656e35d7dfa990d8a8c9cfb61af4abf1e8c02f&" style={{ height: '35px' }}  alt="YourTubes IMG"/>
          <a href="/" className="text-xl cursor:pointer hover:text-red-500 font-bold text-gray-800 dark:text-white ml-3">
            <a className="cursor:pointer">YourTubes</a>
          </a>
          </div>
        </div>
        <div className="hidden lg:flex flex-grow mx-10">
          <input
            type="text"
            placeholder="Ara..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full focus:outline-none">
            {isDarkMode ? '🌙' : '☀️'}
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;