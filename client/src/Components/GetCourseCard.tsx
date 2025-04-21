import { courseProp } from "./DashboardPage"

export const GetCourseCard = ({ course }: { course: courseProp }) => {
    return (
        <div className="max-w-sm rounded-xl  overflow-hidden  border-2 border-stone-900 bg-purple-800">
            <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                ₹{course.price}<span className="line-through mx-4 text-stone-500">9999</span>
                </span>
            </div>
            <div className="flex justify-center w-full my-4">
                <button className="flex justify-center bg-blue-600 w-full mx-2 py-2 rounded-2xl">View Details</button>
            </div>
        </div>
    );
};