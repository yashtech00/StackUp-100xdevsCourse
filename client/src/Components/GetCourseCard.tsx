import { courseProp } from "./DashboardPage"

export const GetCourseCard = ({ course }: { course: courseProp }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
            <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                <p className="text-gray-700 text-base">{course.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2">
                    ${course.price}
                </span>
            </div>
        </div>
    );
};