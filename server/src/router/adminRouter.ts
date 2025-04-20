import express from "express"

import { AddCourse, DeleteCourse, GetCourse, GetCourseById, UpdateCourse } from "../controller/Admin";
import Authenticate from "../middleware/auth";
import AuthenticateAdmin from "../middleware/AdminAuth";
import { AdminAuth } from "../controller/Admin/auth";

const router = express.Router();

router.post("/auth", AdminAuth); 

router.get("/AllCourse",AuthenticateAdmin, GetCourse)
router.get("/course/:courseId",AuthenticateAdmin, GetCourseById);
router.post("/course",AuthenticateAdmin, AddCourse)
router.put("/course/:courseId",AuthenticateAdmin,UpdateCourse)
router.delete("/course/:courseId",AuthenticateAdmin,DeleteCourse)


export default router;