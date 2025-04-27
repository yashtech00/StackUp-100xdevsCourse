import { generateToken } from "../../lib/generateToken";
import AdminModel from "../../model/Admin";
import bcrypt from "bcryptjs";


export const AdminLogin = async(req:any,res:any) => {
    try {
        const { email, password } = req.body;

        const user = await AdminModel.findOne({ email });
        if (!user) {
            return res.json({ message: "Admin not found go for Signup" }, { status: 401 });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.json({ message: "Invalid Password" }, { status: 401 });
        }
        generateToken(user._id,res);

        return res.status(200).json({  
            message: "Admin logged in successfully",  
            data: user    
          });  
    } catch (e:any) {
        console.error(e.message);
        return res.json({ message: "Internal server error while SignIn" }, { status: 500 });
    }
}