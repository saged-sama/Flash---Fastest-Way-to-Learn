import { getChapters } from "@/lib/course/chapter";
import { getCompletedChapters } from "@/lib/course/user-progress";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await getChapters(courseId, true);
    const publishedChapterIds = publishedChapters.map((chapter: { id: any; }) => chapter.id);

    const validCompletedChapters = await getCompletedChapters(userId, publishedChapterIds);

    const progressPercentage = (validCompletedChapters.length / publishedChapters.length) * 100;
    return progressPercentage;
    
  } catch (error) {
    console.log("[GET PROGRESS] ", error);
    return 0;
  }
};
