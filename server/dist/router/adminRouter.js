"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/Admin/auth");
const Admin_1 = require("../controller/Admin");
const router = express_1.default.Router();
router.post("/auth", auth_1.AdminAuth);
router.get("/course", Admin_1.GetCourse);
router.get("/course/:id", Admin_1.GetCourseById);
router.post("/course", Admin_1.AddCourse);
router.put("/course/:id", Admin_1.UpdateCourse);
router.delete("/course/:id", Admin_1.DeleteCourse);
exports.default = router;
