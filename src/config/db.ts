import mongoose from "mongoose";

export default async function connectDB(connectedCallback: () => void) {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/todoapp");
    if (conn) {
      console.log(`connected to: ${conn.connection.db.databaseName}`);
      connectedCallback();
    }
  } catch (error) {
    console.log("Could not connect to database", error);
    throw error;
  }
}
