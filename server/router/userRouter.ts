import express from "express"

const router = express.Router();


router.use("/signin", Signin)
router.use("/signup", Signup);