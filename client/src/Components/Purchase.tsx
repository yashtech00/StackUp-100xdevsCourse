import axios from "axios"
import { useEffect, useState } from "react"
import { UsercourseProp } from "./DashboardPage"
import { GetCourseCard } from "./GetCourseCard";



export const PurchasePage = () => {

    const [purchaseCourses, setPurchaseCourses] = useState<UsercourseProp[]>([]);
    const [loading, setLoading] = useState(false);
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const handleFetch = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${Backend_Url}/user/purchase`, { withCredentials: true });
                console.log(res, "purchase");
                setPurchaseCourses(res.data.data.purchased);
                setTimeout(() => { setLoading(false) }, 1000)
            } catch (e: any) {
                console.error(e.message);
            }

        }
        handleFetch();
    }, [])


    return (
        <div>
            <div className="m-10">
                <p className="text-3xl font-bold">My Purchases</p>
            </div>
            <div className="m-2">
                {loading ? (
                    <div className="flex justify-center items-center h-64 ">
                        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 mt-6 mx-4 ">
                        {purchaseCourses.map((course) => (
                            <GetCourseCard key={course._id} course={course} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}