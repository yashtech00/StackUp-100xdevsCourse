import axios from "axios";
import { useState } from "react"

export const Auth = ({ type }: { type: "signup" | "login" }) => {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
           const res = await axios.post(`http://localhost/user/${type}`)
        } catch (e) {
            
       }
   }

    return (
        <div>
            <div className=" flex justify-center h-screen items-center text-white  ">
                <div className="border-2 border-gray-300  w-[60%] h-[60%]">
                   <h1>Signup</h1>
                    <form className="flex justify-center ">
                        <div className="space-y-4 text-white">
                    <div className="space-x-4">
                        <label>UserName</label>
                        <input
                            placeholder="Enter Username"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Email</label>
                        <input
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="space-x-4">
                        <label>Password</label>
                        <input
                            placeholder="Enter Password"
                        />
                    </div>
                    </div>
                        </form>
                        
                    </div>
            </div>

        </div>
    )
}