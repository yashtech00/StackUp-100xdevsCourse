import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks"
import axios from "axios";

export const Navbar = () => {

    const { authUser, setAuthUser, isLoading } = useAuth();
    const navigate = useNavigate();
    const Backend_Url = process.env.REACT_APP_BACKEND_URL;

    if (isLoading) {
        return (
            <div>
                Loading....
            </div>
        )
    }


    const handleLogout = async () => {
        try {
            const res = await axios.post(`${Backend_Url}/user/logout`, {}, { withCredentials: true });
            setAuthUser(null);
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
                <div className="flex space-x-4">
                    {!authUser ? (
                        <>
                            <Link to={"/login"}>
                                <button className="px-4 py-2 bg-black text-white rounded-lg">Login</button>
                            </Link>
                            <Link to={"/signup"}>
                                <button className="px-4 py-2 bg-black text-white rounded-lg">Signup</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={handleLogout}>Logout</button>
                        </>
                    )}


                </div>
            </div>
        </div>
    )
}