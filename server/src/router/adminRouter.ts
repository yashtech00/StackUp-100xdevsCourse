import express from "express"
import { AdminAuth } from "../controller/Admin/auth";

const router = express.Router();

router.post("/auth", AdminAuth);
router.post("/course", AddCourse)
router.put("/course/:id",UpdateCourse)
router.delete("/course/:id",DeleteCourse)
router.get("/course", GetCourse)
router.get("/course/:id", oneCourse);