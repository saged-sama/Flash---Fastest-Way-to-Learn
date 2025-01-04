import { Category, Chapter, Course } from "@/app/course/models/model";
import { getPurchase } from "./purchase";
import { getCategory } from "./category";
import { getChapters } from "./chapter";
import { getProgress } from "./get-progress";
import SpringBase from "../springbase/springbase";

type CourseWithCategoryWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number;
};

type DashboardCourses = {
  completedCourses: CourseWithCategoryWithProgress[];
  coursesInProgress: CourseWithCategoryWithProgress[];
};

export const getDashboardCourses = async (springbase: SpringBase ): Promise<DashboardCourses> => {

  try {
    const purchases = await getPurchase(springbase!);

    console.log("Inside fetch courses");
    console.log("Fetched purchases: ", purchases);

    const courses: CourseWithCategoryWithProgress[] = await Promise.all(
      purchases.map(async (purchase: any) => {
        const course = purchase.course;

        const category = await getCategory(springbase!, course.categoryId);
        const chapters = await getChapters(springbase!, course.id, true);
        const chapterIds = chapters.map(
          (chapter: { id: string }) => chapter.id
        );
        console.log("Course: ", course);
        console.log("Category: ", category);

        const progressPercentage = await getProgress(course.id, springbase!);

        return {
          ...course,
          category: category,
          chapters: chapterIds,
          progress: progressPercentage,
        };
      })
    );

    const completedCourses = courses.filter((course) => course.progress == 100);
    const coursesInProgress = courses.filter((course) => course.progress < 100);

    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]: ", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
