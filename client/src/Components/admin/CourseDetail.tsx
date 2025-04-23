import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { courseProp } from "../DashboardPage"
import { Navbar } from "../Navbar"

export const CourseDetail = () => {

    const [course, setCourse] = useState<courseProp | null>(null);
    const { courseId } = useParams();
    console.log(courseId, "id");

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/admin/course/${courseId}`, { withCredentials: true });
                console.log(res);

                setCourse(res.data.data)
            } catch (e: any) {
                console.error(e.message);

            }
        }
        handleFetch();
    }, [])
    const [isModel, setIsModel] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [original_price, setOriginal_price] = useState("");
    const [discount_price, setDiscount_price] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");

    const handleEdit = async () => {
        try {
            const res = await axios.put(`http://localhost:8001/admin/course/${courseId}`, {}, { withCredentials: true })
            setTitle("")
            setDescription("")
            setDiscount("")
            setDiscount_price("")
            setImage("")
            setOriginal_price("")
        } catch (e: any) {
            console.error(e.message);
        }
    }


    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8001/admin/course/${courseId}`, { withCredentials: true });

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
            <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
                {course ? (
                    <>
                        <div className="text-white bg-black rounded-2xl p-8 border-2 border-stone-900">
                            <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-4">
                                    <p className="text-lg">{course.description}</p>
                                    <div className="text-xl font-semibold">Price: ₹{course.price}</div>
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
    
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={handleToggle}
                                className="px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
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
                />
            )}
        </div>
    );
}


interface CourseModelProps {
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    original_price: string;
    setOriginal_price: (value: string) => void;
    discount_price: string;
    setDiscount_price: (value: string) => void;
    discount: string;
    setDiscount: (value: string) => void;
    image: string;
    setImage: (value: string) => void;
}

function CourseModel({
    onClose,
    onSubmit,
    title,
    setTitle,
    description,
    setDescription,
    original_price,
    setOriginal_price,
    discount_price,
    setDiscount_price,
    discount,
    setDiscount,
    image,
    setImage,
}: CourseModelProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-black border-2 border-stone-900 text-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Course</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 h-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter the description"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Original Price</label>
                        <input
                            type="text"
                            value={original_price}
                            onChange={(e) => setOriginal_price(e.target.value)}
                            className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="₹999"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount Price</label>
                        <input
                            type="text"
                            value={discount_price}
                            onChange={(e) => setDiscount_price(e.target.value)}
                            className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="₹499"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount (%)</label>
                        <input
                            type="text"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="50%"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full bg-black border border-stone-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
