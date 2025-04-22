import { useEffect, useState } from "react"
import { courseProp } from "../DashboardPage"
import axios from "axios";
import { CourseCard } from "./CourseCard";

export const Course = () => {

    const [course, setCourse] = useState<courseProp[]>([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get("http://localhoast:8001/admin/AllCourse", { withCredentials: true });
                console.log(res,"admin course");
                setCourse(res.data.data);
            } catch (e:any) {
                console.error(e.message);
                
            }
        }
    },[])



    return (
        <div>
            <div>
                {course.map((AllCourse) => (
                    <div key={AllCourse._id}>
                        <CourseCard course={ AllCourse} />
                    </div>
                ))}
            </div>
        </div>
    )
}