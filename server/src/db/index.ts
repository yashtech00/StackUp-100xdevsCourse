
import mongoose from "mongoose"

export default function connectDb() {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) {
        throw new Error("Mongo deb url is not valid")
    }
    try {
        mongoose.connect(MONGO_URL)
            .then(() => {
                console.log("Mongo db is connected successfully");
            })
            .catch(() => {
                console.log("Mongodb is not connected");
            })
    } catch (e) {
        console.error("Error connecting to mongoose",e);
        throw e;
    }
}