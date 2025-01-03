import { Menu } from "lucide-react";

interface CourseMobileSidebarProps {
  course: Course | null;
  chapters: (Chapter & { userProgress: UserProgress | null })[];
  progress: number | null;
}

import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Chapter, Course, UserProgress } from "@/app/course/models/model";
import { CourseSidebar } from "./course-sidebar";

export const CourseMobileSidebar = ({
  course,
  chapters,
  progress,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <CourseSidebar
          course={course}
          chapters={chapters}
          progress={progress}
        />
      </SheetContent>
    </Sheet>
  );
};
