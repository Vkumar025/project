import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB = async () => {
  try {
    const connectionInstant=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n mongoDB connected !! DB HOST:${connectionInstant.connection.host}`);
    // console.log(connectionInstant);
  } catch (error) {
    console.log("conncection ERROR", error);
    process.exit(1);
  }
};
export default connectDB
