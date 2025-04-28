import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useAdminAuth } from "../../hooks/AdminIndex";

export const AdminNavbar = () => {

    const navigate = useNavigate();
    const { authAdmin, setAuthAdmin } = useAdminAuth();

    const handleLogout = async () => {
        try {
            const res = await axios.post("http://localhost:8001/admin/logout", {}, { withCredentials: true });
            setAuthAdmin(null);
            navigate("/", { replace: true });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    return (
        <div className="border-b-2 border-stone-900 ">
            <div className="flex justify-between px-4 py-4 shadow-lg ">
                <div>
                    <h1 className="text-4xl font-bold">StackUp</h1>
                    <p className="text-stone-500 ml-6">100xdevs</p>
                </div>

                <div>
                    <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={handleLogout}>Logout</button>
                </div>



            </div>
        </div>

    )
}