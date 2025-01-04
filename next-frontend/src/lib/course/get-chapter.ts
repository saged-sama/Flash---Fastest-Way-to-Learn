import { getChapter } from "@/lib/course/chapter";
import { getCourse } from "@/lib/course/course";
import { getPurchase } from "@/lib/course/purchase";
import { getUserProgress } from "@/lib/course/user-progress";
import SpringBase from "../springbase/springbase";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
    springbase: SpringBase;
}

export const getChapterData = async ({
    userId,
    courseId,
    chapterId,
    springbase,
}: GetChapterProps) => {
    try {
        const purchase = await getPurchase(springbase!, courseId);
        const course = await getCourse(springbase!, courseId);
        const chapter = await getChapter(springbase!, chapterId);

        if (!course || !chapter) {
            throw new Error("Chapter or course not found");
        }

        const nextChapter = await getChapter(springbase!, chapterId, true);
        const userProgress = await getUserProgress(springbase!, chapterId);

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
