import React from "react"
import Back from "../common/back/Back"
import CoursesCard from "@/components/allcourses/CourseCard";
import OnlineCourses from "@/components/allcourses/OnlineCourses";

const CourseHome = () => {
  return (
    <>
      <CoursesCard />
      <OnlineCourses />
    </>
  )
}

export default CourseHome