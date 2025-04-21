import axios from "axios";
import { useState } from "react"

export const Auth = ({ type }: { type: "signup" | "login" }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost/user/${type}`, {
                username,
                email,
                password
            }, { withCredentials: true });
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (e: any) {
            console.error(e.message);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen  text-white">
            <div className="border border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md ">
            <h1 className="text-2xl font-bold text-center mb-6">{type === "signup" ? "Signup" : "Login"}</h1>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black text-white "
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black text-white "
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                />
                </div>
                <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-black text-white "
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                />
                </div>
                <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
                >
                {type === "signup" ? "Sign Up" : "Log In"}
                    </button>
                    <div>
                        
                    </div>
            </form>
            </div>
        </div>
    )
}