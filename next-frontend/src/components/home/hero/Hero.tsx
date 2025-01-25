"use client";
import React, { useState, useEffect } from "react";
import Heading from "../../common/heading/heading";
import { Bebas_Neue, Abel } from 'next/font/google';
import Link from 'next/link';

// import { Player } from 'lottie-react';
import dynamic from 'next/dynamic';
import animationData from '../../../../public/animations/home.json';


const Player = dynamic(() => import('lottie-react'), { ssr: false });

const bebasNeue = Bebas_Neue({
  weight: '400', // Set the font weight to 400 (regular)
  subsets: ['latin'], // Specify the character subsets 
  display: 'swap', // Improve initial page load performance
});

const abel = Abel({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Hero = () => {

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch("/animations/home.json");
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <>
      <section
        className="relative  bg-white text-black bg-cover bg-center   flex items-center"
      // style={{ backgroundImage: "url('/images/background.jpg')", opacity: 0.9 }} // Use the correct path to your image
      >
        <div className="absolute inset-0 bg-black opacity-80 z-[-1]"></div> {/* Dark overlay for contrast */}
        <div className="container mx-auto flex flex-col lg:flex-row items-center h-full mb-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 text-center lg:text-left">
            {/* <Heading title="WELCOME TO FLASH" subtitle="The Fastest Way to Learn Anything Online" /> */}
            {/* <h3 className="logo text-6xl font-extrabold">WELCOME TO FLASH</h3> */}
            <h1 className={`logo ${bebasNeue.className}  text-7xl font-extrabold `}  >The <span className="text-orange-400">Fastest</span> Way <br /> to <span className="text-sky-600">Learn</span>  Anything <br /> <span className="text-red-700">Online </span></h1>

            <p className="mt-4 text-xl ">
              Unlock knowledge at lightning speed with Flash, <br /> The fastest way to learn anything. Dive into a world where efficiency meets understanding, and accelerate your learning journey today.
            </p>

            <div className="button mt-6 flex justify-center lg:justify-start space-x-4">
              <Link href="/auth/register" className="primary-btn font-semibold bg-orange-600  py-3 px-6 rounded-lg shadow-2xl hover:bg-orange-400 transition duration-300">
                GET STARTED <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
              <Link href="/auth/login" className=" primary-btn border-2 font-semibold  py-3 px-10  rounded-lg shadow-2xl hover:bg-orange-600 hover:text-white transition duration-300">
                SIGN IN <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex lg:w-1/2 justify-center mt-8 lg:mt-0">
            {/* <img
              src="/images/pic1.avif"
              alt="Learning Graphic"
              className="w-full h-full rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            /> */}
            <div className=" ">
              {animationData ? (
                <Player
                  animationData={animationData}
                  loop
                  autoplay
                  style={{ height: "500px", width: "650px" }}
                />
              ) : (
                <p>Loading animation...</p>
              )}
            </div>
          </div>
        </div>
      </section >

    </>
  );
};

export default Hero;
