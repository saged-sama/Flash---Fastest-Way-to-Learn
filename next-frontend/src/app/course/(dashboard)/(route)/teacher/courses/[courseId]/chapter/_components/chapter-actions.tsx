"use client";

import { ConfirmModal } from "@/components/course/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  deleteChapter,
  getChapters,
  updateChapter,
} from "@/lib/course/chapter";
import { updateCourse } from "@/lib/course/course";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
  onUpdate?: (newIsPublishded: boolean) => void;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
  onUpdate,
}: ChapterActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (!isPublished) {
        const chapter = await updateChapter({
          chapterId: chapterId,
          isPublished: true,
        });
        console.log("Updated chapter: ", chapter);

        toast.success("Chapter published");

        if (onUpdate) {
          onUpdate(chapter.isPublished);
        }
      } else {
        const chapter = await updateChapter({
          chapterId: chapterId,
          isPublished: false,
        });
        console.log("Updated chapter: ", chapter);

        toast.success("Chapter unpublished");

        if (onUpdate) {
          onUpdate(chapter.isPublished);
        }

        const chapters = await getChapters(chapterId, true);

        if (!chapters || chapters.length === 0) {
          console.log("No published chapters available.");

          const course = await updateCourse(courseId, {
            isPublished: false,
          });
          console.log("Updated course: ", course);
        }
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while publishing the chapter");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteChapter(chapterId);
      toast.success("Chapter deleted");

      const chapters = await getChapters(chapterId, true);

      if (!chapters || chapters.length === 0) {
        console.log("No published chapters available.");

        const course = await updateCourse(courseId, {
          isPublished: false,
        });
        console.log("Updated course: ", course);
      }

      router.refresh();
      router.push(`/course/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong while deleting the chapter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
