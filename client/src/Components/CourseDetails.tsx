import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { courseProp } from "./DashboardPage";

import { BuyNowModel } from "./PurchaseModel";


export const CourseDetails = () => {
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState<courseProp[]>([]);
    const [isModel, setIsModel] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<courseProp | null>(null);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/user/course/${courseId}`, { withCredentials: true });
                const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
                setCourseDetail(data);
            } catch (e: any) {
                console.error(e.message);
            }
        };
        handleFetch();
    }, []);

    const handleToggle = (course: courseProp) => {
        console.log("click buy now");
        
        setSelectedCourse(course);
        setIsModel(true);
    };

    return (
        <div>
            <div>
                {courseDetail.map((course) => (
                    <div key={course._id} className="m-4">
                        <div className="font-bold text-4xl py-4 bg-blue-500">{course.title}</div>
                        <div className="flex justify-between m-6">
                            <div className="w-[40%]">
                                <p className="font-semibold text-xl">What y'll learn</p>
                                <p className="p-4">{course.description}</p>
                            </div>
                            <div className="mx-4 my-6 border-2 border-stone-900">
                                <img src={course.imageUrl} style={{ width: '350px', height: '350px' }} alt={course.title} />
                                <div className="p-4">
                                    <p className="text-md text-stone-500">Price</p>
                                    <div className="flex justify-between space-x-2">
                                        <div className="space-x-2">
                                            <span className="text-xl"> ₹{course.discount_price}</span>
                                            <span className="line-through text-stone-500">₹{course.original_price}</span>
                                        </div>
                                        <span className="space-x-1">{course.discount}<span>%</span> <span>off</span></span>
                                    </div>
                                    <div className="w-full bg-blue-500 flex justify-center py-2 my-2 rounded-lg hover:cursor-pointer" onClick={() => handleToggle(course)}  >
                                        <button className="font-semibold text-lg" >Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModel && selectedCourse && (
                <BuyNowModel course={selectedCourse} courseId={courseId} />
            )}
        </div>
    );
};
