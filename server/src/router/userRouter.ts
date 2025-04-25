import express from "express"
import { GetMe, Logout, Signin, Signup } from "../controller/User/auth";
import { CourseById, CoursePurchased, GetUserCourse, Purchase } from "../controller/User";
import Authenticate from "../middleware/auth";

const router = express.Router();

router.get("/me", Authenticate, GetMe);
router.post("/logout", Logout);

router.post("/login", Signin)
router.post("/signup", Signup);

router.get("/course", Authenticate, GetUserCourse);
router.get("/course/:courseId", Authenticate, CourseById);

router.get("/purchase",Authenticate, CoursePurchased);
router.post("/purchase/:courseId",Authenticate, Purchase);



export default router;