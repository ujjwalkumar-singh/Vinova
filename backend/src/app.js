import express from "express"
import {createServer} from "node:http"
import { Server } from "socket.io"
import mongoose from "mongoose"
import {connectToSocket} from "./controllers/socketManager.js"
import cors from "cors"
import userRoutes from "./routes/users.route.js"


const app=express();
const server=createServer(app)
const io=connectToSocket(server)


app.set("port",(process.env.PORT||8000))
app.use(cors())
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40k",extended:true}))

app.use("/api/v1/users",userRoutes)
app.use("/api/v2/users",userRoutes)

app.get("/",(req,res)=>{
    return res.json({"hello":"world"})
});

const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://ujturta_db_user:videocon123@cluster0.wtjq09x.mongodb.net/")
    console.log(`MONGO connected DB HOST:${connectionDb.connection.host}`);
    
    server.listen(app.get("port"),()=>{
        console.log("listing on port 8000");
        
    });

}

start();