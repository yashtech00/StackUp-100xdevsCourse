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
exports.Payment = exports.Purchase = exports.CourseById = exports.CoursePurchased = exports.GetUserCourse = void 0;
const razorpay_1 = require("../../lib/razorpay");
const course_1 = __importDefault(require("../../model/course"));
const user_1 = __importDefault(require("../../model/user"));
const GetUserCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_1.default.find({ published: true });
        return res.status(200).json({ message: "Fetched all published courses", data: courses });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetUserCourse = GetUserCourse;
const CoursePurchased = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.user.email }).populate("purchased");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Fetched purchased courses", data: { purchased: user.purchased } });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.CoursePurchased = CoursePurchased;
const CourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield course_1.default.findOne({ _id: courseId });
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }
        const user = yield user_1.default.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "fetched course", data: course });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while fetching" });
    }
});
exports.CourseById = CourseById;
const Purchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield course_1.default.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "course not found" });
        }
        const user = yield user_1.default.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        if (user.purchased.includes(course._id)) {
            return res.status(400).json({ message: "course already purchased" });
        }
        user.purchased.push(course._id);
        yield user.save();
        return res.status(200).json({ message: "course purchased successfully", purchasedCourse: course });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "course purchased successfully" });
    }
});
exports.Purchase = Purchase;
const Payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency } = req.body;
    console.log(amount, currency, "amt,curr,body");
    if (!amount || !currency) {
        return res.status(400).json({ message: "Amount and currency are required" });
    }
    try {
        const options = {
            amount: amount * 100,
            currency: currency || "INR"
        };
        const order = yield razorpay_1.razorpayInstance.orders.create(options);
        res.status(200).json(order);
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Error creating Razorpay order" });
    }
});
exports.Payment = Payment;
