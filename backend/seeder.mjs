import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  await Admin.deleteMany();

  await Admin.create({
    email: "anoopkumar6644@gmail.com",
    password: "123456"
  });

  console.log("Admin Created");
  process.exit();
};

seedAdmin();
