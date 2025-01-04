"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateChapter } from "@/lib/course/chapter";
import { useSpringBase } from "@/context/SpringBaseContext";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  chapterId: string;
  courseId: string;
  onUpdate?: (newTitle: string) => void; // New optional prop
}

export const ChapterTitleForm = ({
  initialData,
  chapterId,
  courseId,
  onUpdate,
}: ChapterTitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [chapterTitle, setChapterTitle] = useState(initialData.title);

  const { springbase } = useSpringBase();
    useEffect(() => {
      if (!springbase) return;
    }, [springbase]);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const chapter = await updateChapter(springbase!, courseId, {
        chapterId: chapterId,
        title: values.title,
      });
      console.log("Updated chapter: ", chapter);

      if (onUpdate) {
        onUpdate(values.title);
      }

      toast.success("Chapter title updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the chapter");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Introduction"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
