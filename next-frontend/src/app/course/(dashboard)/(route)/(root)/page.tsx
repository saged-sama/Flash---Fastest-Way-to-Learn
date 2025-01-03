import { CourseList } from "@/components/course/course-list";
import { getDashboardCourses } from "@/lib/course/get-dashboard-courses";
import { getCurrentUser } from "@/lib/utils";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
    const {completedCourses, coursesInProgress} = await getDashboardCourses(getCurrentUser());

    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    label="In progress"
                    numberOfItems={coursesInProgress.length}
                    variant="default"
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed"
                    numberOfItems={completedCourses.length}
                    variant="success"
                />
                
            </div>
            <CourseList
                items={[...coursesInProgress, ...completedCourses]}
            />
        </div>
    );
}

