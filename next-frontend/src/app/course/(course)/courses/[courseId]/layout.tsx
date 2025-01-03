"use client";

import { useState, useEffect } from "react";
import { getChapters } from "@/lib/course/chapter";
import { getCourse } from "@/lib/course/course";
import { getUserProgress } from "@/lib/course/user-progress";
import { getCurrentUser } from "@/lib/utils";
import { CourseSidebar } from "./_components/course-sidebar";
import { Chapter, Course, UserProgress } from "@/app/course/models/model";
import { CourseNavbar } from "./_components/course-navbar";
import { getProgress } from "@/lib/course/get-progress";

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
  const [chapters, setChapters] = useState<Chapter[] | null>(null);
  const [chaptersWithProgress, setChaptersWithProgress] = useState<
    ChapterWithProgress[]
  >([]);
  const [progressPercentage, setProgressPercentage] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details and chapters
        const courseData = await getCourse(params.courseId);
        const chaptersData = await getChapters(params.courseId, true);
        const progress = await getProgress(getCurrentUser(), params.courseId);

        // Fetch user progress for each chapter individually
        const chaptersWithProgressData = await Promise.all(
          chaptersData.map(async (chapter: Chapter) => {
            // Get progress for the specific chapter using getUserProgress
            const userProgress = await getUserProgress(
              getCurrentUser(),
              chapter.id
            );
            return {
              ...chapter,
              userProgress: userProgress || 0, // Use default 0 if no progress is found
            };
          })
        );

        setCourse(courseData);
        setChapters(chaptersData);
        setChaptersWithProgress(chaptersWithProgressData);
        setProgressPercentage(progress);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.courseId]);

  if (loading) {
    return <div>Loading course...</div>;
  }

  return (
    <div className="h-full">
        <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
            <CourseNavbar
                course={course}
                chapters={chaptersWithProgress}
                progress={progressPercentage}
            />
        </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          chapters={chaptersWithProgress}
          progress={progressPercentage}
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {/* Pass the chapters with progress to the child components */}
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
