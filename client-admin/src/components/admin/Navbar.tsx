import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useAdminAuth } from "../../hooks/AdminIndex";

export const AdminNavbar = () => {

    const navigate = useNavigate();
    const { authAdmin, setAuthAdmin } = useAdminAuth();
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${Backend_Url}/admin/logout`, {}, { withCredentials: true });
            setAuthAdmin(null);
            navigate("/", { replace: true });
        } catch (e: any) {
            console.error(e.message);
        }
    }

    return (
        <div className="relative border-b-2 border-stone-900 w-full  ">
            <div className="flex justify-between px-4 py-4 shadow-lg ">
                <div>
                    <h1 className="text-4xl font-bold">StackUp</h1>
                    <p className="text-stone-500 ml-6">100xdevs</p>
                </div>
                {!authAdmin ? (
                    
                        <div>
                            <Link to={"/AdminLogin"}>

                                <button className="px-6 py-6 bg-black text-white rounded-lg hover:bg-stone-900" >Login</button>
                            </Link>
                        </div>
                    
                ) : (
                    <div>
                        <button className="px-6 py-6 bg-black text-white rounded-lg hover:bg-stone-900" onClick={handleLogout}>Logout</button>
                    </div>
                )}




            </div>
        </div>

    )
}