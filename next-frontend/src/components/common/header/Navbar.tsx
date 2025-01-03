import React, { useState } from "react";
import Link from "next/link";  // Next.js's Link component for navigation

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [showRoom, setShowRoom] = useState(false);  // State to toggle Room component

  // Toggles Room component visibility
  const toggleRoom = () => setShowRoom(!showRoom);


  // Toggles mobile menu visibility
  const handleClick = () => setClick(!click);

  return (<header className="bg-gray-900  bg-opacity-80 py-3 ">
    <nav className="flex justify-between items-center  container mx-auto rounded-3xl">



      {/* Centered Navigation Links */}
      <div className="flex-grow ">
        <ul
          className={`${click
            ? "absolute top-[7vh] left-0 w-full bg-teal-500 flex flex-col items-center py-4"
            : "flex space-x-10 items-center"
            }`}
          onClick={() => setClick(false)}
        >
          <li>
            <Link href="/about" className="text-white font-medium hover:text-teal-500 transition duration-300">
              About Us
            </Link>
          </li>


          <li>
            <Link href="/courses" className="text-white font-medium hover:text-teal-500 transition duration-300">
              Courses
            </Link>
          </li>
          <li>
            <Link href="/journal" className="text-white font-medium hover:text-teal-500 transition duration-300">
              Guideline
            </Link>
          </li>
          <li>
            <Link href="/subs/sessions" className="text-white font-medium hover:text-teal-500 transition duration-300">
              Live Sessions
            </Link>
          </li>
        </ul>
      </div>

      {/* Get Online Session Button with Room component */}
      <Link href="/subs/sessions"
        className="bg-orange-400 py-2 px-6 text-white font-semibold cursor-pointer rounded-3xl transform transition-all duration-300 ease-in-out hover:bg-teal-400 hover:shadow-lg hover:scale-105"
      // Toggle Room component on click
      >
        <span>ONLINE SESSIONS</span>
        {showRoom}  {/* Conditionally render the Room component */}
      </Link>


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
  )
}