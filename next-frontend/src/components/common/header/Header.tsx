"use client";

import React, { useState } from "react";
import Link from "next/link";  // Next.js's Link component for navigation
import Head from "./Head";  // Custom Head component
import { useRouter } from "next/router"; 

const Header: React.FC = () => {
  const [click, setClick] = useState(false);
  const [showRoom, setShowRoom] = useState(false);  // State to toggle Room component

    // Toggles Room component visibility
    const toggleRoom = () => setShowRoom(!showRoom);


  // Toggles mobile menu visibility
  const handleClick = () => setClick(!click);

  return (
    <>
      <Head />
      <header className="bg-gray-800 bg-opacity-80 py-3">
        <nav className="flex justify-between items-center px-4">
          
          

          {/* Centered Navigation Links */}
          <div className="flex-grow">
            <ul
              className={`${
                click
                  ? "absolute top-[7vh] left-0 w-full bg-teal-500 flex flex-col items-center py-4"
                  : "flex justify-center space-x-10 items-center"
              }`}
              onClick={() => setClick(false)}
            >
              <li>
                <Link href="/" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  Personal Guideline
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white font-medium hover:text-teal-500 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

         {/* Get Online Session Button with Room component */}
         <div
            className="bg-teal-500 py-2 px-6 text-white font-semibold cursor-pointer"
            onClick={toggleRoom}  // Toggle Room component on click
          >
            <span>GET ONLINE SESSION</span>
            {showRoom }  {/* Conditionally render the Room component */}
          </div>


          {/* Mobile Menu Button */}
          <button
            className="text-white text-3xl absolute right-4 top-4 sm:hidden"
            onClick={handleClick}
            aria-label="Toggle Menu"
          >
            {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
