"use client";

import { Banner } from "@/components/course/banner";
import { springbase } from "@/lib/springbase";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Preview } from "@/components/course/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getChapterData } from "@/lib/course/get-chapter";

const ChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const [data, setData] = useState<{
    chapter: any;
    course: any;
    nextChapter: any;
    userProgress: any;
    purchase: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [completeOnEnd, setCompleteOnEnd] = useState(false);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        const result = await getChapterData({
          userId: getCurrentUser(),
          courseId: params.courseId,
          chapterId: params.chapterId,
        });
        setData(result);

        console.log("courseData: ", result);

        // Logic for completeOnEnd
        const { purchase, userProgress } = result;
        const isCompleteOnEnd =
          purchase.length != 0 &&
          userProgress != null && 
          userProgress.isCompleted == false;
        setCompleteOnEnd(isCompleteOnEnd);

        console.log("userProgress: ", userProgress);
        console.log("Purchase: ", purchase);
        console.log("completeOnEnd: ", isCompleteOnEnd);
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterData();
  }, [params.courseId, params.chapterId]);

  if (loading) {
    return <div>Loading chapters...</div>;
  }

  if (!data) {
    return <div>Error loading chapter data.</div>;
  }

  const { chapter, course, nextChapter, userProgress, purchase } = data;

  if (!chapter || !course) {
    return redirect("/course");
  }

  const isLocked = (chapter.isFree == null || chapter.isFree == false) && purchase.length == 0;
  console.log("isLocked: ", isLocked);

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You have already completed this chapter"
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase the course to watch this chapter"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
            videoUrl={springbase
              .collection("chapter")
              .file(chapter.id, chapter.videoUrl)}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
            {purchase.length != 0 ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
