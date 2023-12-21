import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "category",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: true,
    },
    color: {
      type: String,
      required: false,
      default: true,
    },
    icon: {
      id: String,
      name: String,
      symbol: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  })
);
