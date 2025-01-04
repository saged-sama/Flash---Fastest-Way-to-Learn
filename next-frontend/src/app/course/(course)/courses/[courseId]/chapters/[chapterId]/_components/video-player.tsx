"use client";

import { useSpringBase } from "@/context/SpringBaseContext";
import { updateUserProgress } from "@/lib/course/user-progress";
import { getCurrentUser } from "@/lib/utils";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  chapterId: string;
  courseId: string;
  nextChapterId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  videoUrl: string;
}

export const VideoPlayer = ({
  chapterId,
  courseId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  videoUrl,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  const { springbase } = useSpringBase();
  useEffect(() => {
    if (!springbase) return;
  }, [springbase]);

  const router = useRouter();
  const onEnd = async () => {
    try {
      console.log("completeOnEnd: ", completeOnEnd);

      if (completeOnEnd) {
        const userProgress = await updateUserProgress(
          springbase!,
          chapterId,
          true
        );
        toast.success("Progress udpated");
      }

      if (nextChapterId) {
        router.push(`/course/courses/${courseId}/chapters/${nextChapterId}`);
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This is chapter is closed</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          onPlay={() => setIsReady(true)}
          onEnded={onEnd}
          playing={true}
        />
      )}
    </div>
  );
};
