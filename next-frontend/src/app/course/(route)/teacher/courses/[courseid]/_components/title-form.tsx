// "use client"

// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { updateCourse } from "@/lib/course/course"; 

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormMessage,
//     FormItem
// } from "@/components/ui/form"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Pencil } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// const formSchema = z.object({
//     title: z.string().min(1, {
//         message: "Title is required"
//     }),
// })

// interface TitleFormProps {
//     initialData: {
//         title: string;
//     };
//     courseId: string;
// };

// export const TitleForm = ({initialData, courseId} : TitleFormProps) => {
//     console.log("Initial data: ", initialData)
//     const router = useRouter();
//     const [isEditing, setIsEditing] = useState(false);

//     const toggleEdit = () => setIsEditing((current) => !current)
    
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: initialData,
//     });

//     const { isSubmitting, isValid } = form.formState;

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         console.log("Submitted values:", values);
//         try {
//             const course = await updateCourse(courseId, {title: values.title});
//             console.log("Current Course: ", course)
//             toast.success("Title updated successfully")
//             toggleEdit();
//             router.refresh();
//         } catch (error) {
//             console.error(error);
//             toast.error("Something went wrong while creating the course")
//         }
//     }

//     return (
//         <div className="mt-6 border bg-slate-100 rounded-md p-4">
//             <div className="font-medium flex items-center justify-between">
//                 Course title
//                 <Button onClick={toggleEdit} variant="ghost">
//                     {isEditing ? (
//                         <>Cancel</>
//                     ) : (
//                         <>
//                             <Pencil className="h-4 w-4 mr-2"/>
//                             Edit
//                         </>
//                     )}
//                 </Button>
//             </div>
//             {!isEditing && (
//                 <p className="text-sm mt-2">
//                     {initialData.title}
//                 </p>
//             )}
//             {isEditing && (
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
//                         <FormField control={form.control} name="title"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormControl>
//                                         <Input
//                                             disabled={isSubmitting}
//                                             placeholder="e.g. Advanced web developement"
//                                             {...field}
//                                         />
//                                     </FormControl>
//                                     <FormMessage/>
//                                 </FormItem>
//                             )}
//                         />
//                         <div>
//                             <Button type="submit" disabled={!isValid || isSubmitting} className="font-[700]">
//                                 Save
//                             </Button>
//                         </div>
//                     </form>
//                 </Form>
//             )}
//         </div>
//     )
// }


"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/lib/course/course"; 

import {
    Form,
    FormControl,
    FormField,
    FormMessage,
    FormItem
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
    onUpdate?: (newTitle: string) => void; // New optional prop
};

export const TitleForm = ({
    initialData, 
    courseId, 
    onUpdate
}: TitleFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const course = await updateCourse(courseId, {title: values.title});
            console.log("Updated course: ", course);
            
            // Call the onUpdate callback if provided
            if (onUpdate) {
                onUpdate(values.title);
            }
            
            toast.success("Title updated successfully")
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
                Course title
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
                <p className="text-sm mt-2">
                    {initialData.title}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                        <FormField control={form.control} name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Advanced web developement"
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