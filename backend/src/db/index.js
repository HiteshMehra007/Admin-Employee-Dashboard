import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/Admin-Employee-Database`);
        console.log(`MongoDB Connection Successful !!! \nDB Host: `, connectionInstance.connection.host);
    } catch (error) {
        console.error(`Error while connected DB: \n`, error);
    }
}

export default connectDB;