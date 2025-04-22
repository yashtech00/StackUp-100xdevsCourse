
// import { generateToken } from "../../lib/generateToken";
// import AdminModel from "../../model/admin";
// import bcrypt from "bcryptjs";

// export const AdminAuth = async (req: any, res: any) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await AdminModel.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: "Admin not found" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     generateToken(admin._id, res);

//     return res.status(200).json({ message: "Admin authenticated successfully" });
//   } catch (error: any) {
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
                                                      