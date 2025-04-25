"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpayInstance = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
exports.razorpayInstance = new razorpay_1.default({
    key_id: "your_dummy_key", // okay for testing
    key_secret: "your_dummy_secret", // okay for testing
});
