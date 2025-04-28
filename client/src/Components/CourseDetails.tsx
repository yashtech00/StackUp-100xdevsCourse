import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsercourseProp } from "./DashboardPage";
import { useAuth } from "../hooks";

export const CourseDetails = () => {
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState<UsercourseProp[]>([]);
    const [isModel, setIsModel] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<UsercourseProp | null>(null);
    const [purchased, setPurchased] = useState(false);

    const { authUser } = useAuth();

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

    const handleToggle = (course: UsercourseProp) => {
        setSelectedCourse(course);
        setIsModel(true);
    };

    return (
        <div>
            <div>
                {courseDetail.map((course) => (
                    <div key={course._id} className="m-4">
                        <div className="font-bold text-4xl py-4 bg-blue-500">{course.title}</div>
                        <div className="flex justify-between m-6 rounded-xl border-2 border-stone-900">
                            <div className="w-[40%] m-8">
                                <p className="font-semibold text-xl">What you'll learn</p>
                                <ul className="list-disc pl-5 space-y-2">
                                        {Array.isArray(course.description) ? (
                                            course.description.map((item, index) => (
                                                <li key={index} className="text-md">{item}</li>
                                            ))
                                        ) : (
                                            <li className="text-md">{course.description}</li>
                                        )}
                                    </ul>
                            </div>
                            <div className="mx-4 my-6 border-2 border-stone-900 rounded-xl h-full flex flex-col justify-between">
                                <img src={course.imageUrl} alt={course.title} className="rounded-xl w-[350px] h-[350px]" />
                                <div className="p-4">
                                    <p className="text-md text-stone-500">Price</p>
                                    <div className="flex justify-between space-x-2">
                                        <div className="space-x-2">
                                            <span className="text-xl"> ₹{course.discount_price}</span>
                                            <span className="line-through text-stone-500">₹{course.original_price}</span>
                                        </div>
                                        <span className="space-x-1">{course.discount}% off</span>
                                    </div>
                                    <div className="w-full bg-blue-500 flex justify-center py-2 my-2 rounded-lg hover:cursor-pointer" onClick={() => handleToggle(course)} >
                                        <button type="button" className="font-semibold text-lg">
                                            {authUser?.purchased?.includes(course._id) ? "Purchased" : "Buy Now"}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModel && selectedCourse && (
                <BuyNowModel
                    course={selectedCourse}
                    courseId={courseId}
                    onClose={() => setIsModel(false)}
                    onPurchased={() => {
                        setPurchased(true);
                        setIsModel(false);
                    }}
                />
            )}
        </div>
    );
};

const BuyNowModel = ({
    course,
    courseId,
    onClose,
    onPurchased
}: {
    course: UsercourseProp;
    courseId: any;
    onClose: () => void;
    onPurchased: () => void;
}) => {
    const handlePayment = async () => {
        try {
            await axios.post(`http://localhost:8001/user/purchase/${courseId}`, {}, { withCredentials: true });
            onPurchased(); // Update parent state & close modal
        } catch (e: any) {
            console.error(e.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-black border-2 border-stone-900 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                <div>
                    <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover rounded-md" />
                    <div className="mt-4">
                        <p className="text-xl font-semibold">{course.title}</p>
                        <p className="text-sm text-gray-400 mb-2">Course Summary</p>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Payment currency:</span> INR</p>
                            <p><span className="font-medium">Price (Including GST):</span> ₹{course.discount_price}</p>
                            <p><span className="font-bold">Total:</span> ₹{course.discount_price}</p>
                        </div>
                    </div>
                    <div className="w-full bg-blue-500 flex justify-center py-2 mt-4 rounded-lg hover:cursor-pointer hover:bg-blue-600 transition">
                        <button className="font-semibold text-lg" onClick={handlePayment}>
                            Buy Now
                        </button>
                    </div>
                    <button onClick={onClose} className="text-sm mt-4 underline hover:text-red-400">Cancel</button>
                </div>
            </div>
        </div>
    );
};
