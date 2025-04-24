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
const Cloudinary_1 = __importDefault(require("../../lib/Cloudinary"));
const AddCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, // Expecting an array of strings or a single string with newline separators
        original_price, discount_price, discount, published, imageUrl } = req.body;
        // If description is a string, split it into an array
        const descriptionArray = Array.isArray(description) ? description : description.split('\n');
        let imageUrlToUse = imageUrl;
        if (imageUrl) {
            try {
                const uploadRes = yield Cloudinary_1.default.uploader.upload(imageUrl, {
                    folder: 'courses', // Optional: organize uploads into folders
                });
                imageUrlToUse = uploadRes.secure_url;
            }
            catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }
        const newCourse = new course_1.default({
            title,
            description: descriptionArray,
            original_price,
            discount_price,
            discount,
            published,
            imageUrl: imageUrlToUse,
        });
        yield newCourse.save();
        return res.status(201).json({ message: "Course created successfully", data: newCourse });
    }
    catch (error) {
        console.error("Error adding course:", error);
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
exports.AddCourse = AddCourse;
const UpdateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        console.log({ courseId });
        const course = yield course_1.default.findById(courseId);
        if (!course) {
            return res.status(401).json({ message: "course not found" });
        }
        const { title, description, price, published, imageUrl, original_price, discount_price, discount, } = req.body;
        let updatedImageUrl = imageUrl;
        if (imageUrl) {
            const uploadRes = yield Cloudinary_1.default.uploader.upload(imageUrl);
            updatedImageUrl = uploadRes.secure_url;
        }
        const updateCourse = yield course_1.default.findByIdAndUpdate(courseId, {
            original_price,
            discount_price,
            discount,
            title,
            description,
            price,
            published,
            imageUrl: updatedImageUrl,
        }, { new: true } // Return the updated document
        );
        return res
            .status(200)
            .json({ message: "Course updated successfully", data: updateCourse });
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
        const course = yield course_1.default.findById(courseId);
        return res.status(200).json({ message: "fetched course", data: course });
    }
    catch (e) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetCourseById = GetCourseById;
