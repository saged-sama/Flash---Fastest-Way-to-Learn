"use client";

import { IconBadge } from "@/components/course/icon-badge";
import { getCourse } from "@/lib/course/course";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { getCategories } from "@/lib/course/category";
import { PriceForm } from "./_components/price-form";
import { ChapterForm } from "./_components/chapter-form";
import { getChapters } from "@/lib/course/chapter";
import { Banner } from "@/components/course/banner";
import { Actions } from "./_components/actions";
import { useSpringBase } from "@/context/SpringBaseContext";

const TeacherCourseIdPage = ({ params }: { params: { courseId: string } }) => {
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [chapters, setChapters] = useState<any[]>([]);

  const { springbase } = useSpringBase();

  useEffect(() => {
    if (!springbase) return;
    const fetchCourseDetails = async () => {
      // Fetch course
      const fetchedCourse = await getCourse(springbase!, params.courseId);
      console.log("Fetched course: ", fetchedCourse);

      if (!fetchedCourse) {
        router.push("/course");
      }

      if (fetchedCourse.imageUrl) {
        fetchedCourse.imageUrl = springbase!
          .collection("course")
          .file(fetchedCourse.id, fetchedCourse.imageUrl);
      }

      setCourse(fetchedCourse);

      // Fetch categories
      const fetchedCategories = await getCategories(springbase!);
      console.log("Categories: ", fetchedCategories);
      setCategories(fetchedCategories);

      // Fetch chapters
      const fetchedChapters = await getChapters(springbase!, fetchedCourse.id);
      console.log("Chapters: ", fetchedChapters);
      setChapters(fetchedChapters);
    };

    fetchCourseDetails();
  }, [params.courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    
    chapters?.some((chapter: { isPublished: boolean }) => chapter.isPublished) || false
  ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="This course is unpublished. It will not be visible to the students"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Course Setup</h1>
            <span className="text-sm text-slate-700 font-medium">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={
              !course.imageUrl ||
              !course.title ||
              !course.description ||
              !chapters?.some((chapter: { isPublished: boolean; }) => chapter.isPublished) ||
              chapters?.length === 0
            }
            courseId={params.courseId}
            isPublished={course.isPublished}
            onUpdate={(newIsPublishded) =>
              setCourse((prev: any) => ({
                ...prev,
                isPublished: newIsPublishded,
              }))
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge
                variant="default"
                size="default"
                icon={LayoutDashboard}
              />
              <h2 className="text-xl font-medium">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{ title: course.title }}
              courseId={course.id}
              onUpdate={(newTitle) =>
                setCourse((prev: any) => ({ ...prev, title: newTitle }))
              }
            />
            <DescriptionForm
              initialData={{ description: course.description }}
              courseId={course.id}
              onUpdate={(newDescription) =>
                setCourse((prev: any) => ({
                  ...prev,
                  description: newDescription,
                }))
              }
            />
            <ImageForm
              initialData={{
                imageUrl: course.imageUrl ? course.imageUrl : null,
              }}
              courseId={course.id}
              onUpdate={(newImageUrl) => {
                setCourse((prev: any) => ({
                  ...prev,
                  imageUrl: springbase!
                    .collection("course")
                    .file(course.id, newImageUrl),
                }));
                console.log("New imageUrl: ", newImageUrl);
              }}
            />
            <CategoryForm
              initialData={{ categoryId: course.categoryId }}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
              onUpdate={(newCategoryId) =>
                setCourse((prev: any) => ({
                  ...prev,
                  categoryId: newCategoryId,
                }))
              }
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge variant="default" size="default" icon={ListChecks} />
                <h2 className="text-xl font-medium">Course chapter</h2>
              </div>
              <ChapterForm
                initialData={{ chapters: chapters }}
                courseId={course.id}
                onUpdate={(newChapter) => {
                  setChapters((prevChapters) => [
                    ...prevChapters, // Spread the previous chapters
                    newChapter, // Add the new chapter at the end
                  ]);
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge
                  variant="default"
                  size="default"
                  icon={CircleDollarSign}
                />
                <h2 className="text-xl font-medium">Sell your course</h2>
              </div>
              <PriceForm
                initialData={{ price: course.price }}
                courseId={course.id}
                onUpdate={(newPrice) =>
                  setCourse((prev: any) => ({ ...prev, price: newPrice }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherCourseIdPage;
