"use client";

import { useState, useEffect } from "react";
import { getChapters } from "@/lib/course/chapter";
import { getCourse } from "@/lib/course/course";
import { getUserProgress } from "@/lib/course/user-progress";
import { CourseSidebar } from "./_components/course-sidebar";
import { Chapter, Course, UserProgress } from "@/app/course/models/model";
import { CourseNavbar } from "./_components/course-navbar";
import { getProgress } from "@/lib/course/get-progress";
import { useSpringBase } from "@/context/SpringBaseContext";
import Header from "@/components/common/header/Header";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { objectToFormData } from "@/lib/utils";

interface ChapterWithProgress extends Chapter {
  userProgress: UserProgress;
}

const CourseLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [chaptersWithProgress, setChaptersWithProgress] = useState<
    ChapterWithProgress[]
  >([]);
  const [progressPercentage, setProgressPercentage] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const { springbase } = useSpringBase();

  useEffect(() => {
    if (!springbase) return;

    // const saveInteraction = async() => {
    //   const interaction = await springbase.collection("/api/collections/courseinteractions/records").create(objectToFormData({
    //     courseId: params.courseId,
    //     userId: springbase.authStore.model.id
    //   }));
    //   console.log("Interaction: ", interaction);
    // }

    // const saveInteraction = async () => {
    //   try {
    //     console.log("saveInteraction triggered");
    
    //     // Validate springbase and parameters
    //     if (!springbase) {
    //       console.error("Springbase is undefined");
    //       return;
    //     }
    //     if (!params.courseId || !springbase.authStore?.model?.id) {
    //       console.error("Missing courseId or userId");
    //       return;
    //     }
    
    //     console.log("Course ID:", params.courseId);
    //     console.log("User ID:", springbase.authStore.model.id);
    
    //     const response = await fetch("/api/collections/courseinteractions/records", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         courseId: params.courseId,
    //         userId: springbase.authStore.model.id,
    //       }),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.statusText}`);
    //     }
    
    //     const interaction = await response.json();
    //     console.log("Interaction saved:", interaction);
    //   } catch (error) {
    //     console.error("Failed to save interaction:", error);
    //   }
    // };


    const fetchData = async () => {
      try {

        console.log("Fetching data...");
       // saveInteraction(); // Trigger saveInteraction
        setLoading(true);

        // Fetch course details and chapters
        const courseData = await getCourse(springbase, params.courseId);
        const chaptersData = await getChapters(
          springbase,
          params.courseId,
          true
        );
        const progress = await getProgress(params.courseId, springbase);

        // Fetch user progress for each chapter individually
        const chaptersWithProgressData = await Promise.all(
          chaptersData.map(async (chapter: Chapter) => {
            const userProgress = await getUserProgress(springbase, chapter.id);
            return {
              ...chapter,
              userProgress: userProgress || 0, // Use default 0 if no progress is found
            };
          })
        );

        setCourse(courseData);
        setChaptersWithProgress(chaptersWithProgressData);
        setProgressPercentage(progress);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

   
    fetchData();
  }, [springbase, params.courseId]);

  if (loading) {
    return <div>Loading course...</div>;
  }

  //   return (
  //     <div className="h-full">
  //       <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
  //         <CourseNavbar
  //           course={course}
  //           chapters={chaptersWithProgress}
  //           progress={progressPercentage}
  //         />
  //       </div>
  //       <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
  //         <CourseSidebar
  //           course={course}
  //           chapters={chaptersWithProgress}
  //           progress={progressPercentage}
  //         />
  //       </div>
  //       <main className="md:pl-80 pt-[80px] h-full">{children}</main>
  //     </div>
  //   );

  return (
    <div className="h-full">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <div className="h-[60px] md:pl-80 fixed top-[100px] w-full">
        <CourseNavbar
          course={course}
          chapters={chaptersWithProgress}
          progress={progressPercentage}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed top-[100px] z-40">
        <CourseSidebar
          course={course}
          chapters={chaptersWithProgress}
          progress={progressPercentage}
        />
      </div>
      <main className="md:pl-80 pt-[160px] h-full">
        <ToasterProvider />
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
