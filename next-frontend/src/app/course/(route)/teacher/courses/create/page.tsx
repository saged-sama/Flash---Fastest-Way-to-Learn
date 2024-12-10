"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
import Link from "next/link";
import toast from "react-hot-toast";
import { createCourse } from "@/lib/course/course";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})

const TeacherCreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("Submitted values:", values);
        try {
            const course = await createCourse(values.title);
            console.log("Created Course: ", course)
            router.push(`/course/teacher/courses/${course.id}`)
            toast.success("Course created successfully")
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while creating the course")
        }
    }

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    Name your course
                </h1>
                <p className="text-sm text-slate-600 font-[500]">
                    What would you like to name your course? Don't worry, you can change this later.
                </p>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-[700]">
                                        Course title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Advanced web developement"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div>
                            <Link href="/course">
                                <Button type="button" variant="ghost" className="font-[700]">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting} className="font-[700]">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default TeacherCreatePage
