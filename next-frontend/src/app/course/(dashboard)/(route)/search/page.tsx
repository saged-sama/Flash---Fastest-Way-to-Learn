"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/course/category";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/course/search-input";
import { CourseList } from "@/components/course/course-list";
import { Category, Course } from "@/app/course/models/model";
import { fetchCourses } from "@/lib/course/fetch-courses";
import { useSpringBase } from "@/context/SpringBaseContext";

type CourseWithCategoryWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const CourseSearchPage = ({ searchParams }: SearchPageProps) => {
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState<CourseWithCategoryWithProgress[]>([]);

  const { springbase } = useSpringBase();

  useEffect(() => {
    if (!springbase) return;
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories(springbase!);
        const fetchedCourses = await fetchCourses({ ...searchParams, springbase});
        setCategories(fetchedCategories);
        setCourses(fetchedCourses);
        console.log("Categories: ", fetchedCategories);
        console.log("Courses: ", fetchedCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams, springbase]);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default CourseSearchPage;
