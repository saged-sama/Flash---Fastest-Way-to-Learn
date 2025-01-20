import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Heading from "../common/heading/heading";
import RecommendedCourses from "../course/RecommendedCourses";

const CoursesCard = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [courseDetails, setCourseDetails] = useState<any>(null);

  


  // Fetch most interacted course
  useEffect(() => {
    const fetchMostInteractedCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/api/collections/courseinteractions/most-interacted-course"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }

        const data = await response.json();
        setCourseData(data);

        // Set courseId if data is valid
        if (data && data[0]) {
          setCourseId(data[0][0]); // Assuming data[0][0] contains the course ID
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMostInteractedCourse();
  }, []);

  // Fetch course details using courseId
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return; // Avoid fetching if courseId is not set

      try {
        const response = await fetch(
          `http://localhost:8080/api/collections/course/records/${courseId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }

        const data = await response.json();
        setCourseDetails(data); // Assuming the API returns a course details object
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);




  if(!courseDetails){
    return <div>
      loading...
    </div>
  }

  return (
    <>
      <div className="container mx-auto items-center flex justify-center mb-10">
        <Heading
          subtitle="Recommended Courses For You"
          title="Explore Our Popular Online Courses"
        />
      </div>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto flex overflow-x-auto space-x-8 pb-4">
          
            
           

              {/* Display fetched course details */}
              <RecommendedCourses title={courseDetails.title}/>

                


              {/* Loading and error messages */}
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
           
      
        </div>
      </section>
    </>
  );
};

export default CoursesCard;