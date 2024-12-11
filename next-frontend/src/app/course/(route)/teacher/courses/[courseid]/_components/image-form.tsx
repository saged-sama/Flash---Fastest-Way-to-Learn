"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import Image from "next/image";

import {
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormItem
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { updateCourse } from "@/lib/course/course";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    imageFile: z.instanceof(File, {
        message: "An image file is required",
    }),
});

interface ImageFormProps {
    initialData: {
        imageUrl: string;
    };
    courseId: string;
    onUpdate?: (newImageUrl: string) => void;
};

export const ImageForm = ({ initialData, courseId, onUpdate }: ImageFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState<string | null>(initialData.imageUrl || null);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Submitted values:", values);
        // try {
        //     const course = await updateCourse(courseId, {imageUrl: values.imageUrl});
            
        //     // Call the onUpdate callback if provided
        //     if (onUpdate) {
        //         onUpdate(values.imageUrl);
        //     }
            
        //     toast.success("Title updated successfully")
        //     toggleEdit();
        //     router.refresh();
        // } catch (error) {
        //     console.error(error);
        //     toast.error("Something went wrong while updating the course")
        // }
    };

    const handleFileChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="imageFile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            disabled={isSubmitting}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] || null;
                                                field.onChange(file); // Pass the file to the form state
                                                handleFileChange(file); // Update the preview
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {preview && (
                            <div className="relative aspect-video mt-2">
                                <Image
                                    alt="Preview"
                                    fill
                                    className="object-cover rounded-md"
                                    src={preview}
                                />
                            </div>
                        )}
                        <div>
                            <Button type="submit" disabled={!isValid || isSubmitting} className="font-[700]">
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
