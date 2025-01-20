"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChapters } from "@/lib/course/chapter";
import { useSpringBase } from "@/context/SpringBaseContext";
import { objectToFormData } from "@/lib/utils";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();
  const { springbase } = useSpringBase();

  useEffect(() => {
    if (!springbase) return;

    const fetchAndRedirect = async () => {

      try {
        const chapters = await getChapters(springbase!, params.courseId, true);

        //change -> request (course name) // -arr 
        // arr traverse [1,2,3,1]

        if (chapters.length > 0) {
          router.push(`/course/courses/${params.courseId}/chapters/${chapters[0].id}`);
        } else {
          console.error("No chapters found. Redirecting to fallback.");
          router.push(`/course/courses/${params.courseId}/chapters/not-found`);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
        router.push(`/course/courses/${params.courseId}/chapters/error`);
      }
    };
    fetchAndRedirect();
  }, [params.courseId, router, springbase]);

  // Optionally show a loading state
  return <div>Loading...</div>;
};

export default CourseIdPage;
