"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("../controller/Admin");
const AdminAuth_1 = __importDefault(require("../middleware/AdminAuth"));
const auth_1 = require("../controller/Admin/auth");
const router = express_1.default.Router();
router.post("/auth", auth_1.AdminAuth);
router.get("/AllCourse", AdminAuth_1.default, Admin_1.GetCourse);
router.get("/course/:courseId", AdminAuth_1.default, Admin_1.GetCourseById);
router.post("/course", AdminAuth_1.default, Admin_1.AddCourse);
router.put("/course/:courseId", AdminAuth_1.default, Admin_1.UpdateCourse);
router.delete("/course/:courseId", AdminAuth_1.default, Admin_1.DeleteCourse);
exports.default = router;
