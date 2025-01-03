import { Chapter, Course, UserProgress } from "@/app/course/models/model";
import { NavbarRoutes } from "@/components/course/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course | null;
  chapters: (Chapter & { userProgress: UserProgress | null })[];
  progress: number | null;
}

export const CourseNavbar = ({
  course,
  chapters,
  progress,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        chapters={chapters}
        progress={progress}
      />
      <NavbarRoutes />
    </div>
  );
};
