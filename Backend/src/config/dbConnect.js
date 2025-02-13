import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(
      process.env.MONGO_CONNECTION_STRING
    );
    console.log("MongoDB Connected", mongoDbConnection.connection.host);
  } catch (error) {
    console.log("Error in dbConnect", error);
    process.exit(1);
  }
};

export default dbConnect;
