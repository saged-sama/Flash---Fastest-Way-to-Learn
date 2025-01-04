// "use client"

// import { CourseList } from "@/components/course/course-list";
// import { getDashboardCourses } from "@/lib/course/get-dashboard-courses";
// import { CheckCircle, Clock } from "lucide-react";
// import { InfoCard } from "./_components/info-card";
// import { useSpringBase } from "@/context/SpringBaseContext";
// import { useEffect } from "react";

// const Dashboard = async () => {
//     const { springbase } = useSpringBase();
//       useEffect(() => {
//         if (!springbase) return;
//       }, [springbase]);
//     const {completedCourses, coursesInProgress} = await getDashboardCourses(springbase!);

//     return (
//         <div className="p-6 space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <InfoCard
//                     icon={Clock}
//                     label="In progress"
//                     numberOfItems={coursesInProgress.length}
//                     variant="default"
//                 />
//                 <InfoCard
//                     icon={CheckCircle}
//                     label="Completed"
//                     numberOfItems={completedCourses.length}
//                     variant="success"
//                 />
                
//             </div>
//             <CourseList
//                 items={[...coursesInProgress, ...completedCourses]}
//             />
//         </div>
//     );
// }

// export default Dashboard;

"use client"

import { CourseList } from "@/components/course/course-list";
import { getDashboardCourses } from "@/lib/course/get-dashboard-courses";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { springbase } = useSpringBase();
    const [coursesInProgress, setCoursesInProgress] = useState<any[]>([]);
    const [completedCourses, setCompletedCourses] = useState<any[]>([]);

    useEffect(() => {
        if (!springbase) return;
        const fetchCourses = async () => {

            const { completedCourses, coursesInProgress } = await getDashboardCourses(springbase);
            setCompletedCourses(completedCourses);
            setCoursesInProgress(coursesInProgress);
        };

        fetchCourses();
    }, [springbase]);

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

export default Dashboard;
