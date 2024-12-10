"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { updateCourse } from "@/lib/course/course";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    description: z.string().min(1, {
        message: "description is required"
    }),
})

interface DescriptionFormProps {
    initialData: {
        description: string;
    };
    courseId: string;
    onUpdate?: (newDescription: string) => void;
};

export const DescriptionForm = ({initialData, courseId,  onUpdate} : DescriptionFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Submitted values:", values);
        try {
            const course = await updateCourse(courseId, {description: values.description});
            console.log("Updated course: ", course)
            // Call the onUpdate callback if provided
            if (onUpdate) {
                onUpdate(values.description);
            }
            
            toast.success("Description updated successfully")
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating the course")
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course description
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {initialData.description || "No description"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                        <FormField control={form.control} name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. This course is about..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button type="submit" disabled={!isValid || isSubmitting} className="font-[700]">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
