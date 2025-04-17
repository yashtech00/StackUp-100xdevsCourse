import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required:true,
    },
    password: {
        type: String,
        required:true
    }
})

const AdminModel = mongoose.model("User", adminSchema);

export default AdminModel;