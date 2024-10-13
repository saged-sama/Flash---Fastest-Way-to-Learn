import React from "react"
import Back from "../common/back/Back"
import CoursesCard from "./CourseCard";
import OnlineCourses from "./OnlineCourses";

const CourseHome = () => {
  return (
    <>
      <CoursesCard />
      <OnlineCourses />
    </>
  )
}

export default CourseHome