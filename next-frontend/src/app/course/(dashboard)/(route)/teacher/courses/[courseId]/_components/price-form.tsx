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
import { cn, formatPrice } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { updateCourse } from "@/lib/course/course";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSpringBase } from "@/context/SpringBaseContext";

const formSchema = z.object({
  price: z.coerce.number(),
});

interface PriceFormProps {
  initialData: {
    price: number;
  };
  courseId: string;
  onUpdate?: (newPrice: number) => void;
}

export const PriceForm = ({
  initialData,
  courseId,
  onUpdate,
}: PriceFormProps) => {
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
    try {
      const course = await updateCourse(springbase!, courseId, { price: values.price });
      console.log("Updated course: ", course);
      // Call the onUpdate callback if provided
      if (onUpdate) {
        onUpdate(values.price);
      }

      toast.success("price updated successfully");
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
        Course price
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
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Set a price for your course"
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
