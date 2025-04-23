import { Link } from "react-router-dom";
import { courseProp } from "../DashboardPage";
import axios from "axios";
import { useState } from "react";

export const CourseCard = ({ course }: { course: courseProp }) => {

    const [isModel, setIsModel] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [original_price, setOriginal_price] = useState("");
    const [discount_price, setDiscount_price] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");

    const handleEdit = async () => {
        try {
            const res = await axios.put("http://localhost:8001/admin/DeleteCourse", {}, { withCredentials: true })
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
            const res = await axios.post("http://localhost:8001/admin/DeleteCourse", {}, { withCredentials: true });

        } catch (e: any) {
            console.error(e.message);
        }
    }

    const handleToggle = () => {
        setIsModel(!isModel);
    }


    return (
        <div>
            <div className="text-white">
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
                    <div className="mx-2 flex  justify-center w-full space-x-14 mb-4 ">
                        <div className="">
                            <button className="border-2 border-stone-900 px-8 py-2 hover:bg-stone-900 rounded-2xl" onClick={handleToggle}>Edit</button>
                        </div>
                        <div className="">
                            <button className="border-2 border-stone-900 px-6 py-2 hover:bg-stone-900 rounded-2xl" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
                {isModel && (
                    <EditModel
                        onClose={handleToggle}
                        onSubmit={handleEdit}
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription  = {setDescription}
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
        </div>
    )
}

interface EditModelProps {
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

function EditModel({
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
}: EditModelProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Course</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter the title of course"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter the description of course"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Original Price</label>
                        <input
                            type="text"
                            value={original_price}
                            onChange={(e) => setOriginal_price(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter the original price"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Discount Price</label>
                        <input
                            type="text"
                            value={discount_price}
                            onChange={(e) => setDiscount_price(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter the discount price"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Discount</label>
                        <input
                            type="text"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter the discount percentage"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter the image URL"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}