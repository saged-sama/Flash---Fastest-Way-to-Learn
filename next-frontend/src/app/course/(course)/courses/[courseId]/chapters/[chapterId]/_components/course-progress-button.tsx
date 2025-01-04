import { Button } from "@/components/ui/button";
import { updateUserProgress } from "@/lib/course/user-progress";
import SpringBase from "@/lib/springbase/springbase";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
  springbase: SpringBase;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
  springbase,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const onClick = async () => {
    try {
      setIsLoading(true);

      console.log("isCompleted: ", isCompleted);
      const userProgress = await updateUserProgress(springbase!, chapterId, !isCompleted);

      toast.success("Progress udpated");
      if (!isCompleted && nextChapterId) {
        router.push(`/course/courses/${courseId}/chapters/${nextChapterId}`);
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
      onClick={onClick}
    >
      {isCompleted ? "Mark as not completed" : "Mark as completed"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};
