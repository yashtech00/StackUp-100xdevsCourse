import axios from "axios";
import { useState } from "react";
import { CourseModel } from "./CourseModel";
import { useNavigate } from "react-router-dom";


export const AddCourse = () => {
    const [isModel, setIsModel] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [original_price, setOriginal_price] = useState("");
    const [discount_price, setDiscount_price] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            const res = await axios.post(`http://localhost:8001/admin/course`, {
                title,
                description,
                discount,
                discount_price,
                original_price,
                imageUrl: image,
                published
            }, { withCredentials: true });

            console.log(res, "Course added");
            setTitle("");
            setDescription("");
            setDiscount("");
            setDiscount_price("");
            setImage("");
            setOriginal_price("");
            setPublished(false);
            setIsModel(false);
            const courseId = res.data.data._id;
            navigate(`/course/:${courseId}`);

        } catch (e: any) {
            console.error("Error adding course:", e);
        }
    };

    const handleToggle = () => {
        setIsModel(!isModel);
    };

    return (
        <div>
            <div>
                <button onClick={handleToggle} className="border-2 border-stone-900 px-4 py-2 hover:bg-stone-900">Add Course +</button>
            </div>
            {isModel && (
                <CourseModel
                    onClose={handleToggle}
                    onSubmit={handleAdd}
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
                    setPublished = {setPublished}
                />
            )}
        </div>
    );
};
