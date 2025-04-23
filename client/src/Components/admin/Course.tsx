import { useEffect, useState } from "react"
import { courseProp } from "../DashboardPage"
import axios from "axios";
import { CourseCard } from "./CourseCard";
import { Navbar } from "../Navbar";
import { AddCourse } from "./AddCourse";

export const Course = () => {

    const [course, setCourse] = useState<courseProp[]>([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get("http://localhost:8001/admin/AllCourse", { withCredentials: true });
                console.log(res,"admin course");
                setCourse(res.data.data);
            } catch (e:any) {
                console.error(e.message);
            }
        }
        handleFetch();
    },[])



    return (
        <div className="">
            <Navbar />
            <div className="m-10">
            <div className="flex justify-between">
                <div className="font-bold text-xl">Admin Panel</div>
                <AddCourse/>
                </div>
                <div className="m-2">
            <div className="grid grid-cols-3 mt-6 mx-4 ">
                {course.map((AllCourse) => (
                    <div key={AllCourse._id}>
                        <CourseCard course={ AllCourse} />
                    </div>
                ))}
                    </div>
                    </div>
            </div>
            </div>
    )
}