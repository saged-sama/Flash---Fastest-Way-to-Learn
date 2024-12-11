// "use client"

// import { IconBadge } from "@/components/course/icon-badge";
// import { getCourse } from "@/lib/course/course";
// import { LayoutDashboard } from "lucide-react";
// import { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
// import { TitleForm } from "./_components/title-form";
// import { DescriptionForm } from "./_components/description-form";
// import { ImageForm } from "./_components/image-form";
// import { CategoryForm } from "./_components/category-form";
// import { getCategories } from "@/lib/course/category";

// const TeacherCourseIdPage = ({ params }: { params: { courseId: string } }) => {
//     const [course, setCourse] = useState<any>(null);
//     const categories = getCategories();

//     useEffect(() => {
//         const fetchCourse = async () => {
//             const fetchedCourse = await getCourse(params.courseId);
            
//             if (!fetchedCourse) {
//                 redirect("/course");
//                 return;
//             }
            
//             setCourse(fetchedCourse);
//         };

//         fetchCourse();
//     }, [params.courseId]);

//     if (!course) {
//         return <div>Loading...</div>;
//     }

//     const requiredFields = [
//         course.title,
//         course.description,
//         course.imageUrl,
//         course.price,
//         course.categoryId
//     ];

//     const totalFields = requiredFields.length;
//     const completedFields = requiredFields.filter(Boolean).length;

//     const completionText = `(${completedFields}/${totalFields})`;

//     return (
//         <div className="p-6">
//             <div className="flex items-center justify-between">
//                 <div className="flex flex-col gap-y-2">
//                     <h1 className="text-2xl font-bold">
//                         Course setup
//                     </h1>
//                     <span className="text-sm text-slate-700 font-medium">
//                         Complete all fields {completionText}
//                     </span>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
//                 <div>
//                     <div className="flex items-center gap-x-2">
//                         <IconBadge variant="default" icon={LayoutDashboard}/>
//                         <h2 className="text-xl font-medium">
//                             Customize your course
//                         </h2>
//                     </div>
//                     <TitleForm 
//                         initialData={{ title: course.title }} 
//                         courseId={course.id} 
//                         onUpdate={(newTitle) => setCourse((prev: any) => ({ ...prev, title: newTitle }))}
//                     />
//                     <DescriptionForm 
//                         initialData={{ description: course.description }} 
//                         courseId={course.id}
//                         onUpdate={(newDescription) => setCourse((prev: any) => ({ ...prev, description: newDescription }))}
//                     />
//                     <ImageForm 
//                         initialData={{ imageUrl: course.imageUrl }} 
//                         courseId={course.id}
//                         onUpdate={(newImageUrl) => setCourse((prev: any) => ({ ...prev, imageUrl: newImageUrl }))}
//                     />
//                     <CategoryForm
//                         initialData={{ categoryId: course.categoryId }} 
//                         courseId={course.id}
//                         options={categories.map((catetgory: any) => ({
//                             label: catetgory.name,
//                             value: catetgory.id,
//                         }))}
//                         onUpdate={(newCategoryId) => setCourse((prev: any) => ({ ...prev, categoryId: newCategoryId }))}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TeacherCourseIdPage;

"use client"

import { IconBadge } from "@/components/course/icon-badge";
import { getCourse } from "@/lib/course/course";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { getCategories } from "@/lib/course/category";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";

const TeacherCourseIdPage = ({ params }: { params: { courseId: string } }) => {
    const [course, setCourse] = useState<any>(null);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCourseAndCategories = async () => {
            // Fetch course
            const fetchedCourse = await getCourse(params.courseId);
            
            if (!fetchedCourse) {
                return redirect("/course");
            }
            
            setCourse(fetchedCourse);

            // Fetch categories
            const fetchedCategories = await getCategories();
            console.log("Categories: ", fetchedCategories);
            setCategories(fetchedCategories);
        };

        fetchCourseAndCategories();
    }, [params.courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold">
                        Course Setup
                    </h1>
                    <span className="text-sm text-slate-700 font-medium">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge variant="default" size="default" icon={LayoutDashboard}/>
                        <h2 className="text-xl font-medium">
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm 
                        initialData={{ title: course.title }} 
                        courseId={course.id} 
                        onUpdate={(newTitle) => setCourse((prev: any) => ({ ...prev, title: newTitle }))}
                    />
                    <DescriptionForm 
                        initialData={{ description: course.description }} 
                        courseId={course.id}
                        onUpdate={(newDescription) => setCourse((prev: any) => ({ ...prev, description: newDescription }))}
                    />
                    <ImageForm 
                        initialData={{ imageUrl: course.imageUrl }} 
                        courseId={course.id}
                        onUpdate={(newImageUrl) => setCourse((prev: any) => ({ ...prev, imageUrl: newImageUrl }))}
                    />
                    <CategoryForm
                        initialData={{ categoryId: course.categoryId }} 
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                        onUpdate={(newCategoryId) => setCourse((prev: any) => ({ ...prev, categoryId: newCategoryId }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge variant="default" size="default" icon={ListChecks} />
                            <h2 className="text-xl font-medium">
                                Course chapter
                            </h2>
                        </div>
                        <div>
                            TODO: Chapters
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge variant="default" size="default" icon={CircleDollarSign} />
                            <h2 className="text-xl font-medium">
                                Sell your course
                            </h2>
                        </div>
                        <PriceForm
                            initialData={{ price: course.price }} 
                            courseId={course.id}
                            onUpdate={(newPrice) => setCourse((prev: any) => ({ ...prev, price: newPrice }))}
                        />
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                            <IconBadge variant="default" size="default" icon={File} />
                            <h2 className="text-xl font-medium">
                                Resources and attachments
                            </h2>
                        </div>
                        <AttachmentForm 
                            initialData={{ imageUrl: course.imageUrl }} 
                            courseId={course.id}
                            onUpdate={(newImageUrl) => setCourse((prev: any) => ({ ...prev, imageUrl: newImageUrl }))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherCourseIdPage;
