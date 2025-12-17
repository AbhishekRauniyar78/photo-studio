import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  date: String,
  price: Number,
});

export default mongoose.model("Booking", bookingSchema);
