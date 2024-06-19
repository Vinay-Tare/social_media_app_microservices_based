import mongoose from "mongoose";

const connectToDatabase = () => {
  return mongoose.connect(process.env.MONGO_DB_URL_WITH_USERNAME_AND_PASSWORD)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch(error => {
      console.log("Failed to connect to database", error);
      throw error;
    });
}

const disconnectFromDatabase = () => {
  return mongoose.disconnect()
    .then(() => {
      console.log("Database disconnected successfully");
    })
    .catch(error => {
      console.log("Failed to disconnect from database", error);
      throw error;
    });
}

export { connectToDatabase, disconnectFromDatabase };
