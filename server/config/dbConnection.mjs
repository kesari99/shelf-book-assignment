import mongoose from "mongoose";


export const connectToDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI)
     console.log(`Database connected: ${connect.connection.host} ${connect.connection.name}`)
    }
    catch(err){
        console.log(`Error: ${err.message}`)
        process.exit(1)

    }
        
}