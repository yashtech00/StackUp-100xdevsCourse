"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuth = void 0;
const AdminAuth = (req, res) => {
    try {
        const { email, password } = req.body;
        // Hardcoded admin credentials
        const adminEmail = "yash123@gmail.com";
        const adminPassword = "123456789";
        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Success response
        return res.status(200).json({ message: "Admin authenticated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.AdminAuth = AdminAuth;
