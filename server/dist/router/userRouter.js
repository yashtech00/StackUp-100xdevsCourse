"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/User/auth");
const User_1 = require("../controller/User");
const auth_2 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/signin", auth_2.default, auth_1.Signin);
router.post("/signup", auth_2.default, auth_1.Signup);
router.get("/course", auth_2.default, User_1.GetUserCourse);
router.post("/purchase/:courseId", auth_2.default, User_1.Purchase);
router.get("/purchase", auth_2.default, User_1.CoursePurchased);
router.get("/course/:courseId", auth_2.default, User_1.CourseById);
exports.default = router;
