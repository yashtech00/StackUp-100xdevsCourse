import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div>
            <div className="flex justify-between px-4 py-4 shadow-lg ">
                <h1 className="text-3xl font-bold">StackUp</h1>
                <div className="flex space-x-4">
                    <Link to={"/login"}>
                        <button className="px-4 py-2 bg-black text-white rounded-lg">Login</button>
                    </Link>
                    <Link to={"signup"}>
                    <button className="px-4 py-2 bg-black text-white rounded-lg">Signup</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}