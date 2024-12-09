import { Button } from "@/components/ui/button";
import Link from "next/link";

const TeacherCoursePage = () => {
    return (
        <div className="p-6">
            <Link href="/course/teacher/create">
                <Button>
                    New Course
                </Button>
            </Link>
        </div>
    );
}

export default TeacherCoursePage
