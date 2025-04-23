import axios from "axios";


export const AddCourse = () => {

    const [isModel, setIsModel] = useState(false);
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [original_price, setOriginal_price] = useState("");
        const [discount_price, setDiscount_price] = useState("");
        const [discount, setDiscount] = useState("");
        const [image, setImage] = useState("");
    



    const handleAdd = async() => {
        try {
            const res = await axios.put(`http://localhost:8001/admin/course`, {
                title,
                description,
                discount,
                discount_price,
                original_price,
                image,
            }, { withCredentials: true })
            console.log(res,"edit   ");
            setCourse(res.data.data);
            setTitle("")
            setDescription("")
            setDiscount("")
            setDiscount_price("")
            setImage("")
            setOriginal_price("")
            setIsModel(false);
        } catch (e:any) {
            console.error(e.message);
            
        }
    }





    return (
        <div>
            <div>
                    <button className="border-2 border-stone-900 px-4 py-2 hover:bg-stone-900 " >Add Course +</button>
                </div>
        </div>
    )
}

