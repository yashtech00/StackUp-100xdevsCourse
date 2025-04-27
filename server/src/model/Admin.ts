import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required:true,
    },
    password: {
        type: String,
        required:true
    },
})
const AdminModel = mongoose.model("admins", AdminSchema);

export default AdminModel;