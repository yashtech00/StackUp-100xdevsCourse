import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        unique: true,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
    purchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"course"
    }]
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;