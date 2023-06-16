import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {});
    console.log(
      `Connection with mongoDb is Successfull ${conn.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.error(`Error in MongoDB ${error}`);
  }
};

export default connectDB;
