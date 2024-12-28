import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"], //this checks whteher is giving correct format email or not
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  education: {
    required: true,
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },

  password: {
    required: true,
    type: String,
    minlength: 8,
    select: false,
  },

  token: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const user = mongoose.model("user", userSchema);
