import mongoose, { mongo } from "mongoose"
export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB Connection Successfull")
    } catch (error) {
        console.log("Error while Connecting to MongoDB " , error);
        process.exit(1) // status code 1 mean failure
    }
};