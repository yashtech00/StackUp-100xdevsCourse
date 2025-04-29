import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsercourseProp } from "./DashboardPage";
import { useAuth } from "../hooks";
import toast from "react-hot-toast";

export const CourseDetails = () => {
    const { courseId } = useParams();
    const [courseDetail, setCourseDetail] = useState<UsercourseProp[]>([]);
    const [isModel, setIsModel] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<UsercourseProp | null>(null);
    const [purchased, setPurchased] = useState(false);
    const Backend_Url = process.env.BACKEND_URL;

    const { authUser } = useAuth();

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`${Backend_Url}/user/course/${courseId}`, { withCredentials: true });
                const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
                setCourseDetail(data);
            } catch (e: any) {
                console.error(e.message);
            }
        };
        handleFetch();
    }, [courseId]);

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
                                    <div
                                        className={`w-full flex justify-center py-2 my-2 rounded-lg ${
                                            authUser?.purchased?.includes(course._id)
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-500 hover:cursor-pointer"
                                        }`}
                                        onClick={() => {
                                            if (!authUser?.purchased?.includes(course._id)) {
                                                handleToggle(course);
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="font-semibold text-lg"
                                            disabled={authUser?.purchased?.includes(course._id)}
                                        >
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
                        if (authUser && selectedCourse) {
                            authUser.purchased = [...(authUser.purchased || []), selectedCourse._id];
                        }
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
    const [loading, setLoading] = useState(false);
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    const handlePayment = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
            await axios.post(`${Backend_Url}/user/purchase/${courseId}`, {}, { withCredentials: true });
            onPurchased(); // Update frontend after success
            toast.success("Course Purchased Successfully");
        } catch (e: any) {
            console.error(e.message);
            toast.error("Error while purchasing course");
        } finally {
            setLoading(false);
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
                        <button
                            className="font-semibold text-lg flex items-center gap-2"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Buy Now"
                            )}
                        </button>
                    </div>
                    <button onClick={onClose} className="text-sm mt-4 underline hover:text-red-400" disabled={loading}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
