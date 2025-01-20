"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { updateCourse } from "@/lib/course/course";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSpringBase } from "@/context/SpringBaseContext";

const formSchema = z.object({
  DifficultyLevelId: z.string().min(1),
});

interface DifficultyLevelFormProps {
  initialData: {
    DifficultyLevelId: string | null;
  };
  courseId: string;
  options: { label: string; value: string }[];
  onUpdate?: (newDifficultyLevel: string) => void;
}
// Beginner, Intermediate, Advanced 
export const DifficultyLevelForm = ({
  initialData,
  courseId,
  options,
  onUpdate,
}: DifficultyLevelFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

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

  const selectedOption = options.find(
    (option) => option.value == initialData.DifficultyLevelId
  );

  const getLabelForValue = (value: string) => {
    const level = options.find((level) => level.value === value);
    return level ? level.label : "Unknown"; // Return "Unknown" if the value isn't found
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
    try {
      const course = await updateCourse(springbase!, courseId, {
        difficultyLevel: getLabelForValue(values.DifficultyLevelId),
      });
      console.log("Updated course: ", course);
      // Call the onUpdate callback if provided
      if (onUpdate) {
        onUpdate(getLabelForValue(values.DifficultyLevelId));
      }

      toast.success("DifficultyLevel updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the course");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Difficulty Level
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
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.DifficultyLevelId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No difficulty level"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="DifficultyLevelId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
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
