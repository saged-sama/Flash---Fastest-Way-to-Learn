"use client";
import React, { useState, useEffect } from "react";
import Heading from "../common/heading/heading";
import { homeAbout } from "../../dummydata";

import dynamic from 'next/dynamic';
import animationData from '../../../public/animations/mentors.json';
import { Bebas_Neue, Abel } from 'next/font/google';


const bebasNeue = Bebas_Neue({
  weight: '400', // Set the font weight to 400 (regular)
  subsets: ['latin'], // Specify the character subsets 
  display: 'swap', // Improve initial page load performance
});

const Player = dynamic(() => import('lottie-react'), { ssr: false });


const AboutCard = () => {

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      const response = await fetch("/animations/mentors.json");
      const data = await response.json();
      setAnimationData(data);
    };

    fetchAnimation();
  }, []);

  return (
    <div className="h-screen">



      <div className="container mx-auto items-center flex justify-center mb-10 ">
        <h1 className={` ${bebasNeue.className} text-6xl font-extrabold`}> <span className="text-purple-700">LEARN</span>  FROM THE <span className="text-orange-400">BEST</span> </h1>
        {/* <Heading subtitle="LEARN FROM THE BEST" title="Expert Help, Online Classes, and AI Guidance!" /> */}
      </div>
      <section className="aboutHome py-2">
        <div className="container mx-auto flex flex-wrap justify-between items-center ">
          {/* Left (Image Section) */}
          <div className="left w-1/2">
            <div className="">
              {animationData ? (
                <Player
                  animationData={animationData}
                  loop
                  autoplay
                  style={{ height: "500px", width: "700px" }}
                />
              ) : (
                <p>Loading animation...</p>
              )}
            </div>

            {/* <img src="./images/study_laptop.jpg" alt="Study Laptop" className="w-full h-auto object-cover rounded-lg shadow-lg" /> */}
          </div>

          {/* Right (Text and Items Section) */}
          <div className="right w-1/2 px-10 flex flex-col justify-center"> {/* Added flex-col justify-center */}

            <div className="items ">
              {homeAbout.map((val, index) => (
                <div key={index} className="item bg-white mt-8 p-6 rounded-lg shadow-xl hover:bg-orange-100 transition duration-300 ease-in-out cursor-pointer flex items-center space-x-6">
                  <div className="img w-24">
                    <img src={val.cover} alt={val.title} className="w-16 h-16 object-cover rounded-full" />
                  </div>
                  <div className="text">
                    <h2 className="text-xl font-semibold mb-3">{val.title}</h2>
                    <p className="text-gray-600 group-hover:text-white">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutCard;
