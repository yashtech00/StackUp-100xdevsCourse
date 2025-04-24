import axios from "axios";
import { useState } from "react";
import { CourseModel } from "./CourseDetail";


export const AddCourse = () => {

    const [isModel, setIsModel] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [original_price, setOriginal_price] = useState("");
    const [discount_price, setDiscount_price] = useState("");
    const [discount, setDiscount] = useState("");
    const [image, setImage] = useState("");


    const handleAdd = async () => {
        try {
            const res = await axios.put(`http://localhost:8001/admin/course`, {
                title,
                description,
                discount,
                discount_price,
                original_price,
                image,
            }, { withCredentials: true })
            console.log(res, "edit   ");
            setTitle("")
            setDescription("")
            setDiscount("")
            setDiscount_price("")
            setImage("")
            setOriginal_price("")
            setIsModel(false);
        } catch (e: any) {
            console.error(e.message);

        }
    }

    const handleToggle = () => {
        setIsModel(!isModel);
    }

    return (
        <div>
            <div>
                <button onClick={handleToggle} className="border-2 border-stone-900 px-4 py-2 hover:bg-stone-900"  >Add Course +</button>
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
                />
            )}
        </div>
    )
}

