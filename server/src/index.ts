import express from "express"
import cors from "cors"
import connectDb from "./db/db";
import userRouter from "./router/userRouter"
import adminRouter from "./router/adminRouter";
import dotenv from "dotenv";

dotenv.config();
const app = express();


app.use(cors());
connectDb();


app.use(express.json());

const PORT = process.env.PORT || 8001;


app.use("/user", userRouter);
app.use("/admin", adminRouter);


app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);    
})