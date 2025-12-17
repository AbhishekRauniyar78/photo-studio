import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  features: [String],
  image: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["wedding", "pre-wedding", "birthday", "events", "passport", "other"],
    required: true,
  },
});

export default mongoose.model("Package", packageSchema);

