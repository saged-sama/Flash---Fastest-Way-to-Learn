import React from "react"
import { online } from "../../dummydata"
import Heading from "../common/heading/heading"
import "./courses.css"

import { Bebas_Neue, Abel } from 'next/font/google';


const bebasNeue = Bebas_Neue({
  weight: '400', // Set the font weight to 400 (regular)
  subsets: ['latin'], // Specify the character subsets 
  display: 'swap', // Improve initial page load performance
});

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <div className='container mx-auto my-10'>

          <div className="container mx-auto items-center flex justify-center mb-10 ">
            <h2 className={` ${bebasNeue.className} text-6xl font-extrabold text-orange-600`}>COURSES</h2>
            {/* <Heading subtitle='COURSES' title='Browse Our Online Courses' /> */}
          </div>
          <div className='content grid grid-cols-1 md:grid-cols-3 gap-4  '>
            {online.map((val) => (
              <div className='box shadow-2xl border'>
                <div className='img '>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses