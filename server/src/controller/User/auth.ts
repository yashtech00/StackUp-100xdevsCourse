import { generateToken } from "../../lib/generateToken";
import UserModel from "../../model/user";
import bcrypt from "bcryptjs"

export const Signup = async(req:any,res:any) => {
    try {
        const { username, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ message: "User already register go for login" }, { status: 401 });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            email,
            password:hashPassword
        })
        generateToken(newUser._id,res);

        return res.json({ message: "User created successfully" }, { status: 200 }, { data: newUser });
    } catch (e:any) {
        console.error(e.message);
        return res.json({ message: "Internal server error while Signup" }, { status: 500 });
    }
}

export const Signin = async(req:any,res:any) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found go for Signup" }, { status: 401 });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.json({ message: "Invalid Password" }, { status: 401 });
        }
        generateToken(user._id,res);

        return res.json({ message: "User created successfully" }, { status: 200 }, { data: user });
    } catch (e:any) {
        console.error(e.message);
        return res.json({ message: "Internal server error while SignIn" }, { status: 500 });
    }
}


export const GetMe = async (req: any, res: any)=>{
    try {
        const user = await UserModel.findById(req.user._id).select("-password");
        return res.status(200).json({ message: "me got this", data: user });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while fetch user details" });
    }
}

export const Logout = async (req: any, res: any) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout Successfully" });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while logout" });
    }
}
