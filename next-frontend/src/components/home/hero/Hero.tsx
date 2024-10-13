import React from "react";
import Heading from "@/components/common/heading/heading";

const Hero = () => {
  return (
    <>
      <section
        className="relative hero bg-cover bg-center h-[80vh] text-white flex items-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }} // Use the correct path to your image
      >
        <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div> {/* Dark overlay for contrast */}
        <div className="container mx-auto flex flex-col lg:flex-row items-center h-full px-6 lg:px-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center w-full lg:w-1/2 text-center lg:text-left">
            <Heading title="WELCOME TO FLASH" subtitle="The Fastest Way to Learn Anything Online" />
            <p className="mt-4 text-lg md:text-xl lg:text-2xl">
              Unlock knowledge at lightning speed with Flash, the fastest way to learn anything. Dive into a world where efficiency meets understanding, and accelerate your learning journey today.
            </p>

            <div className="button mt-6 flex justify-center lg:justify-start space-x-4">
              <button className="primary-btn bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">
                GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
              </button>
              <button className="border border-teal-500 text-teal-500 py-3 px-6 rounded-lg shadow-lg hover:bg-teal-500 hover:text-white transition duration-300">
                VIEW COURSE <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex lg:w-1/2 justify-center mt-8 lg:mt-0">
            <img
              src="/images/pic1.avif"
              alt="Learning Graphic"
              className="w-full h-full rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
    
    </>
  );
};

export default Hero;
