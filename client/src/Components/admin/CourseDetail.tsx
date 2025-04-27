import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { courseProp } from "../DashboardPage"
import { Navbar } from "../Navbar"
import { CourseModel } from "./CourseModel"

export const CourseDetail = () => {

    const [course, setCourse] = useState<courseProp | null>(null);
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [isModel, setIsModel] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [original_price, setOriginal_price] = useState("");
    const [discount_price, setDiscount_price] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");
    const [published, setPublished] = useState(false);

    useEffect(() => {
        const handleFetch = async () => {

            try {
                const res = await axios.get(`http://localhost:8001/admin/course/${courseId}`, { withCredentials: true });
                console.log(res, "get detail");
                const courseData = res.data.data;
                console.log("Fetched course data:", courseData);
                console.log("Fetched description:", courseData.description);

                setCourse(courseData);

                setTitle(courseData.title);
                setOriginal_price(courseData.original_price);
                setDiscount_price(courseData.discount_price);
                setDiscount(courseData.discount);
                setImage(courseData.imageUrl);
                setDescription(courseData.description)
                setPublished(courseData.published)

            } catch (e: any) {
                console.error(e.message);

            }
        }
        handleFetch();
    }, [courseId])


    const handleEdit = async () => {
        try {
            const res = await axios.patch(`http://localhost:8001/admin/course/${courseId}`, {
                title,
                description,
                discount,
                discount_price,
                original_price,
                image,
            }, { withCredentials: true })
            console.log(res, "edit   ");
            setCourse(res.data.data);
            setTitle("")
            setDescription("")
            setDiscount("")
            setDiscount_price("")
            setImage("")
            setOriginal_price("")
            setPublished(false)
            setIsModel(false);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8001/admin/course/${courseId}`, { withCredentials: true });
            navigate("/admin")
        } catch (e: any) {
            console.error(e.message);
        }
    }

    const handleToggle = () => {
        setIsModel(!isModel);
    }

    return (
        <div className="">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
                <div className="flex justify-end gap-6">
                    <button
                        onClick={handleToggle}
                        className="px-8 py-3 text-white rounded-2xl  border-2 border-stone-900 hover:bg-stone-900 transition"
                    >
                        Edit Course
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-8 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
                    >
                        Delete Course
                    </button>
                </div>
                {course ? (
                    <>
                        <div className="text-white bg-black rounded-2xl p-8 border-2 border-stone-900">
                            <h1 className="text-5xl font-bold mb-6 bg-blue-600 py-4 px-6 rounded-lg">{course.title}</h1>
                            <div className="flex flex-col md:flex-row gap-8 pl-6">
                                <div className="flex-1 space-y-4">
                                    <p className="text-2xl font-semibold">What you'll learn</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {Array.isArray(course.description) ? (
                                            course.description.map((item, index) => (
                                                <li key={index} className="text-md">{item}</li>
                                            ))
                                        ) : (
                                            <li className="text-md">{course.description}</li>
                                        )}
                                    </ul>
                                    <div className="text-md font-semibold">Price: ₹{course.discount_price}</div>
                                </div>
                                <div className="flex-shrink-0 w-full md:w-64">
                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="rounded-xl shadow-md w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-lg">Loading...</div>
                )}

            </div>

            {isModel && (
                <CourseModel
                    onClose={handleToggle}
                    onSubmit={handleEdit}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    original_price={original_price}
                    setOriginal_price={setOriginal_price}
                    discount_price={discount_price}
                    setDiscount_price={setDiscount_price}
                    discount={discount}
                    setDiscount={setDiscount}
                    image={image}
                    setImage={setImage}
                    published={published}
                    setPublished={setPublished}
                />
            )}
        </div>
    );
}




