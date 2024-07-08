import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Foods",
      required: true,
    },
    eatenDate: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString(),
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export const Tracking = mongoose.model("Tracking", trackingSchema);
