import express from "express"

import { AddCourse, DeleteCourse, GetCourse, GetCourseById, UpdateCourse } from "../controller/Admin";
import Authenticate from "../middleware/auth";


const router = express.Router();

 

router.get("/AllCourse",Authenticate, GetCourse)
router.get("/course/:courseId",Authenticate, GetCourseById);
router.post("/course",Authenticate, AddCourse)
router.put("/course/:courseId",Authenticate,UpdateCourse)
router.delete("/course/:courseId",Authenticate,DeleteCourse)


export default router;