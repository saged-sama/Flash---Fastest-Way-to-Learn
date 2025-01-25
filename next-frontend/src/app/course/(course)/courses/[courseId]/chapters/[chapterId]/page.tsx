"use client";

import { Banner } from "@/components/course/banner";
import { getCurrentUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Preview } from "@/components/course/preview";
import { Separator } from "@/components/ui/separator";
import { CourseProgressButton } from "./_components/course-progress-button";
import { getChapterData } from "@/lib/course/get-chapter";
import { useSpringBase } from "@/context/SpringBaseContext";
import { SummarizeButton } from "./_components/summarize-button";


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

  const { springbase } = useSpringBase();

  useEffect(() => {
    if (!springbase) return;

    const saveInteraction = async () => {
      try {
        console.log("saveInteraction triggered");
    
        // Validate springbase and parameters
        if (!springbase) {
          console.error("Springbase is undefined");
          return;
        }
        if (!params.courseId || !springbase.authStore?.model?.id) {
          console.error("Missing courseId or userId");
          return;
        }
    
        console.log("Course ID:", params.courseId);
        console.log("User ID:", springbase.authStore.model.id);
    
       
        const response = await fetch("http://localhost:8080/api/collections/courseinteractions/records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: params.courseId,
            userId: springbase.authStore.model.id,
          }),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const interaction = await response.json();
        console.log("Interaction saved:", interaction);
      } catch (error) {
        console.error("Failed to save interaction:", error);
      }
    };


    const fetchChapterData = async () => {
      try {
        const result = await getChapterData({
          userId: getCurrentUser(springbase),
          courseId: params.courseId,
          chapterId: params.chapterId,
          springbase: springbase!,
        });
        setData(result);
        console.log("Saving Information for Recommendation")
        saveInteraction(); // Trigger saveInteraction
        console.log("Hello from Abrar Eyasir")
        

        console.log("courseData: ", result);

        // Logic for completeOnEnd
        const { purchase, userProgress } = result;
        const isCompleteOnEnd =
          purchase.length != 0 ||
          (userProgress != null && userProgress.isCompleted == false);
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
  }, [params.courseId, params.chapterId, springbase]);

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

  const isLocked =
    (chapter.isFree == null || chapter.isFree == false) && purchase.length == 0;
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
            videoUrl={springbase!
              .collection("chapter")
              .file(chapter.id, chapter.videoUrl)}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
            <div className="flex items-center space-x-2">
              {purchase.length != 0 ? (
                <>
                  <CourseProgressButton
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                    nextChapterId={nextChapter?.id}
                    isCompleted={!!userProgress?.isCompleted}
                    springbase={springbase!}
                  />
                  <SummarizeButton
                    summary={chapter.summary}
                  />
                </>
              ) : (
                <CourseEnrollButton
                  courseId={params.courseId}
                  price={course.price}
                />
              )}
            </div>
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
