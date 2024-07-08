import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};