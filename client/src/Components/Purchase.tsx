import axios from "axios"
import { useEffect, useState } from "react"
import { courseProp } from "./DashboardPage"
import { GetCourseCard } from "./GetCourseCard";



export const PurchasePage = () => {

    const [purchaseCourses, setPurchaseCourses] = useState<courseProp[]>([]);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get("http://localhost:8001/user/purchase", { withCredentials: true });
            console.log(res,"purchase");
            setPurchaseCourses(res.data.data.purchased);
            } catch (e:any) {
                console.error(e.message); 
            }
            
        }
        handleFetch();
    },[])


    return (
        <div className="">
            {purchaseCourses.map((course) => (
                <GetCourseCard key={course._id} course={course} />
            ))}
        </div>
    )
}