"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { PlusCircle, Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateChapter } from "@/lib/course/chapter";
import { useSpringBase } from "@/context/SpringBaseContext";

const formSchema = z.object({
  videoFile: z.instanceof(File, {
    message: "A video file is required",
  }),
});

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string | null;
  };
  chapterId: string;
  courseId: string;
  onUpdate?: (newVideoUrl: string) => void;
}

export const ChapterVideoForm = ({
  initialData,
  chapterId,
  courseId,
  onUpdate,
}: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    initialData.videoUrl || null
  );

  const { springbase } = useSpringBase();
    useEffect(() => {
      if (!springbase) return;
    }, [springbase]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const chapter = await updateChapter(springbase!, courseId, {
        chapterId: chapterId,
        videoFile: values.videoFile,
      });
      toast.success("Video updated successfully");
      toggleEdit();
      router.refresh();

      if (onUpdate) {
        onUpdate(chapter.videoUrl);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the chapter");
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      //   const reader = new FileReader();
      //   reader.onload = () => setPreview(reader.result as string);
      //   reader.readAsDataURL(file);
      const videoPreviewUrl = URL.createObjectURL(file);
      setPreview(videoPreviewUrl);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <ReactPlayer
              url={initialData.videoUrl}
              controls
              width="100%"
              height="100%"
            />
          </div>
        ))}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="videoFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type="file"
                      accept="video/*"
                      disabled={isSubmitting}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        handleFileChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {preview && (
              <div className="relative aspect-video mt-2">
                <ReactPlayer
                  url={preview}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            )}
            <div>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="font-[700]"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
