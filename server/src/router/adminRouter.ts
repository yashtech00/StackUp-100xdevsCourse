import express from "express"
import { AdminAuth } from "../controller/Admin/auth";
import { AddCourse, DeleteCourse, GetCourse, GetCourseById, UpdateCourse } from "../controller/Admin";

const router = express.Router();

router.post("/auth", AdminAuth); 

router.get("/course", GetCourse)
router.get("/course/:id", GetCourseById);
router.post("/course", AddCourse)
router.put("/course/:id",UpdateCourse)
router.delete("/course/:id",DeleteCourse)


export default router;