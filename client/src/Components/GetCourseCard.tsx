import { Link } from "react-router-dom";
import { courseProp } from "./DashboardPage"

export const GetCourseCard = ({ course }: { course: courseProp }) => {

    return (
        <div className="max-w-xs rounded-xl  overflow-hidden  border-2 border-stone-900">
            <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>

            </div>
            <div className="p-4">
                <p className="text-md text-stone-500">Price</p>
                <div className="flex justify-between space-x-2">
                    <div className="space-x-2">
                        <span className="text-xl"> ₹{course.discount_price}</span>
                        <span className="line-through text-stone-500">₹{course.original_price}</span>
                    </div>
                    <span className="space-x-1">{course.discount}% off</span>
                </div>

            </div>
            <Link to={`/course/${course._id}`}>
                <div className="flex justify-center w-full my-4">
                    <button className="flex justify-center bg-blue-600 w-full mx-2 py-2 rounded-2xl" >View Details</button>
                </div>
            </Link>
        </div>
    );
};