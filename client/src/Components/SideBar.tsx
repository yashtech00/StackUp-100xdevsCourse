import axios from "axios";
import { BookOpen, CircleHelp, LogOut, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import toast from "react-hot-toast";

export const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authUser, setAuthUser } = useAuth();
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${Backend_Url}/user/logout`, {}, { withCredentials: true });
            console.log(res.status, "logout");
            setAuthUser(null)
            navigate("/");
            toast.success("Logout Successfully");
        } catch (e: any) {
            console.error(e.message);
            toast.error("Error in Logout")
        }
    };

    return (
        <div className="w-64 flex-shrink-0 h-screen sticky top-0">
            <div className="border-r-2 border-stone-900 h-full flex flex-col justify-between">
                <div>
                    <h1 className="font-bold text-2xl border-b-2 border-stone-900 w-full p-4 flex justify-center">100xdevs</h1>
                    <div>
                        <ul className="flex flex-col gap-3 mt-4">
                            <Link to="/dashboard">
                                <li className={`py-4 ${location.pathname === "/" || location.pathname === "/dashboard" ? "bg-blue-500 text-white rounded-xl" : "hover:bg-stone-900 hover:rounded-xl"}`}>
                                    <div className="flex ml-4">
                                        <BookOpen />
                                        <span className="ml-6">Courses</span>
                                    </div>
                                </li>
                            </Link>
                            <Link to="/purchase">
                                <li className={`py-4 ${location.pathname === "/purchase" ? "bg-blue-500 text-white rounded-xl" : "hover:bg-stone-900 hover:rounded-xl"}`}>
                                    <div className="flex ml-4">
                                        <ShoppingCart />
                                        <span className="ml-6">Purchased</span>
                                    </div>
                                </li>
                            </Link>
                            <Link to="/help">
                                <li className={`py-4 ${location.pathname === "/help" ? "bg-blue-500 text-white rounded-xl" : "hover:bg-stone-900 hover:rounded-xl"}`}>
                                    <div className="flex ml-4">
                                        <CircleHelp />
                                        <span className="ml-6">Help</span>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border-t-2 border-stone-900">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-black"><User /></div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm truncate">{authUser?.username || "Guest"}</p>
                    </div>
                    <LogOut onClick={handleLogout}
                        className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};