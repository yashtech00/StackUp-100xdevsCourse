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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../model/user"));
dotenv_1.default.config();
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URL);
        const email = "yash123@gmail.com";
        const plainPassword = "123456789";
        const role = "admin";
        const existing = yield user_1.default.findOne({ email });
        if (existing) {
            console.log("✅ Admin already exists");
            return process.exit();
        }
        const hashedPassword = yield bcryptjs_1.default.hash(plainPassword, 10);
        const admin = new user_1.default({ username: "admin", email, password: hashedPassword, role });
        yield admin.save();
        console.log("✅ Admin created successfully");
        process.exit();
    }
    catch (err) {
        console.error("❌ Error creating admin:", err);
        process.exit(1);
    }
});
createAdmin();
