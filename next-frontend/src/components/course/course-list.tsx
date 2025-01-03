import { Course, Category } from "@/app/course/models/model";
import { springbase } from "@/lib/springbase";
import { CourseCard } from "./course-card";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CourseWithCategoryWithProgress[];
}

export const CourseList = ({ items }: CourseListProps) => {
  console.log(items);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={springbase
              .collection("course")
              .file(item.id, item.imageUrl)}
            chaptersLength={item.chapters.length}
            price={item.price}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length == 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
};
