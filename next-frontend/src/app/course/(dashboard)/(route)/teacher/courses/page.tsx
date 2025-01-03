"use client";

import { getCourses } from "@/lib/course/course";
import { useState, useEffect } from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const TeacherCoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getCourses();
                setCourses(courses);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default TeacherCoursePage;
