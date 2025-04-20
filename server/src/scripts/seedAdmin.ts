import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import AdminModel from "../model/admin";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const email = "yash123@gmail.com";
    const plainPassword = "123456789";

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      console.log("✅ Admin already exists");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = new AdminModel({ email, password: hashedPassword });
    await admin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
