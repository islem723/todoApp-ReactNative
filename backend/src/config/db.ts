import mongoose from "mongoose";
import { ATLAS_URL, __DEV__ } from "./env";

export default async function connectDB(connectedCallback: () => void) {
  const mongoUrl = __DEV__ ? "mongodb://127.0.0.1:27017/todoappDev" : ATLAS_URL;
  try {
    const conn = await mongoose.connect(mongoUrl);
    if (conn) {
      console.log(`connected to: ${conn.connection.db.databaseName}`);
      connectedCallback();
    }
  } catch (error) {
    console.log("Could not connect to database", error);
    throw error;
  }
}
