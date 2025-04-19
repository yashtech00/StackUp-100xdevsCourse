"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/Admin/auth");
const Admin_1 = require("../controller/Admin");
const auth_2 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/auth", auth_1.AdminAuth);
router.get("/course", auth_2.default, Admin_1.GetCourse);
router.get("/course/:id", auth_2.default, Admin_1.GetCourseById);
router.post("/course", auth_2.default, Admin_1.AddCourse);
router.put("/course/:id", auth_2.default, Admin_1.UpdateCourse);
router.delete("/course/:id", auth_2.default, Admin_1.DeleteCourse);
exports.default = router;
