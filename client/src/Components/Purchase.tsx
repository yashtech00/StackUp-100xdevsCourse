import axios from "axios"
import { useEffect, useState } from "react"
import { UsercourseProp } from "./DashboardPage"
import { GetCourseCard } from "./GetCourseCard";



export const PurchasePage = () => {

    const [purchaseCourses, setPurchaseCourses] = useState<UsercourseProp[]>([]);

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
        <div>
            <div className="m-10"> 
                <p className="text-3xl font-bold">My Purchases</p>
            </div>
        <div className="m-14">
            {purchaseCourses.map((course) => (
                <GetCourseCard key={course._id} course={course} />
            ))}
            </div>
            </div>
    )
}