import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

async function dbConnection()
{
    await mongoose.connect(MONGODB_URL)
    .then(() => console.log("db Connected"))
    .catch((error) => console.log(`error in db connection : ${error}`));
}
export default dbConnection;