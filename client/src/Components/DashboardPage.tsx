import axios from "axios"
import { useEffect, useState } from "react"
import { GetCourseCard } from "./GetCourseCard";


export interface courseProp {
    _id: string,
    title: string,
    description: string,
    price: string,
    imageUrl: string,
    discount_price:string,
    discount: string,
    original_price:string
    
}

export const DashboardPage = () => {
    const [course, setCourse] = useState<courseProp[]>([]);


    useEffect(() => {
        const handleFetch = async () => {
            const res = await axios("http://localhost:8001/user/course", { withCredentials: true })
            console.log(res.data.data, "course fetch");

            setCourse(res.data.data);
        }
        handleFetch();
    }, [])

    return (
        <div className="w-full">
            <div>
                <h1 className="m-4 font-bold text-3xl">Welcome to 100xdevs Courses</h1>
                <div className="flex mx-4 w-[95%] mt-8">
                    <input
                        placeholder="Search"
                        className="w-full bg-black border-2 px-4 py-2 rounded-2xl border-stone-900"
                    />
                </div>
                <div className=" m-2">
                    <div className="grid grid-cols-3 mt-6 mx-4">
                        {course.map((CourseCard) => (
                            <div
                                key={CourseCard._id}
                                className="transform transition-transform duration-300 hover:scale-105"
                            >
                                <GetCourseCard course={CourseCard} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}