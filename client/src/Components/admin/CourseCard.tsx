import { Link } from "react-router-dom";
import { courseProp } from "../DashboardPage";

export const CourseCard = ({ course }: { course: courseProp }) => {


    return (
        <div>
            <div>
            <div className="max-w-xs rounded-xl  overflow-hidden  border-2 border-stone-900">
            <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                ₹{course.price}<span className="line-through mx-4 text-stone-500">9999</span>
                </span>
            </div>
            <Link to={`/admin/course/${course._id}`}>
            <div className="flex justify-center w-full my-4">
                <button className="flex justify-center bg-blue-600 w-full mx-2 py-2 rounded-2xl" >View Details</button>
                </div>
                    </Link>
                    <div className="mx-2 ">
                        <div>
                            <button>Edit</button>
                        </div>
                        <div>
                            <button>Delete</button>
                        </div>
                    </div>
        </div>
            </div>
        </div>
    )
}