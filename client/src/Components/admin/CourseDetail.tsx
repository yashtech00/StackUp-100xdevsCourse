import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { courseProp } from "../DashboardPage"

export const CourseDetail = () => {

    const [course, setCourse] = useState<courseProp[]>([]);
    const { courseId } = useParams(); 
    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/admin/course/${courseId}`, { withCredentials: true });
                setCourse(res.data.data)
            } catch (e:any) {
                console.error(e.message);
                
            }
        }
        handleFetch();
    },[])

    return (
        <div>
            <div>
            <div>
                {Array.isArray(course) && course.map((courseDetail) => (
                    <div key={courseDetail._id}>
                        <div className="m-4">
                            <div className="">
                                {courseDetail.title}
                            </div>
                            <div className="flex">
                                <div>
                                    {courseDetail.description}
                                </div>
                                <div>
                                    <img src={courseDetail.imageUrl} alt={courseDetail.title} />
                                    <span>Price</span>
                                    <div>{courseDetail.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}