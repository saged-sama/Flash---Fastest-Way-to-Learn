"use client";

import { ConfirmModal } from "@/components/course/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  deleteChapter,
  getChapters,
  updateChapter,
} from "@/lib/course/chapter";
import { deleteCourse, updateCourse } from "@/lib/course/course";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
  onUpdate?: (newIsPublishded: boolean) => void;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
  onUpdate,
}: ActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (!isPublished) {
        const course = await updateCourse(courseId, {
          isPublished: true,
        });
        console.log("Updated course: ", course);

        toast.success("Course published");

        if (onUpdate) {
          onUpdate(course.isPublished);
        }
      } else {
        const course = await updateCourse(courseId, {
          isPublished: false,
        });
        console.log("Updated course: ", course);

        toast.success("Chapter unpublished");

        if (onUpdate) {
          onUpdate(course.isPublished);
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
      await deleteCourse(courseId);
      toast.success("Chapter deleted");

      router.refresh();
      router.push(`/course/teacher/courses`);
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
