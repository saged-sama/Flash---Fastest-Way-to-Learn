import { getCourses } from "@/lib/course/course";
import { getPurchase } from "@/lib/course/purchase";
import { getProgress } from "./get-progress";
import { getCategory } from "@/lib/course/category";
import { getChapters } from "@/lib/course/chapter";
import { Category, Course } from "@/app/course/models/model";
import SpringBase from "../springbase/springbase";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId?: string;
  title?: string;
  categoryId?: string;
  springbase?: SpringBase | null;
};

export const fetchCourses = async ({
  userId,
  title,
  categoryId,
  springbase,
}: GetCourses): Promise<CourseWithCategoryWithProgress[]> => {
  try {

    console.log("title: ", title);
    console.log("categoryId: ", categoryId);
    const courses = await getCourses(springbase!, true, undefined, categoryId, title);

    console.log("Inside fetch courses");
    console.log("Fetched published courses: ", courses)

    const coursesWithProgress: CourseWithCategoryWithProgress[] =
      await Promise.all(
        courses.map(async (course: Course) => {
          const category = await getCategory(springbase!, course.categoryId);
          const chapters = await getChapters(springbase!, course.id, true);
          const chapterIds = chapters.map((chapter: { id: string }) => chapter.id);
          console.log("Course: ", course);
          console.log("Category: ", category);
          const purchases = await getPurchase(springbase!, course.id);
          if (purchases.length == 0) {
            return {
              ...course,
              category: category,
              chapters: chapterIds,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(course.id, springbase!);

          return {
            ...course,
            category: category,
            chapters: chapterIds,
            progress: progressPercentage,
          };
        })
      );
    return coursesWithProgress;
  } catch (error) {
    console.log("[GET COURSES] ", error);
    return [];
  }
};
