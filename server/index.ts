import express from "express"
import cors from "cors"
import connectDb from "./db";


const app = express();
app.use(cors());
connectDb();
app.use(express.json());

const PORT = process.env.PORT || 8001;


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/purchase", purchaseRoter);


app.listen(PORT, () => {
    console.log(`Server is connected to ${PORT}`);    
})