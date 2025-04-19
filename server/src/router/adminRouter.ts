import express from "express"
import { AdminAuth } from "../controller/Admin/auth";
import { AddCourse, DeleteCourse, GetCourse, GetCourseById, UpdateCourse } from "../controller/Admin";
import Authenticate from "../middleware/auth";

const router = express.Router();

router.post("/auth", AdminAuth); 

router.get("/course",Authenticate, GetCourse)
router.get("/course/:id",Authenticate, GetCourseById);
router.post("/course",Authenticate, AddCourse)
router.put("/course/:id",Authenticate,UpdateCourse)
router.delete("/course/:id",Authenticate,DeleteCourse)


export default router;