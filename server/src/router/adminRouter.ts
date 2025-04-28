import express from "express"

import { AddCourse, DeleteCourse, GetCourse, GetCourseById, UpdateCourse } from "../controller/Admin";

import { AdminLogin, GetMe, Logout } from "../controller/Admin/Auth";
import AdminAuthenticate from "../middleware/AdminAuth";


const router = express.Router();

router.get("/me", AdminAuthenticate, GetMe);

router.post("/login", AdminLogin);
router.post("/logout",Logout)


router.get("/AllCourse",AdminAuthenticate, GetCourse)
router.get("/course/:courseId",AdminAuthenticate, GetCourseById);
router.post("/course",AdminAuthenticate, AddCourse)
router.patch("/course/:courseId",AdminAuthenticate,UpdateCourse)
router.delete("/course/:courseId",AdminAuthenticate,DeleteCourse)


export default router;