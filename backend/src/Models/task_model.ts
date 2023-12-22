import mongoose, { Schema, model } from "mongoose";

export default model(
  "Task",
  new mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "category",
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      isEditable: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        required: false,
      },
    },
    {
      timestamps: true,
    }
  )
);
