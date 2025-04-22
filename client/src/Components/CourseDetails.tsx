import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { courseProp } from "./DashboardPage";


export const CourseDetails = () => {

    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState<courseProp | courseProp[]>([])
    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/user/course/${courseId}`, { withCredentials: true });
                console.log(res.data.data,"detail course");
                
                setCourseDetail(Array.isArray(res.data.data) ? res.data.data : [res.data.data]);
            } catch (e: any) {
                console.error(e.message);
            }
        }
        handleFetch();
    }, [])


    return (
        <div>
            <div>
                {Array.isArray(courseDetail) && courseDetail.map((course) => (
                    <div key={course._id}>
                        <div className="m-4">
                            <div className="">
                                {course.title}
                            </div>
                            <div className="flex">
                                <div>
                                    {course.description}
                                </div>
                                <div>
                                    <img src={course.imageUrl} alt={course.title} />
                                    <span>Price</span>
                                    <div>{course.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}