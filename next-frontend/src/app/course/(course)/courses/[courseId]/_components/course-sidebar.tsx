"use client";

import { useEffect, useState } from "react";
import { Chapter, Course, UserProgress } from "@/app/course/models/model";
import { getPurchase } from "@/lib/course/purchase";
import { getCurrentUser } from "@/lib/utils";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseProgress } from "@/components/course/course-progress";

interface CourseSideBarProps {
  course: Course | null;
  chapters: (Chapter & { userProgress: UserProgress | null })[];
  progress: number | null;
}

export const CourseSidebar = ({
  course,
  chapters,
  progress,
}: CourseSideBarProps) => {
  const [purchase, setPurchase] = useState<any[] | []>([]);

  useEffect(() => {
    const fetchPurchase = async () => {
      if (course) {
        try {
          const result = await getPurchase(getCurrentUser(), course.id);
          setPurchase(result);
          console.log("Course side bar Purchase: ", result);
        } catch (error) {
          console.error("Error fetching purchase data:", error);
          setPurchase([]);
        }
      }
    };

    fetchPurchase();
  }, [course]);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-bold text-center">{course?.title}</h1>
        {purchase.length != 0 && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progress!}
              size={"default"}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {chapters?.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.isCompleted}
            courseId={course!.id}
            isLocked={!chapter.isFree && purchase.length == 0}
          />
        ))}
      </div>
    </div>
  );
};
