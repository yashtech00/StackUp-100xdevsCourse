"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    discount_price: {
        type: String,
        required: true,
    },
    original_price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: 'false'
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
    }
});
const CourseModel = mongoose_1.default.model("course", CourseSchema);
exports.default = CourseModel;
