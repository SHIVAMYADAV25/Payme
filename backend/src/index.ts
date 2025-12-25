import "dotenv/config";
import { connectDB } from "./db/db.js";
import {app} from "./app.js"




connectDB()
.then(() => {
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
}).catch((err) =>{
    console.log("MONGO db connection failed !! ",err)
})
