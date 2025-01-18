"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // Next.js's Link component for navigation
import { Bebas_Neue, Abel } from "next/font/google";
import { GiTeacher } from "react-icons/gi";
import logo_final from "../../../../public/images/logo_final.png";
import { usePathname } from "next/navigation";
import { useSpringBase } from "@/context/SpringBaseContext";
import Avatar from "../avatarMenu/avatar";
import { Dropdown, MenuProps } from "antd";
import UserDet from "../userdet";

const bebasNeue = Bebas_Neue({
  weight: "400", // Set the font weight to 400 (regular)
  subsets: ["latin"], // Specify the character subsets
  display: "swap", // Improve initial page load performance
});

const abel = Abel({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [showRoom, setShowRoom] = useState(false); // State to toggle Room component
  const {springbase} = useSpringBase();
  const pathname = usePathname();

  // Toggles Room component visibility
  const toggleRoom = () => setShowRoom(!showRoom);

  useEffect(() =>{
    if(!springbase){
      return;
    }
  }, [springbase]);
  // Toggles mobile menu visibility
  const handleClick = () => setClick(!click);
  

  const avatarItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <Link href={`/users/${springbase?.authStore.model.id}`} className="">
          <UserDet user={springbase?.authStore.model} />
        </Link>
      )
    },
    {
      key: 'logout',
      label: (
        <Link href="/api/auth/logout">
          <h1 className="text-red-400">Logout</h1>
        </Link>
      )
    }
  ];

  return (
    <header className="bg-gray-900  py-3 ">
      <nav className="flex justify-between items-center  container mx-auto rounded-3xl">
        <div>
          <Link href="/" className={`logo ${abel.className} container mx-auto`}>
            <h1
              style={{ fontSize: "35px" }}
              className="font-extrabold text-orange-300 flex  "
            >
              <img
                src={logo_final.src}
                alt="icon"
                className="w-8 h-8 mt-3 mr-1"
              />
              FLASH
            </h1>
            <span className="text-white text-bold">
              Learn Anything Faster Than Ever
            </span>
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <div>
          <ul
            className={`${
              click
                ? "absolute top-[7vh] left-0 w-full bg-teal-500 flex flex-col items-center py-4"
                : "flex space-x-10 items-center"
            }`}
            onClick={() => setClick(false)}
          >
            <li className="group relative hover:text-orange-400">
              <Link
                href="/about"
                className="text-white font-medium transition duration-500 ease-in-out hover:text-orange-300"
              >
                About Us
              </Link>
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-purple-500 transition-all duration-500 ease-in-out group-hover:w-full"></span>
            </li>

            <li className="group relative">
              <Link
                href="/course"
                className="text-white font-medium transition duration-500 ease-in-out hover:text-orange-300"
              >
                Courses
              </Link>
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-purple-500 transition-all duration-500 ease-in-out hover:text-orange-300 group-hover:w-full"></span>
            </li>

            <li className="group relative">
              <Link
                href="/journal"
                className="text-white font-medium transition duration-500 ease-in-out hover:text-orange-300"
              >
                Guideline
              </Link>
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-purple-500 transition-all duration-500 ease-in-out hover:text-orange-300 group-hover:w-full"></span>
            </li>

            <li className="group relative">
              <Link
                href="/subs/sessions"
                className="text-white font-medium transition duration-500 ease-in-out hover:text-orange-300"
              >
                Live Sessions
              </Link>
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-purple-500 transition-all duration-500 ease-in-out hover:text-orange-300 group-hover:w-full"></span>
            </li>
          </ul>
        </div>

        {/* Get Online Session Button with Room component */}
        {pathname === "/" && (
          <div>
            <Link
              href="/subs/sessions"
              className="bg-green-500 py-2 px-6 text-white font-semibold cursor-pointer rounded-3xl transform transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
            >
              <GiTeacher className="text-black" />{" "}
              {/* Set the icon color to black */}
              <span className="">GET STARTED</span>
              {showRoom} {/* Conditionally render the Room component */}
            </Link>
          </div>
        )}
        {(pathname !== "/" && springbase && springbase.authStore.isValid) && (
            <Dropdown menu={{ items: avatarItems }} placement="bottomRight" className="flex justify-center items-center gap-2 cursor-pointer">
              <div>
                <Avatar />
                <h1 className="text-white">
                  {springbase.authStore.model.name}
                </h1>
              </div>
            </Dropdown>
          )
        }

        {/* Mobile Menu Button */}
        {/* <button
        className="text-white border border-red-600 w-10 text-3xl absolute right-4 top-4 sm:hidden"
        onClick={handleClick}
        aria-label="Toggle Menu"
      >
        {click ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
      </button> */}
      </nav>
    </header>
  );
}
