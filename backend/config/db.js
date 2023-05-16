import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            dbName:process.env.DB_NAME
        })
        if(process.env.NODE_ENV == 'development'){
            console.log(`MongoDB Connected: ${conn.connection.host}`)
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit()
        
    }
}