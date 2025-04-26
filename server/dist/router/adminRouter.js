"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("../controller/Admin");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/AllCourse", auth_1.default, Admin_1.GetCourse);
router.get("/course/:courseId", auth_1.default, Admin_1.GetCourseById);
router.post("/course", auth_1.default, Admin_1.AddCourse);
router.patch("/course/:courseId", auth_1.default, Admin_1.UpdateCourse);
router.delete("/course/:courseId", auth_1.default, Admin_1.DeleteCourse);
exports.default = router;
