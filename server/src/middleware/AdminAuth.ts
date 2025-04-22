// import AdminModel from "../model/admin";
// import jwt from "jsonwebtoken"
    
    
// const AuthenticateAdmin = async (req: any, res: any, next: any) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) return res.status(401).json({ message: "No token" });

//     const decode: any = jwt.verify(token, process.env.JWT_SECRET!);

//     const admin = await AdminModel.findById(decode.userId).select("-password");
//     if (!admin) return res.status(401).json({ message: "Admin not found" });

//     req.admin = admin;
//     next();
//   } catch (e: any) {
//     return res.status(500).json({ message: "Authentication failed", error: e.message });
//   }
// };

// export default AuthenticateAdmin;