"use client";

import { getCourses } from "@/lib/course/course";
import { useState, useEffect } from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useSpringBase } from "@/context/SpringBaseContext";

const TeacherCoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { springbase } = useSpringBase();

  useEffect(() => {
    if (!springbase) return;
    const fetchCourses = async () => {
      try {
        const courses = await getCourses(springbase!);
        setCourses(courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [springbase]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default TeacherCoursePage;
