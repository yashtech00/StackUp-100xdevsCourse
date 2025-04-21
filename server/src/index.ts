import express from "express"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import connectDb from "./db/db";
import userRouter from "./router/userRouter"
import adminRouter from "./router/adminRouter";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
    origin: ['https://tweetify-tau.vercel.app', 'http://localhost:3000'],
    credentials: true,
  };
app.use(cors(corsOptions));
connectDb();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8001

app.use("/user", userRouter);
app.use("/admin", adminRouter);
console.log("hello")

app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`)   
})