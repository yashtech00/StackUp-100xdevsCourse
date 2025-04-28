import axios from "axios"
import { useEffect, useState } from "react"
import { GetCourseCard } from "./GetCourseCard";

export interface UsercourseProp {
    _id: string,
    title: string,
    description: string,
    price: string,
    imageUrl: string,
    discount_price: string,
    discount: string,
    original_price: string
}

export const DashboardPage = () => {
    const [course, setCourse] = useState<UsercourseProp[]>([]);
    const [search, setSearch] = useState("");
    const [FilteredCourse, setFilteredCourse] = useState<UsercourseProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleFetch = async () => {
            const res = await axios("http://localhost:8001/user/course", { withCredentials: true })
            setCourse(res.data.data);
        }
        handleFetch();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(true);
            const filtered = course.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredCourse(filtered);
            setTimeout(() => setIsLoading(false), 2000); // Delay to show the spinner
        }, 1000);

        return () => clearTimeout(timeoutId); // Cleanup timeout on search change
    }, [search, course]);

    return (
        <div className="">
            <div className="">
                <div>
                    <h1 className="m-4 font-bold text-3xl">Welcome to 100xdevs Courses</h1>
                    <div className="flex mx-4 w-[95%] mt-8">
                        <input
                            placeholder="Search"
                            className="w-full bg-black border-2 px-4 py-2 rounded-2xl border-stone-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="m-2">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64 ">
                            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 mt-6 mx-4">
                            {FilteredCourse.map((CourseCard) => (
                                <div
                                    key={CourseCard._id}
                                    className="transform transition-transform duration-300 hover:scale-105"
                                >
                                    <GetCourseCard course={CourseCard} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}