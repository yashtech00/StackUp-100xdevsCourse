import express from "express"

const router = express.Router();


router.get("/UserCourse", GetUserCourse); 
router.post("/purchase/:courseId", CoursePurchased);
router.get("/purchase", Purchase);