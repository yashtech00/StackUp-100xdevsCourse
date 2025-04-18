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
exports.GetCourseById = exports.GetCourse = exports.DeleteCourse = exports.UpdateCourse = exports.AddCourse = void 0;
const course_1 = __importDefault(require("../../model/course"));
const cloudinary_1 = require("cloudinary");
const AddCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, price, published } = req.body;
        let { imageUrl } = req.body;
        if (imageUrl) {
            const uploadRes = yield cloudinary_1.v2.uploader.upload(imageUrl);
            imageUrl = uploadRes.secure_url;
        }
        const newCourse = yield course_1.default.create({
            title,
            description,
            price,
            published,
            imageUrl
        });
        return res.status(200).json({ message: "new Course created successfully", data: newCourse });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.AddCourse = AddCourse;
const UpdateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield course_1.default.findById({ courseId });
        if (!course) {
            return res.status(401).json({ message: "course not found" });
        }
        const { title, description, price, published, imageUrl } = req.body;
        let updatedImageUrl = imageUrl;
        if (imageUrl) {
            const uploadRes = yield cloudinary_1.v2.uploader.upload(imageUrl);
            updatedImageUrl = uploadRes.secure_url;
        }
        const updateCourse = yield course_1.default.findByIdAndUpdate(courseId, {
            title,
            description,
            price,
            published,
            imageUrl: updatedImageUrl
        }, { new: true } // Return the updated document
        );
        return res.status(200).json({ message: "Course updated successfully", data: updateCourse });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.UpdateCourse = UpdateCourse;
const DeleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const course = yield course_1.default.findById(courseId);
        if (!course) {
            return res.status(401).json({ message: "course not found" });
        }
        const deleteCourse = yield course_1.default.findByIdAndDelete(courseId);
        return res.status(200).json({ message: "course deleted successfully" });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.DeleteCourse = DeleteCourse;
const GetCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.default.find();
        return res.status(200).json({ message: "fetch all courses", data: course });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetCourse = GetCourse;
const GetCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(401).json({ message: "Invalid courseId" });
        }
        const course = yield course_1.default.findOne({ courseId });
        return res.status(200).json({ message: "fetched course", data: course });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetCourseById = GetCourseById;
