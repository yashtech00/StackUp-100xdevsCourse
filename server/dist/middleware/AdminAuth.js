"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("../model/admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.status(401).json({ message: "No token" });
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const admin = yield admin_1.default.findById(decode.userId).select("-password");
        if (!admin)
            return res.status(401).json({ message: "Admin not found" });
        req.admin = admin;
        next();
    }
    catch (e) {
        return res.status(500).json({ message: "Authentication failed", error: e.message });
    }
});
exports.default = AuthenticateAdmin;
