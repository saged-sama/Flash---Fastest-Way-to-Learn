import React from "react";
import { coursesCard } from "../../dummydata";
import Heading from "../common/heading/heading";

const CoursesCard = () => {
  return (
    <>
      <div className="container mx-auto items-center flex justify-center mb-10 ">

        <Heading subtitle="Our Courses" title="Explore Our Popular Online Courses" />
      </div>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto flex overflow-x-auto space-x-8 pb-4"> {/* Added flex and overflow-x-auto */}
          {coursesCard.map((val, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex-none"> {/* Added flex-none */}
              <div className="flex mb-6 justify-start  ">
                {/* <div className="w-20 h-20 bg-customGreen rounded-full p-2 border border-red-600">
                  <img
                    src={val.cover}
                    alt={val.coursesName}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div> */}
                <div className="">
                  <h1 className="text-2xl font-semibold mb-2 text-black">{val.coursesName}</h1>
                  <div className="flex text-customGreen mb-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <span className=" text-sm text-gray-600">(5.0)</span>
                  </div>
                  <div className="text-gray-500">
                    {val.courTeacher.map((details, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <div className="rounded-full w-12 h-12">
                          <img
                            src={details.dcover}
                            alt={details.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-black">{details.name}</h4>
                          <span className="text-sm text-customGreen">{details.totalTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
                <h3 className="text-lg font-medium text-customGreen">
                  {val.priceAll} / {val.pricePer}
                </h3>
              </div>
              <button className="w-full bg-white text-customGreen py-2 rounded-lg border border-customGreen hover:bg-orange-300 hover:font-semibold  transition-colors transform hover:scale-105 hover:shadow-lg">
                ENROLL NOW!
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
