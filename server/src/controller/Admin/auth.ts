import { Request, Response } from "express";
import { generateToken } from "../../lib/generateToken";



export const AdminAuth = (req:any, res:any) => {
    try {
        const { email, password } = req.body;

        // Hardcoded admin credentials
        const adminEmail = "yash123@gmail.com";
        const adminPassword = "123456789";

        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        generateToken(adminEmail, res)
        
        // Success response
        return res.status(200).json({ message: "Admin authenticated successfully" });

    } catch (error :any) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



