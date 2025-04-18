import express from "express"
import { Signin, Signup } from "../controller/User/auth";
import { CourseById, CoursePurchased, GetUserCourse, Purchase } from "../controller/User";
import Authenticate from "../middleware/auth";

const router = express.Router();


router.post("/signin",Authenticate, Signin)
router.post("/signup", Authenticate, Signup);

router.get("/course", Authenticate,GetUserCourse); 
router.post("/purchase/:courseId",Authenticate, Purchase);
router.get("/purchase",Authenticate, CoursePurchased);
router.get("/course/:courseId",Authenticate, CourseById);


export default router;