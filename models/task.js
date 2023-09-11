import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // imo
    ref: "userdata", // collection ka name dena h
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model("task", schema);
