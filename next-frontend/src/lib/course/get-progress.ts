import { getChapters } from "@/lib/course/chapter";
import { getCompletedChapters } from "@/lib/course/user-progress";
import SpringBase from "../springbase/springbase";

export const getProgress = async (courseId: string, springbase: SpringBase): Promise<number> => {
  try {
    const publishedChapters = await getChapters(springbase!, courseId, true);
    const publishedChapterIds = publishedChapters.map(
      (chapter: { id: any }) => chapter.id
    );

    const validCompletedChapters = await getCompletedChapters(
      springbase!,
      publishedChapterIds
    );

    const progressPercentage =
      (validCompletedChapters.length / publishedChapters.length) * 100;
    return progressPercentage;
  } catch (error) {
    console.log("[GET PROGRESS] ", error);
    return 0;
  }
};
