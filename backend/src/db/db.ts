import mongoose from "mongoose";
import "dotenv/config"

export async function connectDB(){
    const MONGODB_URL = process.env.MONGODB_URL
    const DB_NAME = process.env.DB_NAME

    // console.log(MONGODB_URL)

    if(!MONGODB_URL && !DB_NAME){
        throw new Error("MONGODB_URL OR DB_NAME url is undefined");
    }

    try{
        const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
        console.log(`mongoDB is conneted!!! DB HOST:  ${connectionInstance.connection.host}`)
    }catch (error){
        console.log("error connecting in mongoDB",error)
        process.exit(1);
    }

}

