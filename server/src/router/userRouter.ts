import express from "express"
import { Signin, Signup } from "../controller/User/auth";

const router = express.Router();


router.post("/signin", Signin)
router.post("/signup", Signup);
router.get("/course", GetUserCourse); 
router.post("/purchase/:courseId", Purchase);
router.get("/purchase", CoursePurchased);
router.get("/course/:courseId", CourseById);



export default router;