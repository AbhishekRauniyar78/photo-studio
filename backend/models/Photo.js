import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["wedding", "pre-wedding", "birthday", "events", "passport", "other"],
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Photo", photoSchema);

