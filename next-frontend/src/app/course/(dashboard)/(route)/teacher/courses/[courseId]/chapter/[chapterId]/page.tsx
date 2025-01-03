"use client";

import { IconBadge } from "@/components/course/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getChapter } from "@/lib/course/chapter";
import { ChapterTitleForm } from "../_components/chapter-title-form";
import Link from "next/link";
import { ChapterDescriptionForm } from "../_components/chapter-description-form";
import { ChapterAccessForm } from "../_components/chapter-access-form";
import { ChapterVideoForm } from "../_components/chapter-video-form";
import { springbase } from "@/lib/springbase";
import { Banner } from "@/components/course/banner";
import { ChapterActions } from "../_components/chapter-actions";

const TeacherChapterIdPage = ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const router = useRouter();
  const [chapter, setChapter] = useState<any>(null);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      const fetchedChapter = await getChapter(params.chapterId);

      if (!fetchedChapter) {
        router.push("/course");
      }

      if (fetchedChapter.videoUrl) {
        fetchedChapter.videoUrl = springbase
          .collection("chapter")
          .file(fetchedChapter.id, fetchedChapter.videoUrl);
      }

      setChapter(fetchedChapter);
      console.log("Fetched chapter: ", fetchedChapter);
    };

    fetchChapterDetails();
  }, [params.chapterId]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full font-medium">
            <Link
              href={`/course/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-bold">Chapter Setup</h1>
                <span className="text-sm text-slate-700 font-medium">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={
                  !chapter.videoUrl || !chapter.title || !chapter.description
                }
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
                onUpdate={(newIsPublishded) =>
                  setChapter((prev: any) => ({
                    ...prev,
                    isPublished: newIsPublishded,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge
                  variant="default"
                  size="default"
                  icon={LayoutDashboard}
                />
                <h2 className="text-xl font-medium">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={{ title: chapter.title }}
                chapterId={params.chapterId}
                courseId={params.courseId}
                onUpdate={(newTitle) =>
                  setChapter((prev: any) => ({ ...prev, title: newTitle }))
                }
              />
              <ChapterDescriptionForm
                initialData={{ description: chapter.description }}
                chapterId={params.chapterId}
                courseId={params.courseId}
                onUpdate={(newDescription) =>
                  setChapter((prev: any) => ({
                    ...prev,
                    description: newDescription,
                  }))
                }
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} variant="default" size="default" />
                <h2>Access settings</h2>
              </div>
              <ChapterAccessForm
                initialData={{ isFree: chapter.isFree }}
                chapterId={params.chapterId}
                courseId={params.courseId}
                onUpdate={(newIsFree) =>
                  setChapter((prev: any) => ({
                    ...prev,
                    isFree: newIsFree,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} variant="default" size="default" />
              <h2>Add a video</h2>
            </div>
            <ChapterVideoForm
              initialData={{
                videoUrl: chapter.videoUrl,
              }}
              chapterId={params.chapterId}
              courseId={params.courseId}
              onUpdate={(newVideoUrl) =>
                setChapter((prev: any) => ({
                  ...prev,
                  videoUrl: springbase
                    .collection("chapter")
                    .file(chapter.id, newVideoUrl),
                }))
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherChapterIdPage;
