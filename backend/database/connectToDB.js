import mongoose from "mongoose";

// basic connection loop to db
// seperated from main index.js cause code splitting
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database :", error.message);
  }
};

export default connectToDB;
