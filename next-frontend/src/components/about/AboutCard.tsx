import React from "react";
import Heading from "../common/heading/heading";
import { homeAbout } from "../../dummydata";

const AboutCard = () => {
  return (
    <>

<Heading subtitle="LEARN FROM THE BEST" title="Expert Help, Online Classes, and AI Guidance!" />
      <section className="aboutHome py-2">
  <div className="container mx-auto flex flex-wrap justify-between items-center">
    {/* Left (Image Section) */}
    <div className="left w-full md:w-1/2">
      <img src="./images/study_laptop.jpg" alt="Study Laptop" className="w-full h-auto object-cover rounded-lg shadow-lg" />
    </div>
    
    {/* Right (Text and Items Section) */}
    <div className="right w-full md:w-1/2 px-4 md:px-8 flex flex-col justify-center"> {/* Added flex-col justify-center */}
    
      <div className="items ">
        {homeAbout.map((val, index) => (
          <div key={index} className="item bg-white mt-8 p-6 rounded-lg shadow-md hover:bg-teal-500 hover:text-white transition duration-300 ease-in-out cursor-pointer flex items-center space-x-6">
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
  
    </>
  );
};

export default AboutCard;
