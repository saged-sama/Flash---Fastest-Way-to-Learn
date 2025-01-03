"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChapters } from "@/lib/course/chapter";

const CourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const chapters = await getChapters(params.courseId, true);

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
  }, [params.courseId, router]);

  // Optionally show a loading state
  return <div>Loading...</div>;
};

export default CourseIdPage;
