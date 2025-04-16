import express from "express"
import { Signin, Signup } from "../controller/User/auth";

const router = express.Router();


router.post("/signin", Signin)
router.post("/signup", Signup);

export default router;