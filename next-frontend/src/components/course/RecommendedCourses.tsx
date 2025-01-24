'use client';

import { useSpringBase } from "@/context/SpringBaseContext";
import { useEffect, useState } from "react";
import { CourseCard } from "./course-card";

export default function({ title }: {title: string}){
    const {springbase} = useSpringBase();
    const [recommendedCourses, setRecommendedCourses] = useState<any>();
    useEffect(() => {
        if(!springbase) return;

        const getRecommendedCourses = async() => {

            
            const response = await fetch(`http://localhost:8080/api/predict/coursename`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${springbase?.authStore.token}`
                    },
                    body: JSON.stringify({
                        course_name: title
                    })
                }
            );

            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
           // }

            

            const rc = await response.json();
            setRecommendedCourses(rc);

            console.log(rc);
        }
        getRecommendedCourses();
    }, [springbase]);

    if(!recommendedCourses){
        return <div>
            Readying Recommendations for you...
        </div>
    }

    return (<div className="flex w-full gap-2">
        
        {
            recommendedCourses.map((course: any) => {
                return <CourseCard
                    id={course.id}
                    title={course.title}
                    imageUrl={springbase?.collection("course").file(course.id, course.imageUrl) as string}
                    chaptersLength={null}
                    price={course.price}
                    progress={null}
                    category={""}
                />
            })
        }
    </div>)
}