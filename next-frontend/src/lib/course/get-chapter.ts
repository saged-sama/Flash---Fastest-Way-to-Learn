import { getChapter } from "@/lib/course/chapter";
import { getCourse } from "@/lib/course/course";
import { getPurchase } from "@/lib/course/purchase";
import { getUserProgress } from "@/lib/course/user-progress";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapterData = async ({
    userId,
    courseId,
    chapterId
}: GetChapterProps) => {
    try {
        const purchase = await getPurchase(userId, courseId);
        const course = await getCourse(courseId);
        const chapter = await getChapter(chapterId);

        if (!course || !chapter) {
            throw new Error("Chapter or course not found");
        }

        const nextChapter = await getChapter(chapterId, true);
        const userProgress = await getUserProgress(userId, chapterId);

        return {
            chapter,
            course,
            nextChapter,
            userProgress,
            purchase
        }

    } catch(error) {
        console.log("[GET CHAPTER]: ", error);
        return {
            chapter: null,
            course: null,
            nextChapter: null,
            userProgress: null,
            purchase: [],
        }
    }
}
