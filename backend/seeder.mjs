import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  await Admin.deleteMany();

  await Admin.create({
    email: "@gmail.com",
    password: "PASS"
  });

  console.log("Admin Created");
  process.exit();
};

seedAdmin();
